var businessCircle = {
	event:null,
	init:function() {
	    if(!event) {
	    	businessCircle.bindEvent;
	    }
	},
	bindEvent:$(function() {
//		菜单部分
		$('#manu-list').on('click','a',function() {
			var _this =this;
			$('#manu-list').find(".active").removeClass('active');
			$(_this).addClass("active");
		})
		$("#template-list").on('click','a',function() {
//				$("#heading-template").find('a').addClass("coll");
			var _id ="heading-"+ this.parentNode.parentNode.id.replace("-list","");
			$("#"+_id).find('a').addClass("coll");
		})
		$('#template-list,#shangquan-list').on('hide.bs.collapse', function () {
			var _id = this.id.replace("-list","");
			$("#heading-"+_id).find('a').removeClass("coll");
		});
//菜单部分结束
		$(".shop-list").on('click','.vr-set-btn',function(){
			$('.shop-list-box').hide();
			$('.vr-set-box').fadeIn();
		});
		$(".back-btn").on('click',function() {
			$('.vr-set-box').hide();
			$('.shop-list-box').fadeIn();
		})
		$(".add-sceneimg-list").on('click','.rename-btn',function() {
			var txt=$(this).prev().text();
			$('.rename-input').text(txt);
		})
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
			if(num == 100) {
				setTimeout(function() {
					selectObj.remove();
				},500)
			}
		}
	}

}
businessCircle.init();