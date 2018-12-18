using Common.DataHelp;
using Core.Interface;
using CoreModels.Models;
using EF;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Pechkin;
using Pechkin.Synchronized;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using static System.Net.WebRequestMethods;

namespace UI.Controllers
{
    public class ClientWebController : ClientBaseController
    {

        private IVisaInfo _VisaInfo;
        private ISysCountry _SysCountry; //返回国家列表
        private ISysAreaConsul _SysAreaConsul; //获取区域名称
        private IArea _Area;
        public ClientWebController(IVisaInfo visainfo, ISysCountry sysCountry, ISysAreaConsul sysAreaConsul, IArea area)
        {
            _VisaInfo = visainfo;
            _SysCountry = sysCountry;
            _SysAreaConsul = sysAreaConsul;
            _Area = area;
        }

        //登录页 
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 手机登录页
        /// </summary>
        /// <returns></returns>
        public ActionResult AppIndex()
        {
            return View();
        }


        /// <summary>
        /// 手机登录详情页 
        /// </summary>
        /// <returns></returns>
        public ActionResult AppDetails()
        {
            return View();
        }

        //显示页
        public ActionResult ClientShow(string Oid)
        {

            //读取订单消息
            int oid = Convert.ToInt32(Base64Helper.Base64Decode(Oid));
            var order = _VisaInfo.GetOrderByOid(oid);

            //获取接单人的旺旺号
            int jdrID = 0;
            if (order.V_jdrid != null) {
                jdrID = Convert.ToInt32(order.V_jdrid);
            }
            //var JDRInfo = _SysUser.GetUserByCodeID(jdrID);
            //ViewBag.NickName = "上海华夏国旅专营店:" + JDRInfo.NickName;

            //获取套餐名称 
            int PackageNo = 0;
            int CountryId = 0;
            if (order.v_package_new != null) {
                PackageNo = Convert.ToInt32(order.v_package_new);
                CountryId = Convert.ToInt32(order.tmall_country_id);
            }
            //ViewBag.PackageName = PackageInfo.PackageName;

            //过虑签证类型
            string v_vtype = "";//旅游
            string v_vtype1 = "";//商务
            string v_vtype2 = "";//探亲
            string v_vtype3 = "";//访友
            ViewBag.LY = order.v_vtype;
            ViewBag.SW = order.v_vtype1;
            ViewBag.TQ = order.v_vtype2;
            ViewBag.FY = order.v_vtype3;

            //回国时间和出国时间相差天数
            DateTime beginTime1 = Convert.ToDateTime(order.v_starttime);
            DateTime endTime1 = Convert.ToDateTime(order.v_endtime);
            ViewBag.StarTime = beginTime1 != null?Convert.ToDateTime(order.v_starttime).ToString("yyyy-MM-dd"):"";
            if (endTime1 != null)
            {
                TimeSpan midTime = endTime1 - beginTime1;
                if (midTime != null && midTime.TotalDays >= 1)
                {
                    ViewBag.DaysTrip = midTime.Days + 1 + "天";
                }
                else
                {
                    ViewBag.DaysTrip = "";
                }
                ViewBag.EndTime = endTime1 != null? Convert.ToDateTime(order.v_endtime).ToString("yyyy-MM-dd"):"";
            }
            else
            {
                ViewBag.DaysTrip = "";
                ViewBag.EndTime = "";
            }
            //
            ViewBag.stime = order.v_stime != null ? Convert.ToDateTime(order.v_stime).ToString("yyyy-MM-dd") : "";

            //读取历史订单
            var getOrderInfo = _VisaInfo.GetOrderHistoryList(order.wwhao, true);
            ViewBag.HistryList = getOrderInfo;

            //调取材料清单
            string HArea = "";//区域
            string getv_vtype = "";//旅游
            string getv_vtype1 = "";//商务
            string getv_vtype2 = "";//探亲
            string getv_vtype3 = "";//访友
                                    //int tmall_country_id = 0;//国家ID
                                    //string v_type = "";//国家名称 

            string vtypStr = "";
            if (order.v_vtype != null & order.v_vtype1 == null && order.v_vtype2 == null && order.v_vtype3 == null)
            {
                vtypStr = order.v_vtype;
            }
            else if (order.v_vtype == null & order.v_vtype1 != null && order.v_vtype2 == null && order.v_vtype3 == null)
            {
                vtypStr = order.v_vtype1;
            }
            else if (order.v_vtype == null & order.v_vtype1 == null && order.v_vtype2 != null && order.v_vtype3 == null)
            {
                vtypStr = order.v_vtype2;
            }
            else if (order.v_vtype == null & order.v_vtype1 == null && order.v_vtype2 == null && order.v_vtype3 != null)
            {
                vtypStr = order.v_vtype3;
            }

            int AreaId = 0;
            var getAreaId = _Area.GetAreaByName(order.HArea);
            if (getAreaId != null) {
                AreaId = getAreaId.AId;
            }

            int tmallCountryId = Convert.ToInt32(order.tmall_country_id);

            int TravelTypeId = 0;

            string MIdStr = AreaId + "|" + tmallCountryId + "|" + TravelTypeId;
            ViewBag.MIds = MIdStr;

            string SendAddrss = "";
            ViewBag.getSendAddrss = SendAddrss;

            string _Str = "";
            string _Temp = "";
            string CurrentStateArray = "";
            if (order.IsOnline == true) {

            }

            ViewBag.CurrentStateArray = CurrentStateArray;

            return View(order);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ClientViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult InClientInterface(VisaInfoViewModel ClientViewModel)
        {
            int LogID = 0;
            string OId = "";
            if (ModelState.IsValid)
            {

                if (ClientViewModel.ClientInterface.loginID == null || ClientViewModel.ClientInterface.loginID == "")
                {
                    return Content("<script >alert('密码不允许为空！');window.location.href=('Index')</script >", "text/html");
                }

                var acctount = HttpUtility.HtmlEncode(ClientViewModel.ClientInterface.v_tel);
                var passWord = DataHelper.Md5Change(ClientViewModel.ClientInterface.loginID);

                string ClientAccount = "";
                if (Request.Cookies["v_tel"] != null)
                {
                    ClientAccount = Convert.ToString(Request.Cookies["v_tel"].Value);
                }
                else
                {
                    ClientAccount = acctount;
                }
                var client = _VisaInfo.GetClientLogin(ClientAccount);
                if (client == null)
                    return Content("<script >alert('此用户不存在！');window.location.href=('Index')</script >", "text/html");
                if (client.loginID != passWord)
                    return Content("<script >alert('用户名或密码错误！');window.location.href=('Index')</script >", "text/html");

                var jsonClientInfor = Common.DataHelp.JsonHelper.Serialize<v_infolist>(client); 

                HttpCookie cookieClientInfor = new HttpCookie(ClientudTypeVar.Cookie.clientWebSign);
                cookieClientInfor.Value = Common.DataHelp.StringProcess.Encrypt(jsonClientInfor);
                cookieClientInfor.Expires = DateTime.Now.AddHours(6);
                HttpContext.Response.Cookies.Add(cookieClientInfor);

                string getOrderStr = client.orderid + client.v_name;
                string getOidStr = client.oid.ToString().Trim();
                OId = Base64Helper.Base64Encode(Base64Helper.get_uft8(getOidStr));

            }

            return RedirectToAction("ClientShow", "ClientWeb", new { Oid = OId });
            //return RedirectToAction("ClientShow", "ClientWeb", new { Oid = OId });

        }




        /// <summary>
        /// app手机登录
        /// </summary>
        /// <param name="ClientViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult InAppInterface(VisaInfoViewModel ClientViewModel)
        {
            int LogID = 0;
            string OId = "";
            if (ModelState.IsValid)
            {

                if (ClientViewModel.ClientInterface.loginID == null || ClientViewModel.ClientInterface.loginID == "")
                {
                    return Content("<script >alert('密码不允许为空！');window.location.href=('AppIndex')</script >", "text/html");
                }

                var acctount = HttpUtility.HtmlEncode(ClientViewModel.ClientInterface.v_tel);
                var passWord = DataHelper.Md5Change(ClientViewModel.ClientInterface.loginID);

                string ClientAccount = "";
                if (Request.Cookies["v_tel"] != null)
                {
                    ClientAccount = Convert.ToString(Request.Cookies["v_tel"].Value);
                }
                else
                {
                    ClientAccount = acctount;
                }
                var client = _VisaInfo.GetClientLogin(ClientAccount);
                if (client == null)
                    return Content("<script >alert('此用户不存在！');window.location.href=('AppIndex')</script >", "text/html");
                if (client.loginID != passWord)
                    return Content("<script >alert('用户名或密码错误！');window.location.href=('AppIndex')</script >", "text/html");

                var jsonClientInfor = Common.DataHelp.JsonHelper.Serialize<v_infolist>(client);//序列化为字符串 
                HttpCookie cookieClientInfor = new HttpCookie(ClientudTypeVar.Cookie.clientWebSign);
                cookieClientInfor.Value = Common.DataHelp.StringProcess.Encrypt(jsonClientInfor);
                cookieClientInfor.Expires = DateTime.Now.AddHours(6);
                HttpContext.Response.Cookies.Add(cookieClientInfor);

            }
            return RedirectToAction("AppDetails", "ClientWeb", new { Oid = OId });
        }



        /// <summary>
        /// 安全退出 
        /// </summary>
        /// <param name="LogID"></param>
        /// <returns></returns>
        public ActionResult ClientCannel(string LogID)
        {
            //清除cookies
            Common.DataHelp.PubClientFunction.Cookie_SignOut(ClientudTypeVar.Cookie.clientWebSign);
            FormsAuthentication.SignOut();
            return View("Index");
        }



        public bool isMessyCode(string txt)
        {
            var bytes = Encoding.UTF8.GetBytes(txt);            //239 191 189            
            for (var i = 0; i < bytes.Length; i++)
            {
                if (i < bytes.Length - 3)
                    if (bytes[i] == 239 && bytes[i + 1] == 191 && bytes[i + 2] == 189)
                    {
                        return true;
                    }
            }
            return false;
        }

        /// <summary>
        ///  
        /// </summary>
        /// <param name="MId"></param>
        /// <returns></returns>
        public ActionResult ShowSampleVersion(string MIds, int EncryptionID, string OrderInfo)
        {

            //string MIdss = Base64Helper.Base64Decode(MIds);
            //int oid = Convert.ToInt32(Base64Helper.Base64Decode(OrderInfo));
            //string strDateTimeNumber = MIdss.Replace("|", "_");

            //MaterialsListViewModel Mater = new MaterialsListViewModel();
            //if (oid == EncryptionID)
            //{
            //    string[] arrayStr = MIdss.TrimEnd('|').Split('|'); //17|20|
            //    if (Convert.ToInt32(arrayStr[1]) != 34)
            //    {
            //        int AreaId = Convert.ToInt32(arrayStr[0]);
            //        int tmallCountryId = Convert.ToInt32(arrayStr[1]);
            //        int TravelTypeId = Convert.ToInt32(arrayStr[2]);
            //        Mater.FirstList = new Dictionary<T_MaterialList, IEnumerable<T_MaterialUploadTxt>>();
            //        Mater.SecondList = new Dictionary<T_MaterialUploadTxt, IEnumerable<T_MaterialShares>>();
            //    }
            //}
            //else {
            //    ViewBag.Eerror = 400;//返回错误值
            //}

            //ViewBag.downPdf = strDateTimeNumber + ".pdf";
            return View();

        }



        public ActionResult GeneratePDF(string MIds)
        {
            return View();
        }

    }
}