using EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interface
{
    public interface ISysArea
    {
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IList<T_Area> GetSysArea();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="AreaId"></param>
        /// <returns></returns>
        T_Area GetSysAreaById(int AreaId);

    }
}
