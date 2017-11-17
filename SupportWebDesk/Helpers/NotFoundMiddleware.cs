using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace SupportWebDesk.Helpers
{
    public class NotFoundMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IHostingEnvironment env;

        public NotFoundMiddleware(RequestDelegate next, IHostingEnvironment env)
        {
            this.next = next;
            this.env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            // Code taken from https://dustinewers.com/angular-cli-with-net-core/
            await next(context);
            if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) && !context.Request.Path.Value.StartsWith("api") && !context.Request.Path.Value.StartsWith("account"))
            {
                context.Request.Path = "/Index.html";
                context.Response.StatusCode = 200;
                await next(context);
            }
        }
    }
}
