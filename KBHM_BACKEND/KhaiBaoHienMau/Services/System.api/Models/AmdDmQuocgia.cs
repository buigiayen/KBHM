﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace System.api.Models;

public partial class AmdDmQuocgia
{
    public int Id { get; set; }

    public string MaQuocgia { get; set; }

    public string TenQuocgia { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<AmdDmTinh> AmdDmTinh { get; set; } = new List<AmdDmTinh>();
}