using api.DTOs;
using AutoMapper;
using core.Entities;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BasketController : BaseController
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepo, IMapper mapper)
        {
            _basketRepo = basketRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketById(string id)
        {
            var basket = await _basketRepo.GetBasketAsync(id);
            return Ok(basket ?? new Basket(id));
        }

        [HttpPost]
        public async Task<ActionResult<Basket>> UpdateBasket(BasketDTO basket)
        {
            var custBasket = _mapper.Map<BasketDTO, Basket>(basket);
            var basketResponse = await _basketRepo.UpdateBasketAsync(custBasket);
            return Ok(basketResponse);
        }

        [HttpDelete]
        public async Task DeleteBasketAsnyc(string id)
        {
            await _basketRepo.DeleteBasketAsync(id);
        }
    }
}
