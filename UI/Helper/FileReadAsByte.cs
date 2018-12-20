using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Web.Helper
{
    public class FileReadAsByte
    {
        public static byte[] FileToByteArray(string fileName)
        {
            return File.ReadAllBytes(fileName);
        }
    }
}