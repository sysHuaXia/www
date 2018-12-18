using EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interface
{
    public interface IArea
    {
        IEnumerable<T_Area> AreaList(int areaId);

        IEnumerable<T_Area> List(int areaId);

        T_Area GetAreaByAId(int areaId);

        T_Area GetAreaByName(string areaName);


    }
}
