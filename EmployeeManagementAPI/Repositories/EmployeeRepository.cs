using Dapper;
using EmployeeManagementAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagementAPI.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _configuration;

        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                return await connection.QueryAsync<Employee>("SELECT * FROM Employees");
            }
        }

        public async Task<Employee> GetEmployeeById(int employeeId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                return await connection.QuerySingleOrDefaultAsync<Employee>("SELECT * FROM Employees WHERE EmployeeID = @EmployeeID", new { EmployeeID = employeeId });
            }
        }

        public async Task<Employee> GetEmployeeByUsernameAsync(string username)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                return await connection.QuerySingleOrDefaultAsync<Employee>("SELECT * FROM Employees WHERE Username = @Username", new { Username = username });
            }
        }

        public async Task AddEmployee(Employee employee)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "INSERT INTO Employees (EmployeeName, EmployeeDescription, EmployeeAge, EmployeeGender, Username, Password, Role) VALUES (@EmployeeName, @EmployeeDescription, @EmployeeAge, @EmployeeGender, @Username, @Password, @Role)";
                await connection.ExecuteAsync(query, employee);
            }
        }

        public async Task<IEnumerable<LoginLog>> GetLoginLogs()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                return await connection.QueryAsync<LoginLog>("SELECT * FROM LoginLogs");
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployers()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                return await connection.QueryAsync<Employee>("SELECT * FROM Employees WHERE Role = @Role", new { Role = UserRole.Employer });
            }
        }
    }
}
