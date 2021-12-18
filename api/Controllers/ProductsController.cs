using System.Net;
using api.DTOs;
using api.Errors;
using AutoMapper;
using core.Entities;
using core.Interfaces;
using core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandsRepo;
        private readonly IGenericRepository<ProductType> _productTypesRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
                                  IGenericRepository<ProductBrand> productBrandsRepo,
                                  IGenericRepository<ProductType> productTypesRepo,
                                  IMapper mapper)
        {
            _productsRepo = productsRepo;
            _productBrandsRepo = productBrandsRepo;
            _productTypesRepo = productTypesRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductResponseDTO>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productsRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductResponseDTO>>(products));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductResponseDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpecAsync(spec);

            if (product == null)
            {
                return NotFound(new ApiResponse((int)HttpStatusCode.NotFound));
            }

            return _mapper.Map<Product, ProductResponseDTO>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<IReadOnlyList<ProductBrand>>>> GetProductBrands()
        {
            return Ok(await _productBrandsRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<IReadOnlyList<ProductType>>>> GetProductTypes()
        {
            return Ok(await _productTypesRepo.ListAllAsync());
        }
    }
}
