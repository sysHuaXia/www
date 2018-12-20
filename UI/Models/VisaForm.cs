using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class SVisaForm
    {
        public int ID { get; set; }
        /// <summary>
        /// 预约  个人=Individual 团队=Family
        /// </summary>
        [Display(Name = "预约")]
        public string app_type { get; set; }
        /// <summary>
        /// 选择递交中心  北京=3#14 上海=4#15
        /// </summary>
        [Display(Name = "选择递交中心")]
        public string centre { get; set; }
        /// <summary>
        /// 预约类型 Normal =正常 Premium=增资服务
        /// </summary>
        [Display(Name = "预约类型")]
        public string category { get; set; }
        /// <summary>
        /// 手机全球区号 默认 86
        /// </summary>
        [Display(Name = "手机区号")]
        public string phone_code { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        [Required]
        [StringLength(11, ErrorMessage = "手机号为11位")]
        [Display(Name = "手机号")]
        public string phone { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        [Required]
        [Display(Name = "邮箱")]
        //正则表达式验证必须是电子邮件
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "邮件地址不正确")]
        public string email { get; set; }
        /// <summary>
        /// 人数  当预约app_type =Family是  member有作用 但是有默认值为2
        /// </summary>
        [Required]
        [Display(Name = "人数")]
        public string member { get; set; }

        /// <summary>
        /// 申请日期
        /// </summary>
        [Required(ErrorMessage = "申请日期")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "申请日期")]
        public DateTime app_date { get; set; }
        /// <summary>
        /// 申请日期隐藏
        /// </summary>
        [Compare("app_date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "申请日期隐藏")]
        public DateTime app_date_hidden { get; set; }
        /// <summary>
        /// 申请时间段 e.g.:09:15 - 09:30
        /// </summary>
        [Required]
        [Display(Name = "申请时间段")]
        public string app_time { get; set; }
        /// <summary>
        /// 验证码  可以跳过
        /// </summary>
        [Required]
        [Display(Name = "验证码")]
        public string captcha { get; set; }

        /// <summary>
        /// 城市ID
        /// </summary>
        [Required]
        [Display(Name = "城市")]
        public string countryID { get; set; }
        /// <summary>
        /// 出生年月日
        /// </summary>
        [Required(ErrorMessage = "出生年月日")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "出生年月日")]
        public DateTime dateOfBirth { get; set; }
        /// <summary>
        /// 名
        /// </summary>
        [Required]
        [Display(Name = "名")]
        public string first_name { get; set; }
        /// <summary>
        /// 姓
        /// </summary>
        [Required]
        [Display(Name = "姓")]
        public string last_name { get; set; }
        /// <summary>
        /// 未知  默认14
        /// </summary>
        [Required]
        [Display(Name = "未知默认14")]
        public string loc_final { get; set; }
        /// <summary>
        /// 未知  默认14
        /// </summary>
        [Required]
        [Display(Name = "未知默认14")]
        public string loc_selected { get; set; }
        /// <summary>
        /// 未知  默认3
        /// </summary>
        [Required]
        [Display(Name = "未知默认3")]
        public string mission_selected { get; set; }
        /// <summary>
        /// 未知  默认3
        /// </summary>
        [Required]
        [Display(Name = "未知默认3")]
        public string missionId { get; set; }
        /// <summary>
        /// 国籍  43=中国 china
        /// </summary>
        [Required]
        [Display(Name = "国籍")]
        public string nationalityId { get; set; }
        /// <summary>
        /// 护照号
        /// </summary>
        [Required]
        [Display(Name = "护照号")]
        public string passport_no { get; set; }
        /// <summary>
        /// 护照类型 Ordinary passport = 01
        /// </summary>
        [Required]
        [Display(Name = "护照类型")]
        public string passportType { get; set; }
        /// <summary>
        /// 护照有效截止日期
        /// </summary>
        [Required(ErrorMessage = "护照有效截止日期")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "护照有效截止日期")]
        public DateTime pptExpiryDate { get; set; }
        /// <summary>
        /// 护照签发日期
        /// </summary>
        [Required(ErrorMessage = "护照签发日期")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "护照签发日期")]
        public DateTime pptIssueDate { get; set; }
        /// <summary>
        /// 护照签发地 beijing
        /// </summary>
        [Required]
        [Display(Name = "护照签发地")]
        public string pptIssuePalace { get; set; }
    }
}