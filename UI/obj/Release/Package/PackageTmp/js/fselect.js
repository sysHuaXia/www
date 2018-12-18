$(document).ready(function(){
	//客户类型
    $("#select1 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectA").remove();
            $(".select-no").show();
        } else {
            var copyThisA = $(this).clone();
            if ($("#selectA").length > 0) {
                $("#selectA a").html($(this).text());
            } else {
                copyThisA.attr("onclick", "del(this,1);");
                $(".select-result dl").append(copyThisA.attr("id", "selectA"));
                $("#selectA a").removeAttr("onclick");
            }
        }
    });

    $("#select8 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectH").remove();
            $(".select-no").show();
        } else {
            var copyThisH = $(this).clone();
            if ($("#selectH").length > 0) {
                $("#selectH a").html($(this).text());
            } else {
                copyThisH.attr("onclick", "del(this,8);");
                $(".select-result dl").append(copyThisH.attr("id", "selectH"));
                $("#selectH a").removeAttr("onclick");
            }
        }
    });
	
	$("#select2 dd").click(function () {
	    $(this).addClass("selected").siblings().removeClass("selected");
	    if ($(this).hasClass("select-all")) {
	        $("#selectB").remove();
	        $(".select-no").show();
	    } else {
	        var copyThisB = $(this).clone();
	        if ($("#selectB").length > 0) {
	            $("#selectB a").html($(this).text());
	        } else {
	            $(".select-no").hide();
	            copyThisB.attr("onclick", "del(this,2);");
	            $(".select-result dl").append(copyThisB.attr("id", "selectB"));
	            $("#selectB a").removeAttr("onclick");
	        }
	    }
	});

	$("#select4 dd").click(function () {
	    $(this).addClass("selected").siblings().removeClass("selected");
	    if ($(this).hasClass("select-all")) {
	        $("#selectD").remove();
	        $(".select-no").show();
	    } else {
	        var copyThisD = $(this).clone();
	        if ($("#selectD").length > 0) {
	            $("#selectD a").html($(this).text());
	        } else {
	            copyThisD.attr("onclick", "del(this,4);");
	            $(".select-result dl").append(copyThisD.attr("id", "selectD"));
	            $("#selectD a").removeAttr("onclick");
	        }
	    }
	});
	
	$(".select dd").click("click", function () {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	
});