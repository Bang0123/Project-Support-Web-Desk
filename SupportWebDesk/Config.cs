using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;

namespace SupportWebDesk
{
    public class Config
    {
        public const string DB_CONTEXT = "SupportWebDeskContext";
        //public const string AUTHORITY = "http://localhost:5000/";
        public const string AUTHORITY = "http://supportwebdeskdemo.azurewebsites.net/";
        public const string API_NAME = "WebAPI";
        public const string CLIENT_ID = "SupportWebDesk";
        public const string POLICY_ADMIN = "Manage Accounts";
        public const string POLICY_USER = "Access Resources";
        public const string ROLE_ADMIN = "administrator";
        public const string ROLE_USER = "user";

        private const string ROLES = "roles";
        private const string ROLE = "role";

        public static IConfiguration Appsettings { get; set; }
        // Identity resources (used by UserInfo endpoint).
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource(ROLES, new List<string> { ROLE })
            };
        }

        // Api resources.
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(API_NAME) {
                    UserClaims = { ROLE }
                }
            };
        }

        // Clients want to access resources.
        public static IEnumerable<Client> GetClients()
        {
            // Clients credentials.
            return new List<Client>
            {
                // http://docs.identityserver.io/en/release/reference/client.html.
                new Client
                {
                    ClientId = CLIENT_ID,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.

                    AccessTokenLifetime = 900, // Lifetime of access token in seconds.

                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                        IdentityServerConstants.StandardScopes.Profile,
                        ROLES,
                        API_NAME
                    },
                    AllowOfflineAccess = true, // For refresh token.
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AbsoluteRefreshTokenLifetime = 7200,
                    SlidingRefreshTokenLifetime = 900,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    AllowedCorsOrigins = new List<string>
                    {
                       // "http://localhost:4200"
                    } // Only for development. Angular dev server
                }
            };
        }
    }
}
