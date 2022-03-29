using System.Collections;
using core.Entities;
using core.Interfaces;

namespace infrastructure.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly StoreContext _context;
    private Hashtable _repositories;

    public UnitOfWork(StoreContext context)
    {
        _context = context;
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        if (_repositories == null) _repositories = new Hashtable();
        var type = typeof(TEntity).Name;
        if (!_repositories.ContainsKey(type))
        {
            var repositoryType = typeof(GenericRepository<>);
            var repoInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
            
            _repositories.Add(type, repoInstance);
        }

        return (IGenericRepository<TEntity>) _repositories[type];
    }

    public async Task<int> Complete()
    {
        return await _context.SaveChangesAsync();
    }
}
