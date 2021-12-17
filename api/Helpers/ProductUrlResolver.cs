using api.DTOs;
using core.Entities;
using AutoMapper;

namespace api.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductResponseDTO, string>
    {
        private readonly IConfiguration _configuration;
        public ProductUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Resolve(Product source, ProductResponseDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return $"{_configuration["ApiUrl"]}{source.PictureUrl}";
            }
            return null;
        }
    }
}
