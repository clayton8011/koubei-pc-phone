$(window).ready(function(){
	// 设置富集元素的宽高为当前屏幕的大小
	var nowHeight = $(window).height();
	var nowWidth = $(window).width();
	//	console.log(nowHeight);
	//	console.log(nowWidth);
	
	$('.show').css({
		"width" : nowWidth,
		"height" : nowHeight
	})
	
	// foot_map的单击事件	
	$('#mn-map').click(function(){
		console.log("111")
		// 仅当前按钮是红色
		$('#mn-map').css({"background":"url(./images/mn-map-ac.png) no-repeat center center/auto 100%"})
		$('#mn-tuijian').css({"background":"url(./images/mn-tuijian.png) no-repeat center center/auto 100%"})
		$('#mn-find').css({"background":"url(./images/mn-find.png) no-repeat center center/auto 100%"})
		
		document.title = '地图';
	})
	// foot_offer的单击事件	
	$('#mn-tuijian').click(function(){
		console.log("222")
		// 仅当前按钮是红色
		$('#mn-map').css({"background":"url(./images/mn-map.png) no-repeat center center/auto 100%"})
		$('#mn-tuijian').css({"background":"url(./images/mn-tuijian-ac.png) no-repeat center center/auto 100%"})
		$('#mn-find').css({"background":"url(./images/mn-find.png) no-repeat center center/auto 100%"})
		// 改变链接
		$("#book-link").attr("src","http://bjhdqw.weishutu.com/index.php/book/index")
		document.title = '推荐';
	})
	// foot_fond的单击事件	
	$('#mn-find').click(function(){
		console.log("333")
		// 仅当前按钮是红色
		$('#mn-map').css({"background":"url(./images/mn-map.png) no-repeat center center/auto 100%"})
		$('#mn-tuijian').css({"background":"url(./images/mn-tuijian.png) no-repeat center center/auto 100%"})
		$('#mn-find').css({"background":"url(./images/mn-find-ac.png) no-repeat center center/auto 100%"})
		
		// 改变链接
		$("#book-link").attr("src","http://bjhdqw.weishutu.com/index.php/book/store")
		document.title = '搜索';
	})	 
})