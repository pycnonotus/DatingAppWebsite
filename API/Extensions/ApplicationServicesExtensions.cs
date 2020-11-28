using API.Data;
using API.Helper;
using API.Interface;
using API.Service;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration conf)
        {
            services.AddDbContext<DataContext> (options => {
                options.UseNpgsql (conf.GetConnectionString ("DefaultConnection"));
            });
            services.AddScoped<ITokenService, TokenService> ();
            services.AddAutoMapper (typeof (AutoMapperProfiles).Assembly);

            return services;
        }
    }
}