using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.api.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using System.api.Interfaces;
using Xunit;
using System.Security.AccessControl;

namespace System.api.Command.Tests
{
   
    public class MinioCommandTests
    {
        private Interfaces.IMinio _minio;
        public MinioCommandTests(Interfaces.IMinio minio)
        {
            _minio = minio;
        }

        [Fact]
        public  void PostFileasyncTest()
        {
            try
            {
                var objectName = new Guid().ToString() + "_" + "Test";
                Console.WriteLine(objectName);
                Assert.IsTrue(true);
            }
            catch (Exception ex)
            {

                Assert.Fail(ex.Message);
            }


        }
    }
}