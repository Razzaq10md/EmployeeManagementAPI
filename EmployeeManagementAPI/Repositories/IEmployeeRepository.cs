using EmployeeManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagementAPI.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetEmployeeById(int employeeId);
        Task<Employee> GetEmployeeByUsernameAsync(string username); // New method
        Task AddEmployee(Employee employee);
        Task<IEnumerable<LoginLog>> GetLoginLogs();
        Task<IEnumerable<Employee>> GetEmployers();
    }
}
