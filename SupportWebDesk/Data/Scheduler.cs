using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using SupportWebDesk.Data.Jobs;

namespace SupportWebDesk.Data
{
    public class Scheduler
    {
        public void Schedule()
        {
            RecurringJob.AddOrUpdate(() => EmailPuller.Fire(), Cron.MinuteInterval(5));


        }
    }
}
