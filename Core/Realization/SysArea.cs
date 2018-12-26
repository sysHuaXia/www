using Core.Interface;
using EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Realization
{
    public class SysArea: ISysArea
    {
        public IList<T_Area> GetSysArea()
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var Area = db.T_Area.Where(p => p.AId != 0).ToList();
            return Area;
        }

        public T_Area GetSysAreaById(int AreaId)
        {
            dhgl2013Entities db = new dhgl2013Entities();
            var a = db.T_Area.Where(p => p.AId == AreaId).FirstOrDefault();
            return a;
        }
    }
}
