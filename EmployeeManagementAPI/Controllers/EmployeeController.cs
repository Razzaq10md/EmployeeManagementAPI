using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [Authorize(Roles = "Admin,Employer")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _employeeRepository.GetEmployees();
            return Ok(employees);
        }

        [Authorize(Roles = "Admin,Employer,Employee")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            var employee = await _employeeRepository.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [Authorize(Roles = "Admin,Employer,Employee")]
        [HttpGet("username/{username}")]
        public async Task<ActionResult<Employee>> GetEmployeeByUsername(string username)
        {
            var employee = await _employeeRepository.GetEmployeeByUsernameAsync(username);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [Authorize(Roles = "Admin,Employer")]
        [HttpPost("register")]
        public async Task<ActionResult> AddEmployee([FromBody] Employee employee)
        {
            await _employeeRepository.AddEmployee(employee);
            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeID }, employee);
        }

        [Authorize(Roles = "Admin,Employer")]
        [HttpGet("logs")]
        public async Task<ActionResult<IEnumerable<object>>> GetLoginLogs()
        {
            var logs = await _employeeRepository.GetLoginLogs();
            if (logs == null)
            {
                return NotFound();
            }
            var logsWithEmployeeDetails = logs.Select(log => new {
                log.EmployeeID,
                log.LoginDate,
                log.LogoutDate,
                EmployeeName = _employeeRepository.GetEmployeeById(log.EmployeeID).Result.EmployeeName,
                EmployeeDescription = _employeeRepository.GetEmployeeById(log.EmployeeID).Result.EmployeeDescription
            });

            return Ok(logsWithEmployeeDetails);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("employers")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployers()
        {
            var employers = await _employeeRepository.GetEmployers();
            return Ok(employers);
        }
    }
}
