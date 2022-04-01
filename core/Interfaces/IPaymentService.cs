using core.Entities;
using core.Entities.OrderAggregate;

namespace core.Interfaces;

public interface IPaymentService
{
    Task<Basket> CreateOrUpdatePaymentIntent(string basketId);
    Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
    Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
}
