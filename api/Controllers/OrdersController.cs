using api.DTOs;
using api.Errors;
using api.Extensions;
using AutoMapper;
using core.Entities.OrderAggregate;
using core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Authorize]
public class OrdersController : BaseController
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrdersController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDto)
    {
        var email = HttpContext.User.RetrieveEmailFromPrincipal();
        var address = _mapper.Map<AppUserAddressDTO, Address>(orderDto.ShipToAddress);
        var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);
        if (order == null)
        {
            return BadRequest(new ApiResponse(400, "Problem creating order"));
        }
        return Ok(order);
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrderDTO>>> GetOrdersForUser()
    {
        var email = HttpContext.User.RetrieveEmailFromPrincipal();
        var orders = await _orderService.GetOrdersForUserAsync(email);
        return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDTO>>(orders));
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<IReadOnlyList<OrderDTO>>> GetOrderByIdForUser(int id)
    {
        var email = HttpContext.User.RetrieveEmailFromPrincipal();
        var order = await _orderService.GetOrderByIdAsync(id, email);
        if (order == null)
        {
            return NotFound(new ApiResponse(404));
        }
        return Ok(_mapper.Map<Order, OrderToReturnDTO>(order));
    }
    
    [HttpGet("deliveryMethods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
        return Ok(await _orderService.GetDeliveryMethodsAsync());
    }
}
