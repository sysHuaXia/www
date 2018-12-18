

$(function () {
$(".tourguide dd").hide();
$(".tourguide dl .tit_on").next().show();
$(".tourguide dt").click(function(){
	
			if($(this).next().is(":hidden"))
		{   $(".tourguide dt").removeClass("tit_on");
			$(".tourguide dd").slideUp();
			$(this).next().slideDown();
			$(this).addClass("tit_on");
			
			
		}else{
			 $(".tourguide dt").removeClass("tit_on");
			$(".tourguide dd").slideUp();
			
			}});
	  }); 