using System;
using Hangfire;
using Hangfire.Storage;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SupportWebDesk.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SupportWebDesk.Auth;
using SupportWebDesk.Data.Jobs;
using SupportWebDesk.Helpers;
using SupportWebDesk.Helpers.Services;

namespace SupportWebDesk
{
    public class Startup
    {
        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Config.Appsettings = builder.Build();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // mvs hangfire and dbcontext
            services.AddMvc();
            services.AddHangfire(x => x.UseSqlServerStorage(Config.Appsettings.GetConnectionString(Config.DB_CONTEXT)));
            services.AddDbContext<WebDeskContext>(options =>
                options.UseSqlServer(Config.Appsettings.GetConnectionString(Config.DB_CONTEXT)));
            // Transient services
            services.AddTransient<EmailServiceJob>();
            services.AddTransient<TicketServiceJob>();

            // Email registered for dependency injection
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddTransient<IDbInitializer, DbInitializer>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPol", builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                    builder.Build();
                });
            });

            // begin identity
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<WebDeskContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                // Lockout settings.
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
            });
            // Role based Authorization: policy based role checks.
            services.AddAuthorization(options =>
            {
                // Policy for dashboard: only administrator role.
                options.AddPolicy(Config.POLICY_ADMIN, policy => policy.RequireRole(Config.ROLE_ADMIN));
                // Policy for resources: user or administrator roles. 
                options.AddPolicy(Config.POLICY_USER, policy => policy.RequireRole(Config.ROLE_ADMIN, Config.ROLE_USER));
            });

            // Adds IdentityServer.
            services.AddIdentityServer()
                // The AddDeveloperSigningCredential extension creates temporary key material for signing tokens.
                // This might be useful to get started, but needs to be replaced by some persistent key material for production scenarios.
                // See http://docs.identityserver.io/en/release/topics/crypto.html#refcrypto for more information.
                .AddDeveloperSigningCredential()
                .AddInMemoryPersistedGrants()
                // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism for configuration data (rather than using the in-memory implementations),
                // see https://identityserver4.readthedocs.io/en/release/quickstarts/8_entity_framework.html
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<User>(); // IdentityServer4.AspNetIdentity.
            
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = Config.AUTHORITY;
                    options.RequireHttpsMetadata = false;
                    
                    options.ApiName = Config.API_NAME;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            IServiceProvider serviceProvider,
            WebDeskContext ctx,
            IEmailSender emailer,
            IDbInitializer dbInitializer)
        {
            loggerFactory.AddConsole(Config.Appsettings.GetSection("Logging"));
            loggerFactory.AddDebug();
            ctx.Database.EnsureCreated();
            dbInitializer.Initialize(ctx);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowAnyOrigin();
                    builder.AllowCredentials();
                    builder.Build();
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseMiddleware<NotFoundMiddleware>(env);

            app.UseDefaultFiles();
            app.UseStaticFiles();
            GlobalConfiguration.Configuration
                .UseActivator(activator: new HangfireActivator(serviceProvider));

            app.UseIdentityServer();

            app.UseHangfireServer();
            app.UseHangfireDashboard();

            RecurringJob.AddOrUpdate(
                    recurringJobId: "emailJob",
                    methodCall: () => new EmailServiceJob(ctx).Invoke(true),
                    cronExpression: Cron.MinuteInterval(5)
                );
            RecurringJob.AddOrUpdate(
                    recurringJobId: "ticketJob",
                    methodCall: () => new TicketServiceJob(ctx, emailer).Invoke(),
                    cronExpression: Cron.MinuteInterval(5)
                );

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}");
            });
        }
    }
}
