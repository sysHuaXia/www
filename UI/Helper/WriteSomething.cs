using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Web.Helper
{
    public class WriteSomething
    {
        private const string dir = @"C:\Users\admin\Desktop\img\";

        /// <summary>
        /// 写文件到本地
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="html"></param>
        public static void Write(string fileName, string html)
        {
            try
            {
                FileStream fs = new FileStream(dir + fileName, FileMode.Create);
                StreamWriter sw = new StreamWriter(fs, Encoding.Default);
                sw.Write(html);
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }

        }

        /// <summary>
        /// 写文件到本地
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="html"></param>
        public static void Write(string fileName, byte[] html)
        {
            try
            {
                File.WriteAllBytes(dir + fileName, html);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }

        }
    }
}