using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataHelp
{
    public class DataHelper
    {
        public static string Md5Change(string str)
        {
            string rs = "";
            byte[] result = Encoding.Default.GetBytes(str.Trim());
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] output = md5.ComputeHash(result);
            rs = BitConverter.ToString(output).Replace("-", "");
            return rs;
        }

        public static string GetDateYYYYMMDDFromString(string str)
        {
            if (str == "") return "";
            DateTime dt = Convert.ToDateTime(str);
            return dt.ToString("yyyy-MM-dd");
        }

        private const string KEY = "Gold926!";
        private static readonly byte[] _vector = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
        public static string Encode(string encryptString)
        {
            try
            {
                var rgbKey = Encoding.UTF8.GetBytes(KEY.Substring(0, 8));
                var des = new DESCryptoServiceProvider();

                var inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                var ms = new MemoryStream();
                var cs = new CryptoStream(ms, des.CreateEncryptor(rgbKey, _vector), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();

                return Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static string Decode(string decryptString)
        {
            try
            {
                var provider = new DESCryptoServiceProvider();
                var rgbKey = Encoding.UTF8.GetBytes(KEY.Substring(0, 8));

                var inputByteArray = Convert.FromBase64String(decryptString);

                var ms = new MemoryStream();
                var cs = new CryptoStream(ms, provider.CreateDecryptor(rgbKey, _vector), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();

                var encoding = new UTF8Encoding();

                return encoding.GetString(ms.ToArray());
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
