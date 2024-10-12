using KBHM.api.Model;
using Services.lib.Sql;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KBHM.api.Interfaces
{
    public interface Person
    {
        Task<HttpObject.APIresult> PostPerson(Model.Person person);
        Task<HttpObject.APIresult> GetRowIDPerson(Model.Person person);
        Task<HttpObject.APIresult> GetFindPerson(Model.Person person);
        Task<HttpObject.APIresult> GetRowIDPropertiesPerson(Model.Person person);
        Task<HttpObject.APIresult> PutPersonHealthy(Model.Person person);
        Task<HttpObject.APIresult> PutPerson(Model.Person person);
        Task<HttpObject.APIresult> PutPersonTip(Model.Person person);
        Task<HttpObject.APIresult> PutPersonDone(Model.Person person);
        Task<HttpObject.APIresult> GetPerson(Model.Person person);
        Task<IEnumerable<Model.Person>> GetPersonInfo();
        Task<HttpObject.APIresult> PutPersonABORH(Model.Person person);
        Task<HttpObject.APIresult> PostPersonDonateDelay(PersonDonateDelay person);
        Task<HttpObject.APIresult> GetPersonDonateDelay(PersonDonateDelay person);
        Task<HttpObject.APIresult> PutPersonDonateDelay(PersonDonateDelay person);
        Task<HttpObject.APIresult> DeletePersonDonateDelay(PersonDonateDelay person);

    }
}
