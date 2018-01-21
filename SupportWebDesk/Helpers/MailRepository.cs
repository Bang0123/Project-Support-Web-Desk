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
        
        public async Task<IEnumerable<MimeMessage>> GetUnreadMailsAsync(bool markAsRead = false)
        {
            var messages = new List<MimeMessage>();

            using (var client = new ImapClient())
            {
                await client.ConnectAsync(mailServer, port, ssl);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.AuthenticateAsync(login, password);
                
                var inbox = client.Inbox;
                await inbox.OpenAsync(FolderAccess.ReadWrite);
                var results = await inbox.SearchAsync(SearchOptions.All, SearchQuery.NotSeen);
                foreach (var uniqueId in results.UniqueIds)
                {
                    var message = await inbox.GetMessageAsync(uniqueId);

                    messages.Add(message);
                    if (markAsRead)
                    {
                        await inbox.AddFlagsAsync(uniqueId, MessageFlags.Seen, true);
                    }
                }
                await client.DisconnectAsync(true);
            }
            return messages;
        }
    }
}
