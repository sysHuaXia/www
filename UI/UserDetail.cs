using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UI
{
    public class UserDetail
    {
        //本次登录的ID
        public string ConnectionId { get; set; }
        //用户编号
        public string UserID { get; set; }
        //用户名称
        public string UserName { get; set; }
        //用户组
        public string DeptName { get; set; }
        //登录时间
        public DateTime LoginTime { get; set; }
        //用户头像
        public string UserLogo { get; set; }
        //记录日志编号
        public int LogID { get; set; }
        //所属门店编号
        public int SupplierID { get; set; }
        //成长值
        public string SysLogTime { get; set; }
        //是否迟到
        public string ISLate { get; set; }
    }

    public class SupplierDetail
    {
        //门店编号
        public int SupplierID { get; set; }
        //门店名称
        public string SupplierName { set; get; }
    }
}