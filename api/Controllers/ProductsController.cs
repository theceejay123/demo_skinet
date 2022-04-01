using System.Net;
using api.DTOs;
using api.Errors;
using api.Helpers;
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

        [Cache(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductResponseDTO>>> GetProducts([FromQuery] ProductSpecificationParameters parameters)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(parameters);
            var countSpec = new ProductWithFiltersForCountSpecification(parameters);
            var totalItems = await _productsRepo.CountAsync(countSpec);
            var products = await _productsRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductResponseDTO>>(products);
            return Ok(new Pagination<ProductResponseDTO>(parameters.PageIndex, parameters.PageSize, totalItems, data));
        }

        [Cache(600)]
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

        [Cache(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<List<IReadOnlyList<ProductBrand>>>> GetProductBrands()
        {
            return Ok(await _productBrandsRepo.ListAllAsync());
        }

        [Cache(600)]
        [HttpGet("types")]
        public async Task<ActionResult<List<IReadOnlyList<ProductType>>>> GetProductTypes()
        {
            return Ok(await _productTypesRepo.ListAllAsync());
        }
    }
}
