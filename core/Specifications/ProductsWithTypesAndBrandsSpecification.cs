using core.Entities;

namespace core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecificationParameters parameters)
            : base(x => (!parameters.BrandId.HasValue || x.ProductBrandId == parameters.BrandId)
                        && (!parameters.TypeId.HasValue || x.ProductTypeId == parameters.TypeId)
                        && (string.IsNullOrEmpty(parameters.Search) || x.Name.ToLower().Contains(parameters.Search)))
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);

            if (!string.IsNullOrEmpty(parameters.Sort))
            {
                switch (parameters.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(p => p.Price);
                        break;
                    case "nameDesc":
                        AddOrderByDesc(n => n.Name);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }

            ApplyPaging(parameters.PageSize * (parameters.PageIndex - 1), parameters.PageSize);
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
