namespace api.DTOs;

public class OrderDTO
{
    public string BasketId { get; set; }
    public int DeliveryMethodId { get; set; }
    public AppUserAddressDTO ShipToAddress { get; set; }
}
