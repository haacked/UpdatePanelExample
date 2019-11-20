using Microsoft.AspNetCore.Http;

namespace MvcExplorations.Pages
{
    public static class RequestExtensions
    {
        public const string XmlHttpRequest = nameof(XmlHttpRequest);

        public static bool IsAjaxRequest(this HttpRequest request)
        {
            return request.Headers["X-Requested-With"] == XmlHttpRequest;
        }
    }
}