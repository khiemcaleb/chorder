using Chorder.Api.Core;
using Chorder.Api.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chorder.Api.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Song> Songs { get; set; }
        public DbSet<Part> Parts { get; set; }

    }
}