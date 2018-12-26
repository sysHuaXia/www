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
    public class SysCountry : ISysCountry
    {
        public IList<Tmall_Country> getCountries()
        {
            //获取正常的城市
            return new dhgl2013Entities().Tmall_Country.Where(x=>x.SectorID!=null).ToList();
        }
    }
}
