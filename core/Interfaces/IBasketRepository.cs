using core.Entities;

namespace core.Interfaces
{
    public interface IBasketRepository
    {
        Task<Basket> GetBasketAsync(string id);
        Task<Basket> UpdateBasketAsync(Basket basket);
        Task<bool> DeleteBasketAsync(string id);
    }
}
