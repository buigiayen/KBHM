﻿using BloodBank.api.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ICategory
    {
        Task<List<CategoryData>> GetLocation();
        Task<List<CategoryData>> GetMlBoold();
        Task<List<CategoryData>> GetElementBoold();
        Task<List<CategoryData>> GetJob();
        Task<List<CategoryData>> GetDoctor();
        Task<List<CategoryData>> GetTrip();
        Task<List<CategoryData>> GetBloodSource();
        Task<List<CategoryData>> GetUser();
    }
}
