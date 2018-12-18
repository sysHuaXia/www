using CoreModels.Models;
using EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;


namespace Common.DataHelp
{

    public class ClientudTypeVar
    {
        public struct GetClientCookie
        {
            public static string clientWebSign = "ClientInfo";
        }
    }


    public class PubClientFunction
    {

        /// <summary>
        /// 客户端的COOKIES
        /// </summary>
        /// <param name="IsUpdateExpires"></param>
        /// <returns></returns>
        public static ClientLogin Cookie_GetClientInfo(bool IsUpdateExpires)
        {

            HttpCookie cCookie = HttpContext.Current.Request.Cookies[ClientudTypeVar.GetClientCookie.clientWebSign];

            if (cCookie != null)
            {
                string Json = StringProcess.Decrypt(cCookie.Value);
                ClientLogin clogin = JsonHelper.Deserialize<ClientLogin>(Json);
                if (IsUpdateExpires)
                {
                    //修改过期时间，延长
                    HttpCookie clientCookie = new HttpCookie(ClientudTypeVar.GetClientCookie.clientWebSign);
                    clientCookie.Name = ClientudTypeVar.GetClientCookie.clientWebSign;
                    clientCookie.Expires = DateTime.Now.AddHours(1);
                    clogin.ActiveTime = clientCookie.Expires;

                    //重新写回到Cookie中
                    Json = JsonHelper.Serialize<ClientLogin>(clogin);
                    clientCookie.Value = StringProcess.Encrypt(Json);
                    HttpContext.Current.Response.Cookies.Add(clientCookie);
                }
                return clogin;
            }
            else
            {
                return null;
            }
        }



        /// <summary>
        /// 退出 清除cookies
        /// </summary>
        /// <param name="cookieName"></param>
        public static void Cookie_SignOut(string cookieName)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[cookieName];
            if (cookie != null)
            {
                cookie.Value = "";
                cookie.Expires = DateTime.Now.AddDays(-10);

                HttpContext.Current.Response.Cookies[cookieName].Expires = DateTime.Now.AddDays(-10);
                HttpContext.Current.Request.Cookies[cookieName].Expires = DateTime.Now.AddDays(-10);

                HttpContext.Current.Response.Cookies.Add(cookie);
            }

            HttpContext.Current.Session.Abandon();
            HttpContext.Current.Session.Clear();
        }




    }
}
