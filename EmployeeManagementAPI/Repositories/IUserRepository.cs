using EmployeeManagementAPI.Models;
using System.Threading.Tasks;

namespace EmployeeManagementAPI.Repositories
{
    public interface IUserRepository
    {
        Task AddUserAsync(User user);
        Task<User> GetUserAsync(string username);
    }
}
