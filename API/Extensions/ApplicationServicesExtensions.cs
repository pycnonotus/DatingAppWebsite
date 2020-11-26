using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration conf)
        {
            
            services.AddDbContext<DataContext> (options => {
                options.USe (conf.GetConnectionString ("DefaultConnection"));
            });
            return services;
        }
    }
}