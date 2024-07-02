namespace EmployeeManagementAPI.Models
{
    public enum UserRole
    {
        Employee,
        Employer,
        Admin
    }

    public class Employee
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeDescription { get; set; }
        public int EmployeeAge { get; set; }
        public string EmployeeGender { get; set; }
        public UserRole Role { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
