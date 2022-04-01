using System.Text;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Helpers;

public class CacheAttribute : Attribute, IAsyncActionFilter
{
    private readonly int _timeToLive;

    public CacheAttribute(int timeToLive)
    {
        _timeToLive = timeToLive;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var cacheService = context.HttpContext.RequestServices.GetRequiredService<ICacheService>();
        var cacheKey = GenerageCacheKeyFromRequest(context.HttpContext.Request);
        var cacheResponse = await cacheService.GetCacheAsync(cacheKey);
        if (!string.IsNullOrEmpty(cacheResponse))
        {
            var contentResult = new ContentResult()
            {
                Content = cacheResponse,
                ContentType = "application/json",
                StatusCode = 200
            };
            context.Result = contentResult;
            return;
        }

        var executedContext = await next();
        if (executedContext.Result is OkObjectResult okObjectResult)
        {
            await cacheService.CacheAsync(cacheKey, okObjectResult.Value, TimeSpan.FromSeconds(_timeToLive));
        }
    }

    private string GenerageCacheKeyFromRequest(HttpRequest httpContextRequest)
    {
        var keyBuilder = new StringBuilder();
        keyBuilder.Append($"{httpContextRequest.Path}");
        foreach (var (key, value) in httpContextRequest.Query.OrderBy(x => x.Key))
        {
            keyBuilder.Append($"|{key}-{value}");
        }
        return keyBuilder.ToString();
    }
}
