using api.DTOs;
using AutoMapper;
using core.Entities.OrderAggregate;

namespace api.Helpers;

public class OrderItemResolver : IValueResolver<OrderItem, OrderItemDTO, string>
{
    private readonly IConfiguration _configuration;

    public OrderItemResolver(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
    {
        if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
        {
            return _configuration["ApiUrl"] + source.ItemOrdered.PictureUrl;
        }

        return null;
    }
}
