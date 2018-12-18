using UI.App_Start;
using System;
using System.Diagnostics;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac;
using System.Reflection;
using Autofac.Integration.Mvc;

namespace UI
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            Register();
        }

        public static void Register()
        {
            ContainerBuilder builder = new Autofac.ContainerBuilder();
            Assembly controllerAss = Assembly.Load("UI");
            builder.RegisterControllers(controllerAss);
            Assembly servicesAss = Assembly.Load("Core");
            Type[] stypes = servicesAss.GetTypes();
            builder.RegisterTypes(stypes)
                .AsImplementedInterfaces(); 
            var container = builder.Build(); 
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

    }
}