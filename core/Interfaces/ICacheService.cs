namespace core.Interfaces;

public interface ICacheService
{
    Task CacheAsync(string cacheKey, object response, TimeSpan timeToLive);
    Task<string> GetCacheAsync(string cacheKey);
}
