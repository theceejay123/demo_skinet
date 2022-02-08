using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class BasketDTO
{
    [Required]
    public string Id { get; set; }
    public List<ItemDTO> Items { get; set; }
}
