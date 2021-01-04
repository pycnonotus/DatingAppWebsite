using System;

namespace DTO
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime TimeDate { get; set; } = DateTime.UtcNow;
        public String SenderUsername { get; set; }
        public string RecipientUsername { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime? MessageSent { get; set; } = DateTime.UtcNow;
    }
}
