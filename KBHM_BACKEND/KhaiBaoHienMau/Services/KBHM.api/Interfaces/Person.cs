using Services.lib.Sql;
using System.Threading.Tasks;

namespace KBHM.api.Interfaces
{
    public interface Person
    {
        Task<HttpObject.APIresult> PostPerson(Model.Person person);
        Task<HttpObject.APIresult> GetRowIDPerson(Model.Person person);
        Task<HttpObject.APIresult> GetRowIDPropertiesPerson(Model.Person person);

    }
}
