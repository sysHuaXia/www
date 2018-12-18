using Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF;

namespace Core.Realization
{
    public class Area : IArea
    {
        public IEnumerable<T_Area> AreaList(int areaId)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var Consul = db.T_Area.Where(m => m.AId != 0).OrderBy(m => m.AId).ToList();
            return Consul;
        }

        public T_Area GetAreaByAId(int areaId)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var user = db.T_Area.Where(s => s.AId == areaId).FirstOrDefault();
            return user;
        }

        public T_Area GetAreaByName(string areaName)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var user = db.T_Area.Where(s => s.AreaName == areaName).FirstOrDefault();
            return user;
        }

        public IEnumerable<T_Area> List(int areaId)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var Consul = db.T_Area.Where(m => m.AId == areaId).OrderBy(m => m.AId).ToList();
            return Consul;
        }
    }
}
