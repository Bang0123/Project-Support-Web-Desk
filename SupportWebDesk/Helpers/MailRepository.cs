using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;
using MailKit;
using MailKit.Net;
using MailKit.Net.Imap;
using MailKit.Search;

namespace SupportWebDesk.Helpers
{
    public class MailRepository : IMailRepository
    {
        private readonly string mailServer, login, password;
        private readonly int port;
        private readonly bool ssl;

        /// <summary>
        /// Imap
        /// </summary>
        /// <param name="mailServer"></param>
        /// <param name="port"></param>
        /// <param name="ssl"></param>
        /// <param name="login"></param>
        /// <param name="password"></param>
        public MailRepository(string mailServer, int port, bool ssl, string login, string password)
        {
            this.mailServer = mailServer;
            this.port = port;
            this.ssl = ssl;
            this.login = login;
            this.password = password;
        }

        public IEnumerable<MimeMessage> GetUnreadMailsAndMarkAsRead()
        {
            return GetUnreadMails(true);
        }

        public IEnumerable<MimeMessage> GetUnreadMails(bool markAsRead = false)
        {
            var messages = new List<MimeMessage>();

            using (var client = new ImapClient())
            {
                client.Connect(mailServer, port, ssl);

                // Note: since we don't have an OAuth2 token, disable
                // the XOAUTH2 authentication mechanism.
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                client.Authenticate(login, password);

                // The Inbox folder is always available on all IMAP servers...
                var inbox = client.Inbox;
                inbox.Open(FolderAccess.ReadWrite);
                var results = inbox.Search(SearchOptions.All, SearchQuery.Not(SearchQuery.Seen));
                foreach (var uniqueId in results.UniqueIds)
                {
                    var message = inbox.GetMessage(uniqueId);

                    messages.Add(message);
                    if (markAsRead)
                    {
                        inbox.AddFlags(uniqueId, MessageFlags.Seen, true);
                    }
                }
                client.Disconnect(true);
            }
            return messages;
        }

        public IEnumerable<MimeMessage> GetAllMails(bool markAsRead = false)
        {
            var messages = new List<MimeMessage>();

            using (var client = new ImapClient())
            {
                client.Connect(mailServer, port, ssl);

                // Note: since we don't have an OAuth2 token, disable
                // the XOAUTH2 authentication mechanism.
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                client.Authenticate(login, password);

                // The Inbox folder is always available on all IMAP servers...
                var inbox = client.Inbox;
                inbox.Open(FolderAccess.ReadOnly);
                var results = inbox.Search(SearchOptions.All, SearchQuery.NotSeen);
                foreach (var uniqueId in results.UniqueIds)
                {
                    var message = inbox.GetMessage(uniqueId);
                    messages.Add(message);
                    if (markAsRead)
                    {
                        inbox.AddFlags(uniqueId, MessageFlags.Seen, true);
                    }
                }
                client.Disconnect(true);
            }
            return messages;
        }
    }
}
