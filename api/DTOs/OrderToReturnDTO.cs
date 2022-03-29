using core.Entities.OrderAggregate;

namespace api.DTOs;

public class OrderToReturnDTO
{
    public int Id { get; set; }
    public string BuyerEmail { get; set; }
    public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
    public Address ShipToAddress { get; set; }
    public string DeliveryMethod { get; set; }
    public decimal ShippingPrice { get; set; }
    public IReadOnlyList<OrderItemDTO> OrderItems { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; }
}
