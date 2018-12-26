using Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class ManageController : Controller
    {
        private readonly ISysArea _sysArea;
        private readonly ISysCountry _sysCountry;

        public ManageController(ISysArea sysArea,ISysCountry sysCountry)
        {
            _sysArea = sysArea;
            _sysCountry = sysCountry;
        }
        // GET: Manage
        public ActionResult Index()
        {

            return View();
        }

        public ActionResult AddArea()
        {
            return View();
        }

        public ActionResult SystemConfiguration()
        {
            return View();
        }

        public ActionResult TableStatic()
        {
            ViewBag.areas = _sysArea.GetSysArea();
            ViewBag.countries = _sysCountry.getCountries();
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