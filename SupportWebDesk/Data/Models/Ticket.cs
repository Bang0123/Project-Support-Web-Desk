﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Diagnostics;
using SupportWebDesk.Auth;

namespace SupportWebDesk.Data.Models
{
    public class Ticket
    {
        [NotMapped]
        public const string PRIORITY_CRITICAL = "Kritisk";
        [NotMapped]
        public const string PRIORITY_HIGH = "Høj";
        [NotMapped]
        public const string PRIORITY_NORMAL = "Normal";
        [NotMapped]
        public const string PRIORITY_LOW = "Lav";
        [NotMapped]
        public const string STATUS_OPEN = "Åben";
        [NotMapped]
        public const string STATUS_ONGOING = "Igang";
        [NotMapped]
        public const string STATUS_CLOSED = "Lukket";
        [NotMapped]
        public const int TICKET_7_DAYS_OLD = 7;
        [NotMapped]
        public const int TICKET_15_DAYS_OLD = 15;

        public int Id { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Status { get; set; }
        public String Priority { get; set; }
        public string Requester { get; set; }
        public string RequesterMail { get; set; }
        public User Assignee { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ICollection<Message> Messages { get; set; }

        public void SetNewStatus(string status)
        {
            switch (status)
            {
                case STATUS_OPEN:
                    this.Status = STATUS_OPEN;
                    break;
                case STATUS_ONGOING:
                    this.Status = STATUS_ONGOING;
                    break;
                case STATUS_CLOSED:
                    this.Status = STATUS_CLOSED;
                    break;
                default:
                    this.Status = STATUS_OPEN;
                    break;
            }
        }

        public void SetNewPriority(string priority)
        {
            switch (priority)
            {
                case PRIORITY_CRITICAL:
                    this.Priority = PRIORITY_CRITICAL;
                    break;
                case PRIORITY_HIGH:
                    this.Priority = PRIORITY_HIGH;
                    break;
                case PRIORITY_NORMAL:
                    this.Priority = PRIORITY_NORMAL;
                    break;
                case PRIORITY_LOW:
                    this.Priority = PRIORITY_LOW;
                    break;
                default:
                    this.Priority = PRIORITY_NORMAL;
                    break;
            }
        }
    }
}
