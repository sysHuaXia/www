using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataHelp
{
    public class JsonHelper
    {
        public static string Serialize<T>(T obj)
        {
            System.Runtime.Serialization.Json.DataContractJsonSerializer serializer = new System.Runtime.Serialization.Json.DataContractJsonSerializer(obj.GetType());
            MemoryStream ms = new MemoryStream();
            serializer.WriteObject(ms, obj);
            string retVal = Encoding.UTF8.GetString(ms.ToArray());
            return retVal;
        }

        public static T Deserialize<T>(string json)
        {
            T obj = Activator.CreateInstance<T>();
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(json));
            System.Runtime.Serialization.Json.DataContractJsonSerializer serializer = new System.Runtime.Serialization.Json.DataContractJsonSerializer(obj.GetType());
            obj = (T)serializer.ReadObject(ms);
            ms.Close();
            return obj;
        }

        /// <summary>
        /// 将datatable转化成Json数据 格式如 table[{id:1,title:'体育'},id:2,title:'娱乐'}]
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="tbname"></param>
        /// <returns></returns>
        public static string DataTableToJSON(DataTable dt, string totalCountStr, string tbname, string decimalFields = "", string datetimeFields = "")
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append(totalCountStr + ":" + dt.Rows.Count + "," + tbname + ":[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (i > 0)
                    jsonBuilder.Append(",");
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j > 0)
                        jsonBuilder.Append(",");
                    //jsonBuilder.Append(dt.Columns[j].ColumnName + ":'" + dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r", " ").Replace("\n", " ").Replace("\'", "\\\'") + "'");
                    string fieldValue = dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r", " ").Replace("\n", " ").Replace("\'", "\\\'");
                    if (decimalFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDecimal(dt.Rows[i][j]).ToString("0.##");
                    if (datetimeFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDateTime(dt.Rows[i][j]).ToString("yyyy-MM-dd");
                    jsonBuilder.Append(dt.Columns[j].ColumnName + ":'" + fieldValue + "'");
                }
                jsonBuilder.Append("}");
            }
            jsonBuilder.Append("]");
            return jsonBuilder.ToString();
        }
        public static string DataTableToJSON2(DataTable dt, string totalCountStr, string tbname, string decimalFields = "", string datetimeFields = "")
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append(totalCountStr + ":" + dt.Rows.Count + "," + tbname + ":[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (i > 0)
                    jsonBuilder.Append(",");
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j > 0)
                        jsonBuilder.Append(",");
                    //jsonBuilder.Append(dt.Columns[j].ColumnName + ":'" + dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r", " ").Replace("\n", " ").Replace("\'", "\\\'") + "'");
                    string fieldValue = dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r\n", "<br>").Replace("\'", "\\\'");
                    if (decimalFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDecimal(dt.Rows[i][j]).ToString("0.##");
                    if (datetimeFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDateTime(dt.Rows[i][j]).ToString("yyyy-MM-dd");
                    jsonBuilder.Append(dt.Columns[j].ColumnName + ":'" + fieldValue + "'");
                }
                jsonBuilder.Append("}");
            }
            jsonBuilder.Append("]");
            return jsonBuilder.ToString();
        }
        public static string DataTableToJSON_Product(DataTable dt, string totalCountStr, string tbname, string decimalFields = "", string datetimeFields = "")
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append(totalCountStr + ":" + dt.Rows.Count + "," + tbname + ":[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (i > 0)
                    jsonBuilder.Append(",");
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j > 0)
                        jsonBuilder.Append(",");
                    //jsonBuilder.Append(dt.Columns[j].ColumnName + ":'" + dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r", " ").Replace("\n", " ").Replace("\'", "\\\'") + "'");
                    string fieldValue = dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r", " ").Replace("\n", "<hc>").Replace("\'", "\\\'");
                    if (decimalFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDecimal(dt.Rows[i][j]).ToString("0.##");
                    if (datetimeFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDateTime(dt.Rows[i][j]).ToString("yyyy-MM-dd");
                    jsonBuilder.Append(dt.Columns[j].ColumnName + ":'" + fieldValue + "'");
                }
                jsonBuilder.Append("}");
            }
            jsonBuilder.Append("]");
            return jsonBuilder.ToString();
        }
        public static string CreateJsonParameters(DataTable dt, string decimalFields = "", string datetimeFields = "")
        {
            /* /****************************************************************************
             * Without goingin to the depth of the functioning of this Method, i will try to give an overview
             * As soon as this method gets a DataTable it starts to convert it into JSON String,
             * it takes each row and in each row it grabs the cell name and its data.
             * This kind of JSON is very usefull when developer have to have Column name of the .
             * Values Can be Access on clien in this way. OBJ.HEAD[0].<ColumnName>
             * NOTE: One negative point. by this method user will not be able to call any cell by its index.
            * *************************************************************************/
            StringBuilder JsonString = new StringBuilder();
            //Exception Handling        
            if (dt != null && dt.Rows.Count > 0)
            {
                JsonString.Append("{ ");
                JsonString.Append("\"Head\":[ ");
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    JsonString.Append("{ ");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        string fieldValue = dt.Rows[i][j].ToString().Replace("\t", " ").Replace("\r\n", "<br>").Replace("\'", "\\\'");
                        if (decimalFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDecimal(dt.Rows[i][j]).ToString("0.##");
                        if (datetimeFields.Contains(dt.Columns[j].ColumnName + ",")) fieldValue = Convert.ToDateTime(dt.Rows[i][j]).ToString("yyyy-MM-dd");

                        if (j < dt.Columns.Count - 1)
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + fieldValue + "\",");
                        }
                        else if (j == dt.Columns.Count - 1)
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + fieldValue + "\"");
                        }
                    }
                    /*end Of String*/
                    if (i == dt.Rows.Count - 1)
                    {
                        JsonString.Append("}");
                    }
                    else
                    {
                        JsonString.Append("},");
                    }
                }
                JsonString.Append("]}");
                return JsonString.ToString();
            }
            else
            {
                return null;
            }
        }

    }
}
