using core.Entities;

namespace core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecificationParameters parameters)
            : base(x => (!parameters.BrandId.HasValue || x.ProductBrandId == parameters.BrandId)
                        && (!parameters.TypeId.HasValue || x.ProductTypeId == parameters.TypeId)
                        && (string.IsNullOrEmpty(parameters.Search) || x.Name.ToLower().Contains(parameters.Search)))
        {
        }
    }
}
