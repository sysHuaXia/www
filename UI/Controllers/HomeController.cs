using Common.DataHelp;
using Core.Interface;
using EF;
using CoreModels.Models;
using Newtonsoft.Json;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Drawing;
using Core;

namespace UI.Controllers
{
    public class HomeController : Controller
    {

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

    }
}