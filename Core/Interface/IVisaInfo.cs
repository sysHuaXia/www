using CoreModels.Models;
using EF;
using System;
using System.Collections.Generic;

namespace Core.Interface
{
    public interface IVisaInfo
    {
        
        v_infolist GetOrderByOid(int Oid);

        IEnumerable<v_infolist> GetOrderHistoryList(string wwhao, bool online);

        v_infolist GetClientLogin(string ClientTel);

    }
}