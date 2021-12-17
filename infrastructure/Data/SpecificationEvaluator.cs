using core.Entities;
using core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace infrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> specification)
        {
            var query = inputQuery;
            if (specification.Criteria != null)
            {
                query = query.Where(specification.Criteria);
            }

            query = specification.Includes.Aggregate(
                query,
                (currentEntity, includeExpression) => currentEntity.Include(includeExpression)
            );
            return query;
        }
    }
}