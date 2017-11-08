using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SupportWebDesk.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SupportWebDesk.Data.Jobs;
using SupportWebDesk.Helpers;

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
            Appsettings = builder.Build();
            Configuration = configuration;
        }

        public IConfiguration Appsettings { get; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddHangfire(x => x.UseSqlServerStorage(Appsettings.GetConnectionString("SupportWebDeskContext")));
            services.AddDbContext<WebDeskContext>(options =>
                options.UseSqlServer(Appsettings.GetConnectionString("SupportWebDeskContext")));
            services.AddTransient<EmailPullerJob>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, 
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            IServiceProvider serviceProvider,
            WebDeskContext ctx)
        {
            loggerFactory.AddConsole(Appsettings.GetSection("Logging"));
            loggerFactory.AddDebug();

            ctx.Database.EnsureCreated();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();
            GlobalConfiguration.Configuration
                .UseActivator(new HangfireActivator(serviceProvider));

            app.UseHangfireServer();
            app.UseHangfireDashboard();

            RecurringJob.AddOrUpdate(()=> new EmailPullerJob(ctx).GetMailsAndSaveToDb(), Cron.MinuteInterval(5));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
