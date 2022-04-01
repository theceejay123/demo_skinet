using System.Text.Json;
using core.Interfaces;
using StackExchange.Redis;

namespace infrastructure.Services;

public class CacheService : ICacheService
{
    private readonly IDatabase _database;
    public CacheService(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }

    public async Task CacheAsync(string cacheKey, object response, TimeSpan timeToLive)
    {
        if (response == null) return;
            var options = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        var serializedResponse = JsonSerializer.Serialize(response, options);
        await _database.StringSetAsync(cacheKey, serializedResponse, timeToLive);
    }

    public async Task<string> GetCacheAsync(string cacheKey)
    {
        var cachedResponse = await _database.StringGetAsync(cacheKey);
        if (cachedResponse.IsNullOrEmpty)
        {
            return null;
        }
        return cachedResponse;
    }
}
