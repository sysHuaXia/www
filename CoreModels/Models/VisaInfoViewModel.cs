using EF;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreModels.Models
{

    public class VisaInfoViewModel
    {
        public IEnumerable<OrderModel> Orders { get; set; }
        public Dictionary<OrderModel, int> IsPreSettlement { get; set; }
        public Dictionary<OrderModel, int> IsBirthday { get; set; }
        public Dictionary<OrderModel, int> ExamineCount { get; set; }
        public Dictionary<OrderModel, int> ReviewCount { get; set; }
        //public PagingInfo PagingInfo { get; set; }
        public IEnumerable<v_infolist> OrderCustom { get; set; }
        public v_infolist OrderByOid { get; set; } //通过ID获取订单详细信息 
        public int Count { get; set; } //

        public IEnumerable<kehuinfo> KeHuList { get; set; } //记录客户信息

        public v_infolist GetOrderFillBalance { get; set; } //补差

        public IEnumerable<v_infolist> OrderListCount { get; set; } //订单行程管理  
        
        public IEnumerable<v_infolist> OrderFollowList { get; set; }


        //public IEnumerable<UserModel> FList { get; set; }

        public ClientLogin ClientInterface { get; set; }

    }

    public class OrderModel
    {
        [Key]
        public int oid { get; set; }
        public string HArea { get; set; }
        public Nullable<int> jdr_id { get; set; }
        public string orderid { get; set; }
        public string v_name { get; set; }
        public int parent { get; set; }
        public string name_note { get; set; }
        public Nullable<System.DateTime> v_starttime { get; set; }
        public string v_tel { get; set; }
        public string baoxian { get; set; }
        public string taocan { get; set; }
        public string v_result { get; set; }
        public string vtype_result { get; set; }
        public Nullable<System.DateTime> v_stime { get; set; }
        public string v_qdao { get; set; }
        public Nullable<System.DateTime> v_otime { get; set; }
        public Nullable<int> v_number { get; set; }
        public Nullable<System.DateTime> v_endtime { get; set; }
        public string v_email { get; set; }
        public Nullable<decimal> v_yshou { get; set; }
        public Nullable<System.DateTime> v_cvisa { get; set; }
        public string v_pHao { get; set; }
        public string v_type { get; set; }
        public int v_package_new { get; set; }
        public Nullable<int> tmall_country_id { get; set; } 
        public Nullable<int> v_package { get; set; }
        public string v_contact { get; set; }
        public Nullable<decimal> v_yFu { get; set; }
        public string viptc { get; set; }
        public string v_yyemail { get; set; }
        public string v_vtype { get; set; }
        public string v_vtypeT { get; set; }
        public Nullable<System.DateTime> inputtime { get; set; }
        public Nullable<int> v_yuefei { get; set; }
        public Nullable<int> v_nianfei { get; set; }
        public string wwhao { get; set; }
        public string v_sqadd { get; set; }
        public Nullable<System.DateTime> UpTime { get; set; }
        public Nullable<int> qi_type { get; set; }
        public string qi_content { get; set; }
        public string fahuo { get; set; }
        public string xingcheng_content { get; set; }
        public Nullable<int> xctijiaoren { get; set; }
        public Nullable<int> audit_id { get; set; }
        public string xctijiaorenname { get; set; }
        public Nullable<int> audit { get; set; }
        public Nullable<System.DateTime> audittime { get; set; }
        public string V_jdrname { get; set; }
        public Nullable<int> V_jdrid { get; set; }
        public string title { get; set; }
        public string sku_properties_name { get; set; }
        public string v_stime_shi { get; set; }
        public string v_stime_fen { get; set; }
        public string audit_er { get; set; }
        public Nullable<System.DateTime> auditer_time { get; set; }
        public Nullable<System.DateTime> jiudian_EndTime { get; set; }
        public Nullable<int> jiudian_Cancel { get; set; }
        public string jiudian_Note { get; set; }
        public Nullable<int> getNum { get; set; }
        public string v_vtype1 { get; set; }
        public string v_vtype2 { get; set; }
        public string v_vtype3 { get; set; }
        public Nullable<int> finger { get; set; }
        public Nullable<int> have_card { get; set; }
        public string mat { get; set; }
        public string matinfo { get; set; }
        public Nullable<System.DateTime> mattime { get; set; }
        public Nullable<System.DateTime> LackTime { get; set; }
        public Nullable<int> jiudian_Num { get; set; }
        public string CLJieDanRen { get; set; }
        public Nullable<bool> WeToSend { get; set; }

        public Nullable<bool> IsOnline { get; set; }

        public string TicketMemo { get; set; }

        public int IsTicket { get; set; }

    }

    public class OrderSendSignTime
    {
        public int oid { get; set; }
        public Nullable<System.DateTime> v_stime { get; set; }
        public Nullable<System.DateTime> v_cvisa { get; set; }
    }

    public class OrderUserOperation
    {
        public int oid { get; set; }
        public Nullable<int> xctijiaoren { get; set; }
        public string xctijiaorenname { get; set; }
    }
     
    public class OrderUserJDR
    {
        public int oid { get; set; }
        public Nullable<int> V_jdrid { get; set; }
        public string V_jdrname { get; set; }
    }

    public class OrderCountry
    {
        public int AId { get; set; }
        public string HArea { get; set; }
    }

    public class OrderModelInvoice
    {
        [Key]
        public int oid { get; set; }
        public string v_name { get; set; }
        public string wwhao { get; set; }
        public Nullable<int> fp_enable { get; set; }
        public string fp_type { get; set; }
        public string fp_title { get; set; }
        public string fp_num { get; set; }
        public string fp_content { get; set; }
        public string fp_hao { get; set; }
        public Nullable<System.DateTime> fp_time { get; set; }
        public Nullable<System.DateTime> v_cvisa { get; set; }
        public string name_note { get; set; }
        public string v_tel { get; set; }
        public Nullable<int> fp_drawerId { get; set; }
        public string fp_drawerName { get; set; }
        public string fp_billNo { get; set; }
        public string v_result { get; set; }
        public string V_jdrname { get; set; }
    }

    public class OrderCountryPackageModel
    {
        [Key]
        public int oid { get; set; } //订单编号
        public string v_name { get; set; } //客户名称 
        public string v_result { get; set; } //订单结果
        public Nullable<int> v_package { get; set; } //判断是否加急
        public int v_package_new { get; set; } //套餐Id
        public Nullable<int> tmall_country_id { get; set; } //国家Id
        public string v_type { get; set; } //国家名称
        public Nullable<int> v_number { get; set; } //订单人数
        public Nullable<System.DateTime> v_cvisa { get; set; } //出签时间
        public Nullable<int> xctijiaoren { get; set; } //行程上传人
        public string xctijiaorenname { get; set; }
        public Nullable<int> V_jdrid { get; set; } //接单人
        public string V_jdrname { get; set; }
    }

    public class kehuinfo
    {
        public int id { get; set; }
        public string kf_name { get; set; }
        public string orderid { get; set; }
        public Nullable<int> hfjdrid { get; set; }
        public Nullable<int> Dorder { get; set; }
        public Nullable<System.DateTime> puttime { get; set; }
        public Nullable<System.DateTime> Dbirth { get; set; }
        public Nullable<bool> Enable { get; set; }
        public string zaizhi { get; set; }
    }

    public class OrderFollow
    {
        public int SId { get; set; }

        public Nullable<int> OId { get; set; }

        public string OrderStatus { get; set; }

        public string Recipient { get; set; }

        public Nullable<System.DateTime> RecipientTime { get; set; }
        
        /// <summary>
        /// 订单人数 
        /// </summary>
        public int OrderNumber { get; set; }

    }

    // 
    public class OrderAllocateTime
    {

        public int OId { get; set; }
        public string Recipient { get; set; }
        public string RecipientTime { get; set; }
        
    }

    public class ClientLogin
    {
        public int oid { get; set; }
        public string v_tel { get; set; }
        public string loginID { get; set; }
        public string orderid { get; set; }
        public string v_name { get; set; }
        public Nullable<System.DateTime> ActiveTime { get; set; }
    }

}
