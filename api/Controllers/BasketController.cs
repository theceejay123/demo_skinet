using core.Entities;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BasketController : BaseController
    {
        private readonly IBasketRepository _basketRepo;

        public BasketController(IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketById(string id)
        {
            var basket = await _basketRepo.GetBasketAsync(id);
            return Ok(basket ?? new Basket(id));
        }

        [HttpPost]
        public async Task<ActionResult<Basket>> UpdateBasket(Basket basket)
        {
            var basketResponse = await _basketRepo.UpdateBasketAsync(basket);
            return Ok(basketResponse);
        }

        [HttpDelete]
        public async Task DeleteBasketAsnyc(string id)
        {
            await _basketRepo.DeleteBasketAsync(id);
        }
    }
}
