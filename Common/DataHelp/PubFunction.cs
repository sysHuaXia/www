using EF;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Xml;

namespace Common.DataHelp
{

    /// <summary>
    /// cookies分类名称定义 
    /// </summary>
    public class udTypeVar
    {
        public struct Cookie
        {
            public static string webSign = "";
        }
    }

    public static class StringProcess
    {
        #region 字符串处理
        /// <summary>
        /// 过滤特殊字符
        /// </summary>
        /// <param name="inputStr">字符串</param>
        /// <returns>string</returns>
        public static string cutBadStr(string inputStr)
        {
            inputStr = inputStr.Replace("'", "");
            inputStr = inputStr.Replace(",", "");
            inputStr = inputStr.Replace("<", "&lt;");
            inputStr = inputStr.Replace(">", "&gt;");
            inputStr = inputStr.Replace("%", "");
            inputStr = inputStr.Replace("#", "");
            inputStr = inputStr.Replace("&", "");
            inputStr = inputStr.Replace("$", "");
            inputStr = inputStr.Replace("^", "");
            inputStr = inputStr.Replace("*", "");
            inputStr = inputStr.Replace("?", "");
            inputStr = inputStr.Replace("`", "");
            inputStr = inputStr.Replace("~", "");
            inputStr = inputStr.Replace("or", "");
            inputStr = inputStr.Replace("and", "");
            return inputStr;

        }
        public static string cutBadStrJson(string inputStr)
        {
            inputStr = inputStr.Replace("\\", "\\\\");
            inputStr = inputStr.Replace("\b", "\\\b");
            inputStr = inputStr.Replace("\t", "\\\t");
            inputStr = inputStr.Replace("\n", "\\\n");
            inputStr = inputStr.Replace("\n", "\\\n");
            inputStr = inputStr.Replace("\f", "\\\f");
            inputStr = inputStr.Replace("\r", "\\\r");
            inputStr = inputStr.Replace("\"", "\\\"");
            return inputStr;

        }
        /// <summary>
        /// 过滤html标记
        /// </summary>
        /// <param name="HTMLStr">要过滤的字符串</param>
        /// <returns>string</returns>
        ///
        public static string CutHTML(string strHtml)
        {
            string[] aryReg ={
          @"<script[^>]*?>.*?</script>",
          @"<(\/\s*)?!?((\w+:)?\w+)(\w+(\s*=?\s*(([""''])(\\[""''tbnr]|[^\7])*?\7|\w+)|.{0})|\s)*?(\/\s*)?>",
          @"([\r\n])[\s]+",
          @"&(quot|#34);",
          @"&(amp|#38);",
          @"&(lt|#60);",
          @"&(gt|#62);",
          @"&(nbsp|#160);",
          @"&(iexcl|#161);",
          @"&(cent|#162);",
          @"&(pound|#163);",
          @"&(copy|#169);",
          @"&#(\d+);",
          @"-->",
          @"<!--.*\n"
         };

            string[] aryRep =   {
             "",
             "",
             "",
             "\"",
             "&",
             "<",
             ">",
             "   ",
             "\xa1",//(161),   
             "\xa2",// (162),   
             "\xa3",//(163),   
             "\xa9",//(169),   
             "",
             "\r\n",
             ""
            };

            string newReg = aryReg[0];
            string strOutput = strHtml;
            for (int i = 0; i < aryReg.Length; i++)
            {
                Regex regex = new Regex(aryReg[i], RegexOptions.IgnoreCase);
                strOutput = regex.Replace(strOutput, aryRep[i]);
            }
            strOutput.Replace("<", "");
            strOutput.Replace(">", "");
            strOutput.Replace("\r\n", "");
            return strOutput;
        }


        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="Text"></param>
        /// <returns></returns>
        public static string Encrypt(string Text)
        {

            string key = System.Web.Configuration.WebConfigurationManager.AppSettings["ENCRYPT"].ToString(); //rootWebConfig.AppSettings.Settings["ENCRYPT"].Value;
            return Encrypt(Text, key);
        }
        /// <summary> 
        /// 加密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string Encrypt(string Text, string sKey)
        {
            try
            {
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                byte[] inputByteArray;
                inputByteArray = Encoding.Default.GetBytes(Text);
                des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
                des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                StringBuilder ret = new StringBuilder();
                foreach (byte b in ms.ToArray())
                {
                    ret.AppendFormat("{0:X2}", b);
                }
                return ret.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="Text"></param>
        /// <returns></returns>
        public static string Decrypt(string Text)
        {
            string key = System.Web.Configuration.WebConfigurationManager.AppSettings["ENCRYPT"].ToString();
            return Decrypt(Text, key);
        }
        /// <summary> 
        /// 解密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string Decrypt(string Text, string sKey)
        {
            try
            {
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                int len;
                len = Text.Length / 2;
                byte[] inputByteArray = new byte[len];
                int x, i;
                for (x = 0; x < len; x++)
                {
                    i = Convert.ToInt32(Text.Substring(x * 2, 2), 16);
                    inputByteArray[x] = (byte)i;
                }
                des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
                des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                return Encoding.Default.GetString(ms.ToArray());
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        #endregion
    }


}
