using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloodBank.api.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BloodBank.api.interfaces;

namespace BloodBank.api.Controllers.Tests
{
    [TestClass()]
    public class SyncPersonControllerTests
    {
        [TestMethod()]
        public void CheckTokenTest()
        {
            ISyncDonnor _ISyncDonnor = new BloodBank.api.command.SyncPatient();
            var test = new SyncPersonController(_ISyncDonnor);
            Assert.Fail();
        }
    }
}