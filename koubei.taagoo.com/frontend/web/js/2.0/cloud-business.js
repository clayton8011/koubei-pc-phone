var businessCircle = {
	event:null,
	init:function() {
	    if(!event) {
	    	businessCircle.bindEvent;
	    }
	},
	bindEvent:$(function() {
//		菜单部分
		$('.manu-list').on('click','li',function() {
			var _this =this;
			$('.manu-list').find(".active").removeClass('active');
			$(_this).addClass("active");
		})
//菜单部分结束
	}),
    progress:function(obj,num) {
        if (num <0 || num >100) {
            alert("输入数值超范围");
            return;
        }
        var selectObj = $('#'+obj),
            deg;
        selectObj.find('.pro-number').text(num+"%");
        if(num < 50) {
            deg=225-num*3.6;
            selectObj.find(".rightcircle").css({"transform":"rotate(225deg)","-ms-transform":"rotate(225deg)","-moz-transform":"rotate(225deg)","-webkit-transform":"rotate(225deg)"});
            selectObj.find(".progress-right").hide();
            selectObj.find(".leftcircle").css({"transform":"rotate("+deg+"deg)","-ms-transform":"rotate("+deg+"deg)","-moz-transform":"rotate("+deg+"deg)","-webkit-transform":"rotate("+deg+"deg)"});
        }else {
            deg=45-num*3.6;
            selectObj.find(".progress-right").show();
            selectObj.find(".leftcircle").css({"transform":"rotate(45deg)","-ms-transform":"rotate(45deg)","-moz-transform":"rotate(45deg)","-webkit-transform":"rotate(45deg)"});
            selectObj.find(".rightcircle").css({"transform":"rotate("+deg+"deg)","-ms-transform":"rotate("+deg+"deg)","-moz-transform":"rotate("+deg+"deg)","-webkit-transform":"rotate("+deg+"deg)"});
        }
    },
    // 音频 图片上传进度控制
    material_progress : function (obj, num) {
        if (num <0 || num >100) {
            alert("输入数值超范围");
            return;
        }
        obj.find('.gress-box div').css('width',num+"%");
    }

}
businessCircle.init();