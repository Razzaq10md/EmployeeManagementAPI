namespace EmployeeManagementAPI.Models
{
    public class LoginLog
    {
        public int LogID { get; set; }
        public int EmployeeID { get; set; }
        public DateTime LoginDate { get; set; }
        public DateTime? LogoutDate { get; set; }
    }
}

