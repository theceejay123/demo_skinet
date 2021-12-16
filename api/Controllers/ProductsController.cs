using core.Entities;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<IReadOnlyList<ProductBrand>>>> GetProductBrands()
        {
            return Ok(await _productRepository.GetAllProductBrandsAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<IReadOnlyList<ProductType>>>> GetProductTypes()
        {
            return Ok(await _productRepository.GetAllProductTypesAsync());
        }
    }
}