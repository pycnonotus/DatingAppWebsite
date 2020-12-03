using System.Threading.Tasks;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        public UserRepository UserRepository => new UserRepository(context, mapper);






        public async Task<bool> Complete()
        {
            return await this.context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return context.ChangeTracker.HasChanges();
        }
    }
}
