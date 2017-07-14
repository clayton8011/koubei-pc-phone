//商品详情
var mySwiper = new Swiper('.swiper-container', {
	//	autoplay:1000,
	loop: true,

	// 如果需要分页器
	pagination: '.swiper-pagination',
})

$(document).ready(function() {
	$(".detail li").click(function() {
		$(this).addClass("miao").siblings().removeClass("miao");
		var index = $(this).index();
		var top = $(".louti").eq(index).offset().top;
		$("html,body").animate({
			"scrollTop": top
		}, 1000);
	})
	
	$(".more").click(function(){
		 for(var i=0 ;i<2;i++){    
             $(".comment ul").append("<li><span class='com-pic'><img src='../img/tou-pic.png'/></span><div class='com-right'><div class='name'><span>江左梅郎</span><span>2017-02-09</span></div><p class='com-nr'>操作方便，Toogoo小鹰专业全景VR相机360度全景拍摄高清摄像头</p></div></li>"); 
		 }
	})
	
	$(".purchase").click(function(){
		$(".layer").show().siblings(".payment").show();
	})
	
	
	$("footer span:eq(3)").click(function(){
		if ($(this).children().hasClass("xin")) {
			$(this).children().addClass("hxin").removeClass("xin");
		}else{
			$(this).children().addClass("xin").removeClass("hxin");
		}
	})
	
	//关闭购买
	$(".close").click(function(){
		$(".layer").hide().siblings(".payment").hide();
	})
	//选中购买
	$(".pay-top span:first-child").click(function(){
		if ($(this).hasClass("pay-no")) {
			$(this).addClass("pay-yes").removeClass("pay-no");
		}else{
			$(this).addClass("pay-no").removeClass("pay-yes");
		}
	})
	
	//商品数量和价格
	var t = $(".quantity");  
    $(".add").click(function(){  
        t.val(parseInt(t.val())+1);  
        $(".min").removeAttr("disabled");                 //当按加1时，解除$("#min")不可读状态  
        setTotal();  
    })  
    $(".min").click(function(){  
               if (parseInt(t.val())>1) {                     //判断数量值大于1时才可以减少  
                t.val(parseInt(t.val())-1)  
                }else{  
                $(".min").attr("disabled","disabled")        //当$("#min")为1时，$("#min")不可读状态  
               }  
        setTotal();  
    })  
    function setTotal(){  
        $(".pay-rmb i").html((parseInt(t.val())*1688.00).toFixed(2));  
    }  
    setTotal(); 
})