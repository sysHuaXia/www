using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class ManageController : Controller
    {
        // GET: Manage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SystemConfiguration()
        {
            return View();
        }

        public ActionResult TableStatic()
        {
            return View();
        }

        public ActionResult TimeLine()
        {
            return View();
        }

        public ActionResult ChartData()
        {
            return View(); 
        }

    }
}