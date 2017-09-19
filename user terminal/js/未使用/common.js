$(document).ready(function(){
	$(".whole").click(function(){
		for(var i=0 ;i<2;i++){
             $(".pur-cent ul").append("<li><div class='pur-li-nr'><span class='pur-cent-img'><img src='../img/shop-pay.png'/></span><p>[小鹰1.0VR动景相机]专业1.0VR动景相机/360度全景拍摄/高清双镜头</p><span class='pur-rmb'><a>￥</a>1688.00</span><span class='pur-shu'><a>x</a>1</span></div></li>"); 
		 }
	})
	
	$(".pay_list li").click(function(){
		if ($(this).hasClass("selected")) {
			$(this).removeClass().siblings('li').removeClass();
		}else{
			$(this).addClass('selected').siblings('li').removeClass();
		}
	})
	
	
	//发票
	$(".inv_top").click(function(){
		$(".box1").hide().siblings(".box2").show();
	})
	$(".inv-btn").click(function(){
		$(".box2").hide().siblings(".box1").show();
	})
	
	
	$(".inv-whether span").click(function(){
		$(this).children("a").addClass("inv-yes").removeClass("inv-no");
		$(this).siblings().children("a").removeClass("inv-yes").addClass("inv-no");
	})
})