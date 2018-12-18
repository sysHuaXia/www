using CoreModels.Models;
using EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Controllers
{
    /// <summary>
    ///     
    /// </summary>
    public class ClientudTypeVar
    {
        public struct Cookie
        {
            public static string clientWebSign = "ClientInfo";
        }
    }

    public class ClientBaseController : Controller
    {

        public ClientLogin ClientInfo
        {
            get
            {
                return ViewData["ClientInfo"] == null ? null : (ClientLogin)(ViewData["ClientInfo"]);
            }
            set
            {
                ViewData["ClientInfo"] = value;
            }
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            ClientInfo = Common.DataHelp.PubClientFunction.Cookie_GetClientInfo(false);
            int type = 0;
            string ControllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            string ActionName = filterContext.ActionDescriptor.ActionName;
            if (ControllerName == "ClientWeb")
            {
                if (ActionName == "Index")
                {
                    type = 1;
                }
            }

            //if (ClientInfo == null && type == 0)
            //{
            //    filterContext.Result = new RedirectResult("/ClientWeb/Index");
            //}

        }

    }


}