﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ICategory
    {
        Task<List<Model.CategoryData>> GetLocation();
        Task<List<Model.CategoryData>> GetMlBoold();
        Task<List<Model.CategoryData>> GetElementBoold();
        Task<List<Model.CategoryData>> GetJob();
    }
}
