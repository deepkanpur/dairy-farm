using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }
        [StringLength(1000)]
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public DairyFarm DairyFarm { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}