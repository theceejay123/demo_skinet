using api.DTOs;
using core.Entities;
using AutoMapper;
using core.Entities.Identity;

namespace api.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductResponseDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Address, AppUserAddressDTO>().ReverseMap();
            CreateMap<BasketDTO, Basket>();
            CreateMap<ItemDTO, Item>();
        }
    }
}
