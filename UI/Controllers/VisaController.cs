using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using Web.Helper;
using Web.Models;

namespace Web.Controllers
{
    public class VisaController : Controller
    {
        // GET: Visa
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ApplySpainVisa(SVisaForm visaForm)
        {
            //第一次访问主页
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://china.blsspainvisa.com/chinese");
            client.DefaultRequestHeaders.Add("Referer", "https://china.blsspainvisa.com/chinese/book_appointment.php");
            var firstGet = client.GetAsync("/book_appointment.php").Result;
            var firstHtml = firstGet.Content.ReadAsStringAsync().Result;

            //第一次Post表格
            var firstform = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("app_type", "Individual"),
                new KeyValuePair<string, string>("centre ", "3#14"),
                new KeyValuePair<string, string>("category", "Normal"),
                new KeyValuePair<string, string>("phone_code", "86"),
                new KeyValuePair<string, string>("phone", "15657525415"),
                new KeyValuePair<string, string>("email", "asd@qq.com"),
                new KeyValuePair<string, string>("countryID", ""),
                new KeyValuePair<string, string>("member", "2"),
                new KeyValuePair<string, string>("save", "Continue"),
            };
            var content = new FormUrlEncodedContent(firstform);

            var firstPost = client.PostAsync("/book_appointment.php", content).Result;
            var firstPostHtml = firstPost.Content.ReadAsStringAsync();

            //第二次Post表格
            var agreeform = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("app_type", "Individual"),

            };
            var content2 = new FormUrlEncodedContent(agreeform);
            var agreePost = client.PostAsync("/book_appointment.php", content2).Result;
            var agreePostHtml = agreePost.Content.ReadAsStringAsync().Result;
            var agreeCookie = agreePost.Headers.GetValues("Set-Cookie");
            var responseCookie = string.Join("", agreeCookie);

            //第二次Get主页
            client.DefaultRequestHeaders.Add("Cookie", responseCookie);
            //client.DefaultRequestHeaders.Add("Referer", "https://china.blsspainvisa.com/chinese/book_appointment.php");
            var secondGet = client.GetAsync("/appointment.php").Result;
            var secondGetHtml = secondGet.Content.ReadAsStringAsync().Result;

            //第三次Post表格
            var thirdForm = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("app_date", "2018-12-12"),
                new KeyValuePair<string, string>("app_date_hidden ", "2018-12-12"),
                new KeyValuePair<string, string>("app_time", "09:15 - 09:30"),
                new KeyValuePair<string, string>("captcha", "fagopita"),
                new KeyValuePair<string, string>("countryID", "43"),
                new KeyValuePair<string, string>("dateOfBirth", "2015-06-29"),
                new KeyValuePair<string, string>("first_name", "qwe"),
                new KeyValuePair<string, string>("last_name", "asd"),
                new KeyValuePair<string, string>("loc_final", "14"),
                new KeyValuePair<string, string>("loc_selected", "14"),
                new KeyValuePair<string, string>("mission_selected", "3"),
                new KeyValuePair<string, string>("missionId", "3"),
                new KeyValuePair<string, string>("nationalityId", "43"),
                new KeyValuePair<string, string>("passport_no", "e54232124"),
                new KeyValuePair<string, string>("passportType", "01"),
                new KeyValuePair<string, string>("phone", "15657525415"),
                new KeyValuePair<string, string>("phone_code", "86"),
                new KeyValuePair<string, string>("pptExpiryDate", "2019-08-14"),
                new KeyValuePair<string, string>("pptIssueDate", "2016-08-17"),
                new KeyValuePair<string, string>("pptIssuePalace", "beijing"),
                new KeyValuePair<string, string>("save", "Submit"),
                new KeyValuePair<string, string>("VisaTypeId", "93"),
            };
            var content3 = new FormUrlEncodedContent(thirdForm);
            var finalPost = client.PostAsync("/appointment.php", content3).Result;
            var finalPostHtml = finalPost.Content.ReadAsStringAsync().Result;


            return View();
        }

        public ActionResult ApplyMalaysiaVisa()
        {
            #region  官网注册
            var email = "gkni63@163.com";
            //第一次 Get 获取表单
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://www.windowmalaysia.my/evisa/");
            var response = client.GetAsync("vlno_register.jsp?type=register").Result;

            //获取session
            var session_id = response.Headers.GetValues("Set-Cookie").Last().Substring(11, 32);  //post的session_id   request.header

            //获取tkn的值 用于验证验证码
            var response2 = client.GetAsync("vlno_ajax_getToken.jsp").Result;
            var tkn = response2.Content.ReadAsStringAsync().Result;
            //编码之后请求验证码jpg
            var s = WebUtility.UrlEncode(tkn);

            //存储要返回的html字符串
            var returnString = string.Empty;
            //do
            //{
            var captcha = client.GetAsync($"captchaImaging?tkn={s}&_=1544767217200").Result;
            if (!captcha.StatusCode.Equals(200))
            {
                return View("验证码输入错误");
            }
            var bit = captcha.Content.ReadAsByteArrayAsync().Result;

            WriteSomething.Write($"{email}captcha.jpg", bit);
            var answer = Console.ReadLine();
            List<KeyValuePair<string, string>> paramList = new List<KeyValuePair<string, string>>();
            paramList.Add(new KeyValuePair<string, string>(nameof(session_id), session_id));
            paramList.Add(new KeyValuePair<string, string>("ipAddress", "180.155.33.217"));
            paramList.Add(new KeyValuePair<string, string>("fullPage", "https://www.windowmalaysia.my/evisa/vlno_register.jsp?type=register"));
            paramList.Add(new KeyValuePair<string, string>("locIPAddress", "China"));
            paramList.Add(new KeyValuePair<string, string>("refImg", ""));
            paramList.Add(new KeyValuePair<string, string>("tkn", tkn));
            paramList.Add(new KeyValuePair<string, string>("firstName", "first"));
            paramList.Add(new KeyValuePair<string, string>("lastName", "last"));
            paramList.Add(new KeyValuePair<string, string>("nationality", "47"));
            paramList.Add(new KeyValuePair<string, string>("nationalityhid", "47"));
            paramList.Add(new KeyValuePair<string, string>("passportNo", "g666666666"));
            paramList.Add(new KeyValuePair<string, string>("gender", "1"));
            paramList.Add(new KeyValuePair<string, string>("dob", "01/01/1910"));
            paramList.Add(new KeyValuePair<string, string>("address1", "address"));
            paramList.Add(new KeyValuePair<string, string>("address2", ""));
            paramList.Add(new KeyValuePair<string, string>("postcode", ""));
            paramList.Add(new KeyValuePair<string, string>("city", ""));
            paramList.Add(new KeyValuePair<string, string>("country", "101"));
            paramList.Add(new KeyValuePair<string, string>("phoneNumber", "15611234456"));
            paramList.Add(new KeyValuePair<string, string>("email", email));
            paramList.Add(new KeyValuePair<string, string>("password", "123qweasd"));
            paramList.Add(new KeyValuePair<string, string>("cpassword", "123qweasd"));
            paramList.Add(new KeyValuePair<string, string>("answer", answer));
            paramList.Add(new KeyValuePair<string, string>("btnRegister", "注册"));

            var content = new FormUrlEncodedContent(paramList);
            var postForm = client.PostAsync("register", content).Result;
            returnString = postForm.Content.ReadAsStringAsync().Result;
            //验证不用过一直验证
            //} while (returnString.IndexOf("Thank you! User successfully registered.")!=-1); 
            WriteSomething.Write($"{email}index.html", returnString);
            //注册表单已经成功，还未加入验证码循环和try catch
            #endregion



            //验证码激活块。


            #region    官网登陆
            var txtEmail = "gkni63@163.com";
            var password = "123qweasd";
            client.BaseAddress = new Uri("https://www.windowmalaysia.my/");
            //获取session
            var responseSession = client.GetAsync("evisa/evisa.jsp?alreadyCheckLang=1&lang=zh").Result;

            //获取tkn的值 用于验证验证码
            var responsetTkn = client.GetAsync("evisa/vlno_ajax_getToken.jsp").Result;
            var Logintkn = responsetTkn.Content.ReadAsStringAsync().Result;
            //编码之后请求验证码jpg
            var Logins = WebUtility.UrlEncode(Logintkn);
            var loginCaptcha = client.GetAsync($"evisa/captchaImaging?tkn={Logins}&_=1544778040826").Result;
            if (!loginCaptcha.StatusCode.Equals(200))
            {
                return View("验证码错误");
            }
            var LoginBit = loginCaptcha.Content.ReadAsByteArrayAsync().Result;

            WriteSomething.Write($"{txtEmail}captcha.jpg", LoginBit);
            var loginAnswer = Console.ReadLine();
            txtEmail = WebUtility.UrlEncode(txtEmail);
            var loginurl = $"evisa/login?ipAddress=180.155.33.217&tkn={s}&txtEmail={txtEmail}&txtPassword={password}&answer={answer}&_=1544776836288";
            var login = client.GetAsync(loginurl).Result;

            //模拟进入welcome.jsp
            var welcome = client.GetAsync("evisa/welcome.jsp").Result;
            var wel = welcome.Content.ReadAsStringAsync().Result;
            WriteSomething.Write($"{txtEmail}welcome.html", wel);

            //模拟进入电子签证
            var key = wel.Substring(wel.IndexOf("key=") + 4, 60);
            var redirect = client.GetAsync($"entri/redirect.jsp?userEmail={txtEmail}&key={key}&country=CHINA").Result;
            var reHtlm = redirect.Content.ReadAsStringAsync().Result;
            WriteSomething.Write($"{txtEmail}redirect.html", reHtlm);

            //模拟进入申请列表历史记录页面
            var registration = client.GetAsync($"entri/registration.jsp").Result;
            var registrationHtml = registration.Content.ReadAsStringAsync().Result;


            //上传照片 https://www.windowmalaysia.my/entri/photo  responese location中有存储了数据的url https://www.windowmalaysia.my/entri/registration.jsp?appNumber=ENT/OHB17/PCFCB090

            string path1 = @"C:\Users\admin\Desktop\woman.jpg";
            var filebyte = FileReadAsByte.FileToByteArray(path1);

            var requestContent = new MultipartFormDataContent();

            var streamcontent = new StreamContent(new MemoryStream(filebyte));

            var fileInfo = new FileInfo(path1);
            var fileContent = new StreamContent(fileInfo.OpenRead());

            requestContent.Add(streamcontent);
            client.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            client.DefaultRequestHeaders.Add("Content-Type", "multipart/form-data");

            var message1 = client.PostAsync("entri/photo", requestContent).Result;
            var input1 = message1.Content.ReadAsStringAsync().Result;

            //return !string.IsNullOrWhiteSpace(input) ? Regex.Match(input, @"http://\w*\.directupload\.net/images/\d*/\w*\.[a-z]{3}").Value : null;
            //上传护照 https://www.windowmalaysia.my/entri/passport
            string path2 = @"C:\Users\admin\Desktop\man.jpg";
            var filebit2 = FileReadAsByte.FileToByteArray(path2);
            var filecontent2 = new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture));
            filecontent2.Add(new StreamContent(new MemoryStream(filebit2)));
            client.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            client.DefaultRequestHeaders.Add("Content-Type", "multipart/form-data");

            var message2 = client.PostAsync("entri/photo", filecontent2).Result;
            var input2 = message2.Content.ReadAsStringAsync().Result;


            //上传航班行程 https://www.windowmalaysia.my/entri/itinerary
            string path3 = @"C:\Users\admin\Desktop\eNTRI_Chinese_Nationals_en.pdf";
            var filebit3 = FileReadAsByte.FileToByteArray(path3);
            var filecontent3 = new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture));
            filecontent2.Add(new StreamContent(new MemoryStream(filebit3)));
            client.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            client.DefaultRequestHeaders.Add("Content-Type", "multipart/form-data");

            var message3 = client.PostAsync("entri/photo", filecontent3).Result;
            var input3 = message2.Content.ReadAsStringAsync().Result;



            //提交表单 https://www.windowmalaysia.my/entri/registration
            client.GetAsync("entri/registration.jsp?appNumber=ENT/OHB17/BFZRD034");
            List<KeyValuePair<string, string>> potparam = new List<KeyValuePair<string, string>>();
            paramList.Add(new KeyValuePair<string, string>("countryId", "47"));
            paramList.Add(new KeyValuePair<string, string>("user", "3796178"));
            paramList.Add(new KeyValuePair<string, string>("appNumber", "ENT/OHB17/PCFCB090"));
            paramList.Add(new KeyValuePair<string, string>("appVisaNumber", ""));
            paramList.Add(new KeyValuePair<string, string>("appEmail", "ofc810@163.com"));
            paramList.Add(new KeyValuePair<string, string>("appPurposeStay", "11"));
            paramList.Add(new KeyValuePair<string, string>("expatCategory", "0"));
            paramList.Add(new KeyValuePair<string, string>("principleName", ""));
            paramList.Add(new KeyValuePair<string, string>("occupation", ""));
            paramList.Add(new KeyValuePair<string, string>("expatRelationship", ""));
            paramList.Add(new KeyValuePair<string, string>("appFirstName", "FIRST"));
            paramList.Add(new KeyValuePair<string, string>("appLastName", "LAST"));
            paramList.Add(new KeyValuePair<string, string>("appGender", "2"));
            paramList.Add(new KeyValuePair<string, string>("appDob", "1980-01-01"));
            paramList.Add(new KeyValuePair<string, string>("appNationality", "47"));
            paramList.Add(new KeyValuePair<string, string>("appPhoneNumber", "12345678912"));
            paramList.Add(new KeyValuePair<string, string>("appDocType", "1"));
            paramList.Add(new KeyValuePair<string, string>("appDocNumber", "G666666666"));
            paramList.Add(new KeyValuePair<string, string>("appDocCountryIssued", "47"));
            paramList.Add(new KeyValuePair<string, string>("appDocIssueDt", "01/02/2010"));
            paramList.Add(new KeyValuePair<string, string>("appDocIssuedDay", "1"));
            paramList.Add(new KeyValuePair<string, string>("appDocIssuedMonth", "2"));
            paramList.Add(new KeyValuePair<string, string>("appDocIssuedYear", "2010"));
            paramList.Add(new KeyValuePair<string, string>("appLastExitDt", ""));
            paramList.Add(new KeyValuePair<string, string>("appLastExitDay", "0"));
            paramList.Add(new KeyValuePair<string, string>("appLastExitMonth", "0"));
            paramList.Add(new KeyValuePair<string, string>("appLastExitYear", "0"));
            paramList.Add(new KeyValuePair<string, string>("appDocExpiryDt", "01/02/2020"));
            paramList.Add(new KeyValuePair<string, string>("appDocExpiredDay", "1"));
            paramList.Add(new KeyValuePair<string, string>("appDocExpiredMonth", "2"));
            paramList.Add(new KeyValuePair<string, string>("appDocExpiredYear", "2020"));
            paramList.Add(new KeyValuePair<string, string>("appTravelDtStart", "01/02/2019"));
            paramList.Add(new KeyValuePair<string, string>("appTravelDayStart", "1"));
            paramList.Add(new KeyValuePair<string, string>("appTravelMonthStart", "2"));
            paramList.Add(new KeyValuePair<string, string>("appTravelYearStart", "2019"));
            paramList.Add(new KeyValuePair<string, string>("countryRouteMalaysia", "47"));
            paramList.Add(new KeyValuePair<string, string>("countryTransitMalaysia", "0"));
            paramList.Add(new KeyValuePair<string, string>("countryDestinationMalaysia", "131"));
            paramList.Add(new KeyValuePair<string, string>("appEnterVia", "Air"));
            paramList.Add(new KeyValuePair<string, string>("appTravelDtEnd", "10/02/2019"));
            paramList.Add(new KeyValuePair<string, string>("appTravelDayEnd", "10"));
            paramList.Add(new KeyValuePair<string, string>("appTravelMonthEnd", "2"));
            paramList.Add(new KeyValuePair<string, string>("appTravelYearEnd", "2019"));
            paramList.Add(new KeyValuePair<string, string>("countryRouteHome", "131"));
            paramList.Add(new KeyValuePair<string, string>("countryTransitHome", "0"));
            paramList.Add(new KeyValuePair<string, string>("countryDestinationHome", "47"));
            paramList.Add(new KeyValuePair<string, string>("appExitVia", "Air"));
            paramList.Add(new KeyValuePair<string, string>("appAddress1", "SHANGHAI"));
            paramList.Add(new KeyValuePair<string, string>("appAddress2", ""));
            paramList.Add(new KeyValuePair<string, string>("appPostcode", "201000"));
            paramList.Add(new KeyValuePair<string, string>("appCity", "SHANGHAI"));
            paramList.Add(new KeyValuePair<string, string>("showProvince", "true"));
            paramList.Add(new KeyValuePair<string, string>("appProvince", "31"));
            paramList.Add(new KeyValuePair<string, string>("appMysAddress1", "SHANGHAI"));
            paramList.Add(new KeyValuePair<string, string>("appMysAddress2", ""));
            paramList.Add(new KeyValuePair<string, string>("appMysPostcode", "201000"));
            paramList.Add(new KeyValuePair<string, string>("appMysCity", "SHANGHAI"));
            paramList.Add(new KeyValuePair<string, string>("paymentMethod", "alipay"));
            paramList.Add(new KeyValuePair<string, string>("travelExceed", "0"));
            paramList.Add(new KeyValuePair<string, string>("exitStampStatus", "0"));
            paramList.Add(new KeyValuePair<string, string>("termCondition", "on"));
            paramList.Add(new KeyValuePair<string, string>("btnSave", "/*AGREE*/ "));
            content = new FormUrlEncodedContent(potparam);

            client.DefaultRequestHeaders.Add("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            client.DefaultRequestHeaders.Add("origin", "https://www.windowmalaysia.my");
            client.DefaultRequestHeaders.Add("referer", "https://www.windowmalaysia.my/entri/registration.jsp?appNumber=ENT/OHB17/BFZRD034");

            postForm = client.PostAsync("entri/registration", content).Result;
            var returnHtml = postForm.Content.ReadAsStringAsync().Result;

            #endregion

            return View();
        }
    }
}