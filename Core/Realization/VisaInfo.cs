using Core.Interface;
using CoreModels.Models;
using EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Realization
{
    public class VisaInfo : IVisaInfo
    {

        public v_infolist GetOrderByOid(int Oid)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var orderCustom = db.v_infolist.Where(p => p.oid == Oid).FirstOrDefault();
            return orderCustom;
        }


        public v_infolist GetClientLogin(string ClientTel)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var user = db.v_infolist.Where(p => p.v_tel == ClientTel && p.IsOnline == true).FirstOrDefault(); //v.tmall_country_id<>34
            return user;
        }

        public IEnumerable<v_infolist> GetOrderHistoryList(string wwhao, bool online)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var cash = db.v_infolist.Where(p => p.wwhao == wwhao && p.IsOnline == online).OrderBy(p => p.tmall_country_id).ToList();
            return cash;
        }

    }
}
