//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace EF
{
    using System;
    using System.Collections.Generic;
    
    public partial class v_OrderType
    {
        public int VId { get; set; }
        public string VType { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string CrowdType { get; set; }
        public Nullable<int> CityId { get; set; }
        public string CityName { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string CountryName { get; set; }
        public Nullable<int> SortingId { get; set; }
    }
}
