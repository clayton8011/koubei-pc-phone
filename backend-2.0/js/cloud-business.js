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
		//主页面
		$(".p-list-hover-box").on('click','a',function(){
//   			console.log(this);
     			var obj=$(this).data("linkpage");
//   			console.log(obj);
     			if(obj == "scenic-area-edit-info"  ) {
     				$(".base-content").hide();
     				$("."+obj).fadeIn();
     			} else if(obj) {
     				$(".scenic-area-inf").hide();
     				$("."+obj).fadeIn();
     			}
     			console.log(obj)
     		})
//		活动
		$('.activity-list').on('click','.sort-btn',function(){
			$(this).next().toggle();
		})
		$('.activity-list').on('click','.sorting-list li',function(){
			var num=$(this).data('number');
			$(this).parent().toggle();
		})
//		筛选
		$('.filter-btn').on('click',function(event){
			$('.filter-box').fadeToggle(200);
		})
		
		$('.activity-list').on('click','.list-edit-btn',function(){
			$('.base-content').hide();
			$('.activity-edit').fadeIn();
		})
		
		$('.headlines-box').on('click','.head-title',function(){
			$(this).toggleClass('h-t-active');
		})
		
		$(".close-tip").on('click',function(){
			$(this).parent().hide();
		})
		$(".add-totice").on('click',function(){
			$('.input-notice').show();
		})
		$(".notice-input-cancel").on('click',function(){
			$('.input-notice').hide();
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
			if(num == 100) {
				setTimeout(function() {
					selectObj.remove();
				},500)
			}
		}
	},
	filterSelect:function(){
		
	},
	isIe:function(){
		var isIe=new RegExp(/(msie\s|trident.*rv:)([\w.]+)/).test(navigator.userAgent.toLowerCase());
		if (isIe) {
			$('input.checkbox-type-hui,.checkbox-type').css({"visibility":"visible"});
		}
//		return isIe;
	},
	addTotice:function(){
		
	}

}
businessCircle.init();