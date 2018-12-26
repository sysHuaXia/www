using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF;
using CoreModels.Models;

namespace Core.Interface
{
    public interface ISysCountry
    {
        IList<Tmall_Country> getCountries();
    }
}
