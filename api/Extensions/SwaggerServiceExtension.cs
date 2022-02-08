using Microsoft.OpenApi.Models;

namespace api.Extensions
{
    public static class SwaggerServiceExtension
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });

                var securitySchema = new OpenApiSecurityScheme()
                {
                    Description = "Jwt Auth Bearer Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference() {Type = ReferenceType.SecurityScheme, Id = "Bearer"}
                };
                
                c.AddSecurityDefinition("Bearer", securitySchema);
                var securityRequirements = new OpenApiSecurityRequirement() {{securitySchema, new[] {"Bearer"}}};
                c.AddSecurityRequirement(securityRequirements);
            });
            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));

            return app;
        }
    }
}
