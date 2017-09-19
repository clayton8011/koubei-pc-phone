		var businessCircle = {
			event:null,
			init:function() {
				var swiper = new Swiper('#scenic-spot-list,#scenes-list', {
			        // pagination: '.swiper-pagination',
			        slidesPerView: 4,
			        paginationClickable: false,
			        spaceBetween: "2.5%",
			        freeMode: true
			    });
				var swiper = new Swiper('#other-activity-list', {
			        // pagination: '.swiper-pagination',
			        slidesPerView: 3,
			        paginationClickable: false,
			        spaceBetween: "4%",
			        freeMode: true
			    });
			    if(!event) {
			    	businessCircle.bindEvent;
			    }
			},
			bindEvent:$(function() {
//				开关菜单
				$("#cn-button").on('tap',function() {
					if (this.className == "cn-button active") {
						businessCircle.showManu(this);
					} else {
						businessCircle.hideManu(this);
					}
				});
				//菜单部分
					//推荐商家
				$(".businessmen-btn").on('tap',function(){
					$(".scene-bottom,.scenic-spot-bottom").hide();
					document.getElementById("base-high-sw-btn").className="swiper-down-btn";
					$(".businessmen-box").addClass("show-part").siblings().removeClass("show-part");
					businessCircle.collapseBaseBox(document.getElementById("base-high-sw-btn"));
					$(".base-high-bottom").show();
				})
					//特色活动
				$(".tese-activity-btn").on('tap',function(){
					$(".scene-bottom,.scenic-spot-bottom").hide();
					document.getElementById("base-high-sw-btn").className="swiper-down-btn";
					$(".activity-box").addClass("show-part").siblings().removeClass("show-part");
					businessCircle.collapseBaseBox(document.getElementById("base-high-sw-btn"));
					$(".base-high-bottom").show();
				})
					//主题推荐
				$(".theme-btn").on('tap',function(){
					$(".scene-bottom,.scenic-spot-bottom").hide();
					document.getElementById("base-high-sw-btn").className="swiper-down-btn";
					$(".theme-box").addClass("show-part").siblings().removeClass("show-part");
					businessCircle.collapseBaseBox(document.getElementById("base-high-sw-btn"));
					$(".base-high-bottom").show();
				})
				//VR
				$('.vr-btn').on('tap',businessCircle.vrController);
//				$(".public-btn").on('tap',function(){
//					$(".scene-bottom,.scenic-spot-bottom").hide();
//					$(".public-box").addClass("show-part").siblings().removeClass("show-part");
//					businessCircle.collapseBaseBox(document.getElementById("base-high-sw-btn"))
//					$(".base-high-bottom").show();
//				})
				//场景
				$("body").on('tap','#scenes-sw-btn',function() {
					businessCircle.collapseScene(this);
				})
				//公用菜单收缩
				$("body").on('tap','#base-high-sw-btn',function() {
					businessCircle.collapseBaseBox(this);
				})
//				音乐
				$(".music-btn").on('tap',function() {
					businessCircle.musicListSH();
				})
				$(".music-list").on('tap','li',function(){
					$(this).addClass('active').siblings().removeClass("active");
				})
//				景点列表
				$(".scenic-spot-sw-list").on('click','li',function(){
					$(this).addClass("active").siblings().removeClass('active');
				});
//				景点全部
				$('.show-all-btn').on('tap',function(){
					businessCircle.showSpotAll(this);
				})
				$('#scenic-spot-sw-btn').on('click',function(){
					businessCircle.collapseSpot(this);
				})
//				景区介绍
				$('.show-all-inf-btn').on('tap',function(){
					businessCircle.showInfAll(this);
				});
				$("#to-line-show").on('tap',function(){
					$(".activity-modal").fadeIn();
				})
				$(".ac-close-btn").on('tap',function(){
					$(".activity-modal").fadeOut();
				})

				//头条
				$("#toutiao-sw").on('tap',function(){
					if(document.getElementById("base-high-sw-btn").className =="swiper-down-btn swiper-up-btn") {
						return;
					} else {
						$(".scene-bottom,.scenic-spot-bottom").hide();
						document.getElementById("base-high-sw-btn").className="swiper-down-btn";
						$(".headlines-show-box").addClass("show-part").siblings().removeClass("show-part");
						businessCircle.collapseBaseBox(document.getElementById("base-high-sw-btn"))
						$(".base-high-bottom").show();
					}
				})
			}),
			showManu:function(obj) {
				$(".manu-list").removeClass("opened-nav");
				document.getElementById("cn-button").className="cn-button";
				$("#shop-list").removeClass('swiper-container-hide');
				setTimeout(function() {
					$(".manu-list").width("0");
				},300)
			},
			hideManu:function(obj) {
				$(".manu-list").addClass("opened-nav");
				document.getElementById("cn-button").className="cn-button active";
				$("#shop-list").addClass('swiper-container-hide');
				 $(".manu-list").width("31.8%");
			},
			collapseScene:function(obj){
				var cal=obj.className;
				if(cal == "swiper-down-btn") {
					$("#scenes-list").height(0);
					$(".line").hide();
					obj.className = "swiper-down-btn swiper-up-btn";
				} else {
					$("#scenes-list").height("43.8%");
					$(".line").show();
					obj.className = "swiper-down-btn";
				}
			},
			collapseSpot:function(obj){
				var cal=obj.className;
				if(cal == "swiper-down-btn") {
					$(".scenic-spot-bottom").height("auto");
//					$(".scenic-spot-detial").addClass("hide-detial");
					$(".scenic-spot-detial").hide();
					obj.className = "swiper-down-btn swiper-up-btn";
				} else {
//					$(".scenic-spot-detial").removeClass("hide-detial");
					$(".scenic-spot-detial").show();
					$(".scenic-spot-bottom").height("48%");
					obj.className = "swiper-down-btn";
				}
			},
			showSpotAll:function(obj) {
				var cl=obj.className;
				if(cl == "show-all-btn") {
					$(".scenic-spot-bottom").addClass('scenic-show-all');
					obj.className="show-all-btn showed";
					obj.innerHTML="收起全部<img src=\"images/all-down.png\">"
				}else {
					$(".scenic-spot-bottom").removeClass('scenic-show-all');
					obj.className="show-all-btn";
					obj.innerHTML="查看全部<img src=\"images/all-down.png\">"
				}
			},
			showInfAll:function(obj) {
				var cl=obj.className;
				if(cl == "show-all-inf-btn") {
					$(".scenic-introduction").addClass('inf-showed');
					obj.className="show-all-inf-btn showed";
					obj.innerHTML="收起全部<img src=\"images/all-down.png\">"
				}else {
					$(".scenic-introduction").removeClass('inf-showed');
					obj.className="show-all-inf-btn";
					obj.innerHTML="查看全部<img src=\"images/all-down.png\">"
				}
			},
			collapseBaseBox:function(obj){
				// var cal=obj.className;
				// if(cal == "swiper-down-btn") {
				// 	$(".base-high-bottom").height("7rem");
				// 	obj.className = "swiper-down-btn swiper-up-btn";
				// 		$(".base-high-bottom-box").css({"opacity":"0"});
				// } else {
				// 	$(".base-high-bottom-box").css({"opacity":"1"});
				// 	$(".base-high-bottom").height("77.15%");
				// 	obj.className = "swiper-down-btn";
				// }
			},
			setToutiaoSw:function(){
				var swiper = new Swiper('#toutiao-sw', {
		//	        pagination: '.swiper-pagination',
		//	        nextButton: '.swiper-button-next',
		//	        prevButton: '.swiper-button-prev',
			        paginationClickable: true,
			        spaceBetween: 30,
			        centeredSlides: true,
			        autoplay: 2000,
			        autoplayDisableOnInteraction: false,
		        	direction: 'vertical',
		        	loop: true
			    });
			},
			musicListSH:function() {
				var listBody = document.getElementsByClassName("music-list")[0];
				if(listBody.className == "music-list") {
					listBody.className+= " music-anim";
				} else {
					listBody.className  = "music-list"
				}
			},
			vrController:function(){
			    var krpano = document.getElementById('krpanoSWFObject');
			    var webvr = krpano.get("webvr");
			    webvr.entervr();
			}

		}
		$(document).ready(function(){
			businessCircle.init();
			//去除loading
			// $.mobile.hidePageLoadingMsg();
			businessCircle.setToutiaoSw();
		})
