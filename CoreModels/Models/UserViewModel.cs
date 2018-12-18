using EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreModels.Models
{
    public class UserViewModel
    {
        public IEnumerable<UserModel> Users { get; set; } //在职人员
        public IEnumerable<UserModel> UsersDeparture { get; set; } //离职人员
        public Dictionary<UserModel, int> IsOnline { get; set; }
    }
    public class UserModel
    {
        [Key]
        public string UserName { get; set; }
        public int CodeID { get; set; }
        public string SupplierNameShort { get; set; }
        public string UserMobile { get; set; }
        public string UserTel { get; set; }
        public string UserFax { get; set; }
        public string UserQQ { get; set; }
        public int UserType { get; set; }
        public string UserAccount { get; set; }
        public bool IsEnable { get; set; }
        public int UserID { get; set; }
        public string RContent { get; set; }
        public int SupplierID { get; set; }
        public string UserDpt { get; set; }
        public Nullable<int> Sorting { get; set; }
        public string UserBirthday { get; set; }
        public string EnglishName { get; set; }
        public string NickName { get; set; }
        public Nullable<int> AttributionAreaId { get; set; }
        public string UserPositionCall { get; set; }

        public string UserCode { get; set; }

    }

    public class UserSort
    { 
        [Key]
        public string xctijiaorenname { get; set; }
        public int v_number { get; set; }
        public Nullable<System.DateTime> v_cvisa { get; set; }
        public string V_jdrname { get; set; }
        public string v_name { get; set; }
    }

    public class UserCenter
    {
        [Key]
        public int UserID { get; set; }
        public int SupplierID { get; set; }
        public Nullable<int> pSorting { get; set; } 
        public Nullable<int> CodeID { get; set; }
        public Nullable<int> SysType { get; set; }
        public Nullable<int> UserType { get; set; }
        public string UserName { get; set; }

    }

    public class GetSummaryParameter
    {
        public int CodeID { get; set; }
        public int SuccessfulState { get; set; }
        public int RefusedState { get; set; }
        public int SingleBackState { get; set; }
    }


}
