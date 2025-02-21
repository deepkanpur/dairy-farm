namespace API.DTO
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string UserName { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsDataEntryUser { get; set; }
        public bool IsDairyOwnerUser { get; set; }
        public bool IsCustomerUser { get; set; }
        public bool IsSalesUser { get; set; }

    }
}