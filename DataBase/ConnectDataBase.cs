using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase
{
    public class ConnectDataBase
    {
        private static ConnectDataBase connectDataBase;
        public static ConnectDataBase newConnect
        {
            get { return (connectDataBase ?? new ConnectDataBase()); }
        }
        private SqlConnection Conn()
        {
            ConnectionStringSettings settings;
            settings = ConfigurationManager.ConnectionStrings["myConnStr"];
            SqlConnection conn;
            conn = new SqlConnection(settings.ConnectionString);
            return conn;
        }
        public Int32 ExcuteNonQuery(string sql, SqlParameter[] ps)
        {
            SqlConnection conn = Conn();
            conn.Open();
            SqlCommand comm = new SqlCommand(sql, conn);
            foreach (SqlParameter p in ps)
            {
                comm.Parameters.Add(p);
            }
            var count = comm.ExecuteNonQuery();
            conn.Close();
            comm.Parameters.Clear();
            return count;
        }

        public Int32 ExcuteNonQuery(string sql)
        {
            SqlConnection conn = Conn();
            conn.Open();
            SqlCommand comm = new SqlCommand(sql, conn);
            var count = comm.ExecuteNonQuery();
            conn.Close();
            return count;
        }

        public void ExcuteUpdateTable(string sql, DataTable dt)
        {
            SqlConnection conn = Conn();
            SqlDataAdapter adapter = new SqlDataAdapter(sql, conn);
            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            DataSet ds = new DataSet();
            adapter.Fill(ds, "ds");
            ds.Tables.Add(dt.Copy());
            adapter.Update(ds, "Table1");
        }
        public DataSet ExcuteDataset(string sql, SqlParameter[] ps)
        {
            SqlConnection conn = Conn();
            SqlCommand comm = new SqlCommand(sql, conn);
            foreach (SqlParameter p in ps)
            {
                comm.Parameters.Add(p);
            }
            SqlDataAdapter myAda = new SqlDataAdapter();
            DataSet myset = new DataSet();
            myAda.SelectCommand = comm;
            myAda.Fill(myset);
            comm.Parameters.Clear();
            return myset;
        }

        public DataSet ExcuteDataset(string sql)
        {
            SqlConnection conn = Conn();
            SqlCommand comm = new SqlCommand(sql, conn);
            SqlDataAdapter myAda = new SqlDataAdapter();
            DataSet myset = new DataSet();
            myAda.SelectCommand = comm;
            myAda.Fill(myset);
            return myset;
        }

        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="currentPage"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="orderby"></param>
        /// <returns></returns>
        public DataSet ExcuteDataset(string sql, int currentPage, int pageSize, out int total, string orderby)
        {
            SqlConnection conn = Conn();
            conn.Open();
            SqlCommand comm = new SqlCommand("select count(*) from (" + sql + ")T", conn);
            var count = comm.ExecuteScalar();
            conn.Close();

            total = Convert.ToInt32(count);
            sql = SqlAppend(sql, orderby, currentPage, pageSize);
            comm.CommandText = sql;
            SqlDataAdapter myAda = new SqlDataAdapter();
            DataSet myset = new DataSet();
            myAda.SelectCommand = comm;
            myAda.Fill(myset);
            return myset;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="currentPage"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="orderby"></param>
        /// <param name="ps"></param>
        /// <returns></returns>
        public DataSet ExcuteDataset(string sql, int currentPage, int pageSize, out int total, string orderby, SqlParameter[] ps)
        {
            SqlConnection conn = Conn();
            conn.Open();
            SqlCommand comm = new SqlCommand("select count(*) from (" + sql + ")T", conn);
            foreach (SqlParameter p in ps)
            {
                comm.Parameters.Add(p);
            }
            var count = comm.ExecuteScalar();
            conn.Close();
            total = Convert.ToInt32(count);
            sql = SqlAppend(sql, orderby, currentPage, pageSize);
            comm.CommandText = sql;
            SqlDataAdapter myAda = new SqlDataAdapter();
            DataSet myset = new DataSet();
            myAda.SelectCommand = comm;
            myAda.Fill(myset);
            comm.Parameters.Clear();
            return myset;
        }
        public String SqlAppend(string sql, string orderby, int currentPage, int pageSize)
        {
            var startIndex = currentPage * pageSize + 1;
            var endIndex = (currentPage + 1) * pageSize;
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT * FROM ( SELECT");
            strSql.Append(" ROW_NUMBER() OVER (");
            strSql.Append("order by (select 1)");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("," + orderby);
            }
            strSql.Append(")AS Row,");
            strSql.Append(" T.*  from ( ");
            strSql.Append(sql);
            strSql.Append(")T");
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return strSql.ToString();
        }
    }
}
