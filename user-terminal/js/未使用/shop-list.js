$(document).ready(function(){
	$(".sea").focus(function(){
		$(".head-right").hide();
		$(".sea-right").show();
	})
	$(".sea").blur(function(){
		if ($(this).val()=="") {
			$(".head-right").show();
			$(".sea-right").hide();
		}else{
			$(".head-right").hide();
			$(".sea-right").show();
		}	
		$(".sea-right").click(function(){
			alert($(".sea").val())
		})
	})
	
	
	
	$(".category ul li").click(function(){
		$(this).addClass("first").siblings().removeClass("first");
	})
	$(".hot-title span").on("click", function() {

				$(this).addClass("choice").siblings().removeClass("choice");
				//屏幕的宽度
				var clientW = $(window).width();
				clientW = clientW / 2;
				//每个span的左边的位置
				var posL = $(this).position().left;
				//每个span的宽度的一半
				var halfW = ($(this).outerWidth()) / 2;
				if(posL < clientW) {
					$('.hot-title').stop().animate({
						scrollLeft: 0
					}, 400);
				} else {
					$('.hot-title').stop().animate({
						scrollLeft: clientW - halfW
					}, 400);
				}
			});
})


