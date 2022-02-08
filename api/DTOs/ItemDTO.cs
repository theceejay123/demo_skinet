﻿using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class ItemDTO
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
    public decimal Price { get; set; }
    [Required]
    [Range(1, Double.MaxValue, ErrorMessage = "Quantity must be at least one")]
    public int Quantity { get; set; }
    [Required]
    public string PictureUrl { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Type { get; set; }
}
