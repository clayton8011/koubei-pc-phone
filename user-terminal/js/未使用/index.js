var mySwiper = new Swiper('.swiper-container', {
	//  direction: 'vertical',
	//	autoplay:1000,
	loop: true,

	// 如果需要分页器
	pagination: '.swiper-pagination',
})

$(document).ready(function() {
	$(".sea").focus(function() {
		$(".head-right").hide();
		$(".sea-right").show();
	})
	$(".sea").blur(function() {
		if($(this).val() == "") {
			$(".head-right").show();
			$(".sea-right").hide();
		} else {
			$(".head-right").hide();
			$(".sea-right").show();
		}
		$(".sea-right").click(function() {
			alert($(".sea").val())
		})
	})

	$(".togo-top-list li").click(function() {
		$(this).addClass("togo_opt").siblings().removeClass("togo_opt");
	})
	$(".togo-pin li").click(function() {
		$(this).addClass("togo-pin-ok").siblings().removeClass("togo-pin-ok");
	})

	$(".in_footer ul li").click(function() {
		$(this).addClass("foot_opt").siblings().removeClass();
	})

	//满减
	$(".discount ul li:eq(1)").click(function() {
		$(".layer").show().siblings(".lay-jian").show();
	})
	$(".cha").click(function() {
		$(".layer").hide().siblings(".lay-jian").hide();
	})
	//新人礼
	$(".discount ul li:eq(0)").click(function() {
		$(".layer").show().siblings(".xin-gift").show();
	})
	$(".pinmu_back").click(function() {
		$(".layer").hide().siblings(".xin-gift").hide();
	})
})

function getQueryString(a) {
	var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"),
		c = window.location.search.substr(1).match(b);
	return null != c ? unescape(c[2]) : null
}

function openMapModal(a, b) {
	var c, d;
	mapModalEl = a, c = document.getElementById("krpanoSWFObject"), c && c.call("skin_showthumbs(false);"), d = !0, $(".modal-title small").hide(), _U.mapMarkModal().openModal($(mapModalEl).data("locationData"), b, d), $("#map-road-toggle").show()
}

function lookLinkUrl(a) { window.open(a) }

function pauseSpeech(a) {
	var b = document.getElementById("krpanoSWFObject");
	b.call("pausesoundtoggle(bgspeech);pausesoundtoggle(bgs);"), toggleSpeech(a)
}

function toggleSpeech(a) { $(a).hasClass("btn_music") ? ($(a).removeClass("btn_music"), $(a).addClass("btn_music_off")) : ($(a).removeClass("btn_music_off"), $(a).addClass("btn_music")) }

function toggleMusic(a) { $(a).hasClass("btn_bgmusic") ? ($(a).removeClass("btn_bgmusic"), $(a).addClass("btn_bgmusic_off")) : ($(a).removeClass("btn_bgmusic_off"), $(a).addClass("btn_bgmusic")) }

function toggleMusicBtn(a) {
	var b = $("body").data("panoData").bg_music;
	b.isWhole ? b.useMusic ? $(".btn_bgmusic,.btn_bgmusic_off").show() : $(".btn_bgmusic,.btn_bgmusic_off").hide() : $(b.sceneSettings).each(function() {
		var c = a.substring(a.indexOf("_") + 1, a.length).toUpperCase();
		c == this.imgUuid && (this.useMusic ? $(".btn_bgmusic,.btn_bgmusic_off").show() : $(".btn_bgmusic,.btn_bgmusic_off").hide())
	})
}

function toggleSpeechBtn(a) {
	var b = $("body").data("panoData").speech_explain;
	b.isWhole ? b.useSpeech ? $(".btn_music").show() : $(".btn_music").hide() : $(b.sceneSettings).each(function() {
		var c = a.substring(a.indexOf("_") + 1, a.length).toUpperCase();
		c == this.imgUuid && (this.useSpeech ? $(".btn_music").show() : $(".btn_music").hide())
	})
}

function getShade(a) {
	var b = a.substring(a.indexOf("_") + 1).toUpperCase(),
		c = $("body").data("panoData");
	$(c.sky_land_shade.shadeSetting).each(function() {
		var c, d, e, f;
		b == this.imgUuid && (c = this.useShade, c && (d = this.imgPath, e = this.location, e = 0 == e ? -90 : 90, f = document.getElementById("krpanoSWFObject"), f.call("addShade('" + b + "','" + d + "'," + e + "," + zoomToScale(this.zoom) + ");")))
	})
}

function initViewPano() {
	var a = $("body").data("panoData"),
		b = document.getElementById("krpanoSWFObject"),
		c = b.get("xml.scene");
	toggleSpeechBtn(c), toggleMusicBtn(c), showWebvrBtn(), initSandTableSetting(c), showGyroBtn(), $("#panoBtns .vrshow_container_logo").show(), $("#panoBtns .vrshow_container_1_min .btn_fullscreen").show(), $("#panoBtns .vrshow_container_2_min").show(), $("#panoBtns .vrshow_container_3_min").show(), a.scenechoose && b.call("open_show_scene_thumb();")
}

function showPanoBtns(a) {
	var b = document.getElementById("krpanoSWFObject");
	1 == isstartTourGuide ? ($("#panoBtns").show(), $("#panoBtns .vrshow_container_logo").hide(), $("#panoBtns .vrshow_container_1_min .btn_fullscreen").hide(), $("#panoBtns .vrshow_container_1_min .btn_vrmode").hide(), $("#panoBtns .vrshow_container_1_min .btn_bgmusic,.btn_bgmusic_off").hide(), $("#panoBtns .vrshow_container_1_min .btn_music,.btn_music_off").hide(), $("#panoBtns .vrshow_container_1_min .btn_gyro_off,.btn_gyro").hide(), $("#panoBtns .vrshow_container_1_min .vrshow_radar_btn").hide(), $("#panoBtns .vrshow_container_1_min .vrshow_tour_btn").hide(), $("#panoBtns .vrshow_container_2_min").hide(), $("#panoBtns .vrshow_container_3_min").hide(), $("#panoBtns .vrPause_tour_btn").show(), $("#panoBtns .vrResume_tour_btn").show(), $("#panoBtns .vrshow_tour_btn").hide(), b.call("skin_showthumbs(false);set(control.usercontrol,off);")) : ($("#panoBtns").show(), $("#panoBtns .vrPause_tour_btn").hide(), $("#panoBtns .vrResume_tour_btn").hide(), a > 1 ? $(".vrshow_container_3_min .img_desc_container_min:eq(0)").show() : $(".vrshow_container_3_min .img_desc_container_min:eq(0)").hide(), initViewPano())
}

function fullscreen(a) {
	if($(a).hasClass("btn_fullscreen")) {
		launchFullScreen(document.getElementById("fullscreenid"));
		var b = document.getElementById("krpanoSWFObject");
		b.call("skin_showthumbs(false);")
	} else exitFullscreen();
	toggleFullscreenBtn(a)
}

function launchFullScreen(a) { a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen() }

function exitFullscreen() { document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() }

function toggleFullscreenBtn(a) { $(a).hasClass("btn_fullscreen") ? ($(a).removeClass("btn_fullscreen"), $(a).addClass("btn_fullscreen_off")) : ($(a).removeClass("btn_fullscreen_off"), $(a).addClass("btn_fullscreen")) }

function showWebVR() {
	var b, a = document.getElementById("krpanoSWFObject");
	a.call("skin_showthumbs(false);"), b = a.get("webvr"), b.entervr()
}

function addHotSpot() {
	var a = _U.getSubmit("/ws/user/whetherlogin?logpathname=" + window.location.pathname, null, "ajax", !1);
	a.submit(function() {},
	function(a) { 
		var c, d, b = a.existsFlag;
		"notlogin" == b ? _vrshow_browser.versions.mobile ? (c = navigator.userAgent.toLowerCase(), "micromessenger" == c.match(/MicroMessenger/i) ? window.location.href = "/ws/user/wxlogin4h51" : openRegisterModal()) : openRegisterModal() : (toggleBtns(!1), 
		$("#comment_content").val(""), commentChange(), $(".vrshow_comment:eq(0)").show(), d = document.getElementById("krpanoSWFObject"), d.call("toggle_all_comment(true)"), d.set("curscreen_x", $(window.document).width() / 2), d.set("curscreen_y", $(window.document).height() / 2), d.call("screentosphere(curscreen_x, curscreen_y, curscreen_ath, curscreen_atv);"), d.set("hotspot[line_newcomment].ath", d.get("curscreen_ath")), d.set("hotspot[line_newcomment].atv", d.get("curscreen_atv")), d.set("hotspot[line_newcomment].visible", !0)) })
}

function addPraise(a) {
	var c, d, b = $.zui.store.get(work_view_uuid);
	b || ($(a).attr("src", "/website/images/vr-btn-good-click.png"), $.zui.store.set(work_view_uuid, "1"), c = $($(a).next()).text(), c = parseInt(c), $($(a).next()).text(c + 1), d = _U.getSubmit("/ws/updatevrpicpraise", null, "ajax", !1), d.pushData("view_uuid", work_view_uuid), d.pushData("user_view_uuid", _user_view_uuid), d.pushData("name", _name), d.pushData("praised_num", 1), d.submit(function() {}, function() {}, !1))
}

function commentChange() {
	var a = $("#comment_content").val(),
		b = document.getElementById("krpanoSWFObject");
	a ? ($("#sayBtn").removeClass("disabled"), b.set("layer[tooltip_newcomment].html", "[b]" + a + "[/b]")) : ($("#sayBtn").addClass("disabled"), b.set("layer[tooltip_newcomment].html", "[b]拖动头像到想要评论的位置[/b]"))
}

function hideComment() {
	$(".vrshow_comment").hide();
	var a = document.getElementById("krpanoSWFObject");
	a.set("hotspot[line_newcomment].visible", !1), toggleBtns(!0)
}

function toggleBtns(a) {
	var b = document.getElementById("krpanoSWFObject");
	1 == a || "true" == a ? $("#panoBtns").show() : ($("#panoBtns").hide(), b.call("skin_showthumbs(false);"))
}

function toggleautotate(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = $("body").data("panoData");
	"true" == a ? b.call("set(autorotate.enabled,false);stopdelayedcall(bomb);") : c.autorotate && b.call("set(autorotate.enabled,true);bombtimer(0);")
}

function pauseMusic(a) {
	var b = document.getElementById("krpanoSWFObject");
	b.call("pausesoundtoggle(bgmusic);pausesoundtoggle(bgm);"), toggleMusic(a)
}

function openGyro() {
	var a = document.getElementById("krpanoSWFObject");
	alert(a.get("plugin[skin_gyro].isavailable"))
}

function showthumbs() {
	var a = document.getElementById("krpanoSWFObject");
	a.call("skin_showthumbs();")
}

function sayComment() {
	var a = $("#comment_content").val(),
		b = document.getElementById("krpanoSWFObject"),
		c = b.get("hotspot[line_newcomment].ath"),
		d = b.get("hotspot[line_newcomment].atv"),
		e = b.get("xml.scene"),
		f = _U.getSubmit("/ws/u/savecomment?logpathname=" + window.location.pathname, null, "ajax", !1);
	f.pushData("ath", c + ""), f.pushData("atv", d + ""), f.pushData("pk_works_main", pk_works_main), f.pushData("img_view_uuid", e), f.pushData("works_view_uuid", work_view_uuid), f.pushData("comment_content", a), f.pushData("user_view_uuid", _user_view_uuid), f.pushData("name", _name), f.submit(function() {}, function(a) {
		if(hideComment(), a.checklogin)
			if(_vrshow_browser.versions.mobile) { var c = navigator.userAgent.toLowerCase(); "micromessenger" == c.match(/MicroMessenger/i) && (window.location.href = "/ws/user/wxlogin4h51"), "weibo" == c.match(/WeiBo/i) && openRegisterModal(), "qq" == c.match(/QQ/i) && openRegisterModal(), browser.versions.ios && openRegisterModal(), browser.versions.android && openRegisterModal() } else openRegisterModal();
		else b.call("addComment(" + a.pk_comment + "," + a.absolutelocation + "," + a.comment_content + "," + Number(a.ath) + "," + Number(a.atv) + ");")
	})
}

function openRegisterModal() { $("#logreg").load("/website/pages/common/logreg.html", function() { $("#login_account_name").val($.zui.store.get("account_name")), $("#login_password").val($.zui.store.get("login_password")), IsPC() || $("[name=thirdLoginDiv]").hide(), $("#loginModal").modal("show") }) }

function getComment(a) {
	var c, b = $("body").data("panoData");
	b.comment && (c = _U.getSubmit("/ws/getcomment", null, "ajax", !1), c.pushData("pk_works_main", pk_works_main), c.pushData("img_view_uuid", a), c.submit(function() {}, function(a) {
		var b = document.getElementById("krpanoSWFObject");
		$(a).each(function() { b.call(this + "") })
	}, !0))
}

function getQRCodePic() { var a = document.URL; - 1 != a.indexOf("?") && (a = a.substring(0, a.indexOf("?"))), $("#qrCodeModal").modal("show"), $("#qrCodeModal").css("z-index", 3e3), $("#qrcode").attr("src", "/ws/getQRCode?content=" + a + "&type=work") }

function hideProfile() { $("#infomationModal").modal("hide"), toggleBtns(!0) }

function showProfile() {
	toggleBtns(!1);
	var a = $("body").data("panoData");
	$("#profileWorkName").text(""), $("#profileProfile").text(""), $("#profileWorkName").text(a.name), $("#profileProfile").text(a.profile), $("#infomationModal").modal("show")
}

function gotoAuthorPage(a) {
	var b, c;
	if(void 0 != _user_view_uuid && "" != _user_view_uuid) {
		if("admin" != _user_view_uuid) return window.open("https://" + window.location.host + "/ws/author/authorhome/" + _user_view_uuid), void 0;
		for(b = $(a).text(), c = 0; c < _userList.length; c++)
			if(_userList[c].nickname == b) return window.open("https://" + window.location.host + "/ws/author/authorhome/" + _userList[c].user_view_uuid), void 0
	}
}

function initAdvancedSetting(a) { initEffectSetting(a), initHotspotSetting(a), initSandTableSetting(a), initTourGuideSetting(a), initAuthourInfo(a) }

function initAuthourInfo(a) {
	var b, c, d;
	if("admin" == _user_view_uuid)
		for(b = a.substr(a.indexOf("_") + 1), c = 0; c < _userList.length; c++)
			if(_userList[c].img_view_uuid.toLowerCase() == b) { d = _userList[c].nickname, "四方环视" == d ? $("#user_nickName").text("匿名") : $("#user_nickName").text(_userList[c].nickname); break }
}

function initTourGuideSetting() {
	if(1 != isstartTourGuide) {
		document.getElementById("krpanoSWFObject");
		var c = $("body").data("panoData").tour_guide;
		c.points.length > 0 ? $("#panoBtns .vrshow_tour_btn").show() : $("#panoBtns .vrshow_tour_btn").hide()
	}
}

function startTourGuide() {
	var a, b, c, d;
	isTourString = !0, isstartTourGuide = !0, lsTourGuideObj = $("body").data("panoData").tour_guide, a = document.getElementById("krpanoSWFObject"), b = a.get("xml.scene"), c = lsTourGuideObj.points[0], lsTourGuideObj.useStartImg && a.call("show_tour_guide_alert(" + lsTourGuideObj.startImgUrl + ");"), this.sceneName != b && a.call("loadscene(" + c.sceneName + ", null, MERGE);js(toggleBtns(false)); set(control.usercontrol,off);"), d = a.get("view.fov"), a.call("set(control.usercontrol,off);lookto(" + c.ath + "," + c.atv + "," + d + ",smooth(720,-720,720),true,true,js(looktoCallBack(" + 1 + ")));")
}

function tourResume() {
	var a = document.getElementById("krpanoSWFObject");
	isTourString ? (isTourString = !1, $("#panoBtns .vrResume_tour_btn span").html("播放"), a.call("set(control.usercontrol,all);stopsound(tourGuideSound);stoplookto();")) : ($("#panoBtns .vrResume_tour_btn span").html("暂停"), isTourString = !0, a.call("set(control.usercontrol,off);"), looktoCallBack(tourGuideindex))
}

function tourPause() {
	isstartTourGuide = !1, isTourString = !1;
	var a = document.getElementById("krpanoSWFObject");
	a.call("set(control.usercontrol,all);stoplookto();stopsound(tourGuideSound);"), $("#panoBtns .vrPause_tour_btn").hide(), $("#panoBtns .vrResume_tour_btn").hide(), $("#panoBtns .vrshow_tour_btn").show(), $("#panoBtns .vrResume_tour_btn span").html("暂停"), showPanoBtns(a.get("scene.count"))
}

function looktoCallBack(a) {
	var c, d, e, b = document.getElementById("krpanoSWFObject");
	a < lsTourGuideObj.points.length ? (tourGuideindex = a, c = lsTourGuideObj.points[a], d = b.get("xml.scene"), e = b.get("view.fov"), c.sceneName != d ? (b.call("loadscene(" + c.sceneName + ", null, MERGE);"), b.call("lookto(" + c.ath + "," + c.atv + "," + e + ",smooth(720,-720,720),true,true,js(looktoCallBack(" + (parseInt(a) + 1) + ")));")) : b.call("lookto(" + c.ath + "," + c.atv + "," + e + ",tween(easeInOutQuad," + parseInt(c.moveTime) + "),true,true,js(looktoCallBack(" + (parseInt(a) + 1) + ")));"), c.musicSrc ? b.call("playsound(tourGuideSound, '" + c.musicSrc + "');") : b.call("stopsound(tourGuideSound);")) : (lsTourGuideObj.useEndImg && b.call("show_tour_guide_alert(" + lsTourGuideObj.endImgUrl + ");"), $("body").data("panoData").scenechoose && b.call("open_show_scene_thumb();"), isstartTourGuide = !1, isTourString = !1, tourGuideindex = 1, toggleBtns(!0), $("#panoBtns .vrResume_tour_btn span").html("暂停"), showPanoBtns(b.get("scene.count")))
}

function initSandTableSetting(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = $("body").data("panoData").sand_table,
		d = !1;
	$(c.sandTables).each(function() {
		if(this.sceneOpt[a]) {
			b.set("layer[map].url", this.imgPath), $.each(this.sceneOpt, function(a, b) {
				var c = "spot_" + a;
				addRadarSpot(c, b.krpLeft, b.krpTop)
			});
			var e = 0 - this.sceneOpt[a].hlookat;
			return b.call("activatespot(" + (parseFloat(this.sceneOpt[a].rotate) + parseFloat(e)) + ");"), d = !0, !1
		}
	}), d ? ($(".vrshow_radar_btn").show(), c.isOpen && b.set("layer[mapcontainer].visible", !0)) : ($(".vrshow_radar_btn").hide(), b.set("layer[mapcontainer].visible", !1))
}

function toggleKrpSandTable() {
	var a = document.getElementById("krpanoSWFObject"),
		b = a.get("layer[mapcontainer].visible");
	b ? a.set("layer[mapcontainer].visible", !1) : a.set("layer[mapcontainer].visible", !0)
}

function addRadarSpot(a, b, c) {
	var d = document.getElementById("krpanoSWFObject");
	d.call("addlayer(" + a + ");"), d.set("layer[" + a + "].style", "spot"), d.set("layer[" + a + "].x", b), d.set("layer[" + a + "].y", c), d.set("layer[" + a + "].parent", "radarmask"), d.call("layer[" + a + "].loadstyle(spot);")
}

function initHotspotSetting(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = $("body").data("panoData").hotspot[a];
	c && $.each(c, function(a, c) { "scene" == a ? $(c).each(function() { b.call('addSceneChangeHotSpot("' + this.imgPath + '","' + this.name + '",' + this.linkedscene + "," + this.ath + "," + this.atv + "," + this.isDynamic + ",false,true," + this.sceneTitle + "," + (void 0 == this.isShowSpotName ? !0 : this.isShowSpotName) + ")") }) : "link" == a ? $(c).each(function() { b.call('addLinkHotSpot("' + this.imgPath + '","' + this.name + '",' + this.hotspotTitle + "," + this.ath + "," + this.atv + "," + this.isDynamic + ",false,true," + this.link + "," + this.isShowSpotName + "," + (this.hasOwnProperty("isNewWindowOpen") ? this.isNewWindowOpen : !0) + ")") }) : "image" == a ? $(c).each(function() { b.call('addImgHotSpot("' + this.imgPath + '","' + this.name + '",' + this.hotspotTitle + "," + this.ath + "," + this.atv + "," + this.isDynamic + ",false,true," + this.galleryName + "," + this.isShowSpotName + ")") }) : "text" == a ? $(c).each(function() { b.call('addWordHotSpot("' + this.imgPath + '","' + this.name + '",' + this.hotspotTitle + "," + this.ath + "," + this.atv + "," + this.isDynamic + ",false,true," + getHtmlStr(this.wordContent) + "," + this.isShowSpotName + ")") }) : "voice" == a ? $(c).each(function() { b.call('addVoiceHotSpot("' + this.imgPath + '","' + this.name + '",' + this.hotspotTitle + "," + this.ath + "," + this.atv + "," + this.isDynamic + ",false,true," + this.musicSrc + "," + this.isShowSpotName + ")") }) : "around" == a && $(c).each(function() { b.call('addAroundHotSpot("' + this.imgPath + '","' + this.name + '",' + this.hotspotTitle + "," + this.ath + "," + this.atv + "," + this.isDynamic + ",false,true," + this.aroundPath + "," + this.fileCount + "," + this.isShowSpotName + ")") }) })
}

function getHtmlStr(a) { return a.replace(/\'/g, "’").replace(/\./g, "。").replace(/\,/g, "，").replace(/\x20/g, "&nbsp;").replace(/\r?\n/gi, "[br/]") }

function initEffectSetting(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = null,
		d = $("body").data("panoData").special_effects;
	$(d.effectSettings).each(function() { return this.sceneName == a ? (c = this, !1) : void 0 }), c && c.isOpen && ("sunshine" == c.effectType ? b.call("addLensflares(" + c.ath + "," + c.atv + ")") : b.call('addEffect("' + c.effectType + '","' + c.effectImgPath + '")'))
}

function littlePlaneOpen(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = null,
		d = $("body").data("panoData").angle_of_view;
	$(d.viewSettings).each(function() { return this.sceneName == a ? (c = this, !1) : void 0 }), c ? (b.set("view.vlookat", c.vlookat), b.set("view.hlookat", c.hlookat), b.set("view.fov", c.fov), b.set("view.fovmax", c.fovmax), c.hlookatmin && b.set("view.hlookatmin", c.hlookatmin), c.hlookatmax && b.set("view.hlookatmax", c.hlookatmax), b.call("skin_setup_littleplanetintro(" + c.fovmin + "," + -1 * c.vlookatmax + "," + -1 * c.vlookatmin + "," + (c.keepView ? "off" : "0.0") + ");")) : b.call('skin_setup_littleplanetintro(5,-90,90,"0.0");')
}

function initViewSetting(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = null,
		d = $("body").data("panoData").angle_of_view;
	$(d.viewSettings).each(function() { return this.sceneName == a ? (c = this, !1) : void 0 }), c && (b.set("view.vlookat", c.vlookat), b.set("view.hlookat", c.hlookat), b.set("view.fov", c.fov), b.set("view.fovmin", c.fovmin), b.set("view.fovmax", c.fovmax), b.set("view.vlookatmin", -1 * c.vlookatmax), b.set("view.vlookatmax", -1 * c.vlookatmin), b.set("autorotate.horizon", c.keepView ? "off" : "0.0"), c.hlookatmin && b.set("view.hlookatmin", c.hlookatmin), c.hlookatmax && b.set("view.hlookatmax", c.hlookatmax))
}

function loadGallery() {
	var a = document.getElementById("krpanoSWFObject"),
		b = $("body").data("panoData").hotspot;
	$.each(b, function(b, c) {
		c && $(c.image).each(function() {
			var c = '<gallery name="' + this.galleryName + '" title="">';
			$(this.imgs).each(function(a) { c += '<img name="img' + a + '" url="' + this.src + '" title="" />' }), c += "</gallery>", a.call("loadxml(" + c + ");")
		})
	})
}

function showFootMark() {
	var a = document.getElementById("krpanoSWFObject"),
		b = a.get("xml.scene"),
		c = b.split("_")[1].toUpperCase(),
		d = $("body").data(c);
	d ? (a && a.call("skin_showthumbs(false);"), _U.mapMarkModal().openModal(d, !0)) : $.zui.messager.show("没有足迹", { placement: "center", type: "warning", time: "3000", icon: "warning-sign" })
}

function checkPrivacyPwd() {
	if(!$("#privacyPwd").val()) return _U.toggleErrorMsg("#privacyPwd", "", !0), void 0;
	var a = _U.getSubmit("/ws/checkPrivacyPwd", null, "ajax", !0);
	a.pushData("view_uuid", work_view_uuid), a.pushData("privacy_password", $("#privacyPwd").val()), a.submit(function() {}, function(a) { 1 == a.check_flag ? ($("#privacyPwdModal").modal("hide"), initPano()) : _U.toggleErrorMsg("#privacyPwd", "密码有误", !0) })
}

function getWorkPrivacyFlag() {
	var a = "0",
		b = _U.getSubmit("/ws/getWorkPrivacyFlag", null, "ajax", !0);
	return b.pushData("view_uuid", work_view_uuid), b.submit(function() {}, function(b) { b.privacy_flag && (a = b.privacy_flag) }), a
}

function initPano() {
	var a = _U.getSubmit("/ws/initPano", null, "ajax", !1);
	a.pushData("view_uuid", work_view_uuid), a.pushData("profile", window.location.href), a.submit(function() {}, function(a) {
		var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
		if(void 0 == a.pk_works_main || 1 == a.flag_del) return window.location.href = "/website/error404.html", void 0;
		if(initWxConfig(a), initQQShare(a), _user_view_uuid = a.user_view_uuid, _name = a.name, document.title = _name, $("#praisedNum").text(a.praised_num), b = a.hideuser_flag, c = a.hidelogo_flag, d = a.hideprofile_flag, e = a.hidepraise_flag, f = a.hideshare_flag, g = a.hideviewnum_flag, hidevrglasses_flag = a.hidevrglasses_flag, "1" == b && $("#authorDiv").hide(), "1" == c && $("#logoImg").hide(), "1" == e && $("#praiseDiv").hide(), "1" == f && $("#shareDiv").hide(), "1" == d && $("#profileDiv").hide(), "1" == g && $("#viewnumDiv").hide(), void 0 != a.userInfo ? (h = a.userInfo.nickname, "四方环视" == h ? $("#user_nickName").text("匿名") : $("#user_nickName").text(a.userInfo.nickname)) : void 0 != a.userList && (_userList = a.userList, h = _userList[0].nickname, "四方环视" == h ? $("#user_nickName").text("匿名") : $("#user_nickName").text(_userList[0].nickname)), a.browsing_num ? $("#user_viewNum").text(parseInt(a.browsing_num) + 1) : $("#user_viewNum").text("1"), $(a.imgs).each(function() { this.lng && this.lat && $("body").data(this.img_uuid, { lng: this.lng, lat: this.lat }) }), $("body").data("panoData", a), pk_works_main = a.pk_works_main, i = {}, i["events[skin_events].onloadcomplete"] = "skin_showloading(false);js(toggleSpeechBtn(get(xml.scene)));js(toggleMusicBtn(get(xml.scene)));", i["onstart"] = "", a.music_path || $(".btn_music").hide(), a.footmark ? $(".vrshow_container_2_min .img_desc_container_min:eq(0)").show() : $(".vrshow_container_2_min .img_desc_container_min:eq(0)").hide(), a.comment ? $(".vrshow_container_2_min > :last").show() : $(".vrshow_container_2_min > :last").hide(), a.scenechoose && (i["events[skin_events].onloadcomplete"] += "open_show_scene_thumb();"), a.open_alert.useAlert && (i["events[skin_events].onloadcomplete"] += "show_open_alert('" + a.open_alert.imgPath + "');"), a.sky_land_shade.isWhole ? (j = a.sky_land_shade.useShade, j && (k = a.sky_land_shade.shadeSetting.imgPath, l = a.sky_land_shade.shadeSetting.location, m = a.sky_land_shade.shadeSetting.zoom, l = 0 == l ? -90 : 90, i["events[skin_events].onloadcomplete"] += "show_shade('" + k + "'," + l + ",true," + zoomToScale(m) + ");")) : i["events[skin_events].onloadcomplete"] += "js(getShade(get(xml.scene)));", $(".vrshow_container_3_min .img_desc_container_min:first").nextAll().remove(), a.url_phone_nvg.linkSettings && a.url_phone_nvg.linkSettings.length > 0 && ($(a.url_phone_nvg.linkSettings).each(function() {
				var e, f, g, b = this.imgPath,
					c = this.title,
					d = "";
				0 == this.type ? _vrshow_browser.versions.mobile ? (d += '<div class="img_desc_container_min img_add"><img src="' + b + '" onclick="alert(\'手机端暂时无法定位，请在电脑端查看导航路线。\')">' + '<div class="img_desc_min">' + c + "</div>" + "</div>", $(".vrshow_container_3_min").append(d), $(".vrshow_container_3_min > div:last img").data("locationData", e)) : (e = this.content, d += '<div class="img_desc_container_min img_add"><img src="' + b + '" onclick="openMapModal(this,true)">' + '<div class="img_desc_min">' + c + "</div>" + "</div>", $(".vrshow_container_3_min").append(d), $(".vrshow_container_3_min > div:last img").data("locationData", e)) : (f = this.content, 0 !== f.indexOf("http") && (g = /^[A-Za-z.]+$/, f = g.test(f) ? "http://" + f : "tel://" + f), d += '<div class="img_desc_container_min img_add"><img src="' + b + '" onclick="lookLinkUrl(\'' + f + '\')" data-toggle="tooltip" title="' + (f.length > 20 ? f.substring(0, 20) + "..." : f) + '">' + '<div class="img_desc_min">' + c + "</div>" + "</div>", $(".vrshow_container_3_min").append(d))
			}), $(".vrshow_container_3_min [data-toggle=tooltip]").tooltip({})), n = a.bg_music, n.isWhole ? n.useMusic && (i["onstart"] += "playsound(bgmusic, '" + n.mediaUrl + "', 0);") : $(n.sceneSettings).each(function() { this.useMusic && (i["scene[scene_" + this.imgUuid + "].bgmusic"] = this.mediaUrl) }), o = a.speech_explain, o.isWhole ? o.useSpeech && (i["onstart"] += "playsound(bgspeech, '" + o.mediaUrl + "', 0);") : $(o.sceneSettings).each(function() { this.useSpeech && (i["scene[scene_" + this.imgUuid + "].bgspeech"] = this.mediaUrl) }), p = a.custom_logo, p && p.useCustomLogo && ($(".vrshow_container_logo img").attr("src", p.logoImgPath), p.logoLink && $(".vrshow_container_logo img").attr("onclick", 'javascript:window.open("' + p.logoLink + '")')), q = a.loading_img, q && q.useLoading && (i["onstart"] += "showloadingimg('" + q.loadingImgPathWebsite + "','" + q.loadingImgPathMobile + "');"), r = a.scene_group, r && r.sceneGroups && r.sceneGroups.length > 0 && (s = r.sceneGroups[0].imgPath, $("#panoBtns .scene-choose-img").attr("src", s)), i["skin_settings.littleplanetintro"] = a.littleplanet ? !0 : !1, i["skin_settings.gyro"] = a.gyro ? !0 : !1, i["autorotate.enabled"] = a.autorotate ? !0 : !1, embedpano({ swf: "/website/pages/krpano/tour.swf", xml: "/ws/krpxml/" + work_view_uuid, target: "pano", html5: "auto+webgl", wmode: "opaque-flash", mobilescale: .7, vars: i }), sid = getQueryString("sid"), startScene(a, sid), a.scenario_json.sceneSettings)
			for(t = 0; t < a.scenario_json.sceneSettings.length; t++) times.put("scene_" + a.scenario_json.sceneSettings[t].imgUuid.toLowerCase(), JSON.parse(a.scenario_json).sceneSettings[t].skipTime)
	})
}

function zoomToScale(a) { return void 0 == a && (a = 0), 1 + a / 100 }

function matchPhoneNum(a) { return /1[3,5,8]{1}[0-9]{1}[0-9]{8}|0[0-9]{2,3}-[0-9]{7,8}(-[0-9]{1,4})?/.test(a) }

function showGyroBtn() {
	var a = $("body").data("panoData").gyro;
	a && (document.getElementById("krpanoSWFObject"), $(".btn_gyro_off").show())
}

function toggleGyro(a) {
	var b = document.getElementById("krpanoSWFObject"),
		c = b.get("plugin[skin_gyro].isavailable");
	c && (showGyroBtn(), $(a).hasClass("btn_gyro") ? (b.set("plugin[skin_gyro].enabled", !1), $(a).removeClass("btn_gyro"), $(a).addClass("btn_gyro_off")) : (b.set("plugin[skin_gyro].enabled", !0), $(a).removeClass("btn_gyro_off"), $(a).addClass("btn_gyro")))
}

function showFullscreenBtn() { $(".btn_fullscreen").show() }

function hideShareAndFootmarkBtn() { $(".vrshow_container_2_min .img_desc_container_min:eq(0)").hide(), $(".vrshow_container_2_min .img_desc_container_min:eq(2)").hide() }

function showWebvrBtn() { "0" == hidevrglasses_flag ? $(".btn_vrmode").show() : $(".btn_vrmode").hide() }

function radarRotate() {}

function hideAllCommentHotspot() {
	var a = document.getElementById("krpanoSWFObject");
	a.call("toggle_all_comment(false)"), hideComment()
}

function openSpeechVoiceBtn() {
	var a = $(".btn_music_off");
	a.removeClass("btn_music_off"), a.addClass("btn_music")
}

function IsPC() {
	var d, a = navigator.userAgent,
		b = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
		c = !0;
	for(d = 0; d < b.length; d++)
		if(a.indexOf(b[d]) > 0) { c = !1; break }
	return c
}

function startScene(a, b) {
	var f, g, h, c = document.getElementById("krpanoSWFObject"),
		d = new Array,
		e = a.scene_group;
	if(e && e.sceneGroups && e.sceneGroups.length > 0)
		for(f = 0; f < e.sceneGroups.length; f++)
			for(g = 0; g < e.sceneGroups[f].scenes.length; g++) d.push(e.sceneGroups[f].scenes[g].sceneName);
	else
		for(h = 0; h < a.imgs.length; h++) d.push("scene_" + a.imgs[h].img_uuid.toLowerCase());
	localsceneName = d, b > 0 && (c.call(" loadscene(" + d[b] + ", null, MERGE);"), c.call("skin_startup()")), changeUrl(b)
}

function setAutoPano() {
	var b, c, d, e, a = $("body").data("panoData").scenario_json;
	1 == is_project && (b = document.getElementById("krpanoSWFObject"), a.isWhole ? b.call("delayedcall(" + a.skipTime + ",loadscene(" + localsceneName[d] + ", null, MERGE, " + blends[Math.ceil(10 * Math.random())] + "));") : (c = b.get("xml.scene"), null != c && (d = localsceneName.indexOf(c) + 1, d >= localsceneName.length && (d = 0), e = times.get(c), null != e && b.call("delayedcall(" + times.get(c) + ",loadscene(" + localsceneName[d] + ", null, MERGE, " + blends[Math.ceil(10 * Math.random())] + "));"))))
}

function timesArray() { this.data = new Array, this.put = function(a, b) { this.data[a] = b }, this.get = function(a) { return this.data[a] }, this.remove = function(a) { this.data[a] = null } }

function changeUrl(a) { a && ChangeParam("sid", isHasElementOne(localsceneName, a)) }

function isHasElementOne(a, b) {
	for(var c = 0, d = a.length; d > c; c++)
		if(a[c] == b) return c;
	return 0
}

function ChangeParam(name, value) {
	var url = window.location.href,
		newUrl = "",
		reg = new RegExp("(^|)" + name + "=([^&]*)(|$)"),
		tmp = name + "=" + value;
	newUrl = null != url.match(reg) ? url.replace(eval(reg), tmp) : url.match("[?]") ? url + "&" + tmp : url + "?" + tmp, window.history.pushState({}, 0, newUrl)
}

function initGyro() { setTimeout(toggleGyro($("#panoBtns .gyro")[0]), 2e3) }
var work_view_uuid, pk_works_main, mapModalEl, _user_view_uuid, _name, _userList, sid, _vrshow_browser, lsTourGuideObj, isTourString, tourGuideindex, hidevrglasses_flag, blends, is_project = 0,
	times = new timesArray,
	isstartTourGuide = !1;
$(function() {
	var b, a = window.location.href;
	work_view_uuid = a.substring(a.lastIndexOf("/") + 1), -1 != work_view_uuid.indexOf("?") && (work_view_uuid = work_view_uuid.substring(0, work_view_uuid.indexOf("?"))), "0" == getWorkPrivacyFlag() ? initPano() : $("#privacyPwdModal").modal("show"), $("#qrCodeModal").modal("hide"), b = $.zui.store.get(work_view_uuid), b && $("#btnpraise").attr("src", "/website/images/vr-btn-good-click.png"), _U.mapMarkModal({ callback: function(a) { $(mapModalEl).data("locationData", a) } }), $(document).on("keydown", "#comment_content", function(a) {
		var b, c;
		13 == a.keyCode && (b = $("#comment_content").val(), c = /(\n(?=(\n*)))+/g, b = b.replace(c, ""), b && $("#sayBtn").click()), a.stopPropagation()
	}), $(document).on("keydown", "#privacyPwd", function(a) { 13 == a.keyCode && $("#pwdConfirmBtn").click(), a.stopPropagation() }), $(document).on("click", "#pwdConfirmBtn", function() { checkPrivacyPwd() }), $(document).on("click", "#map-road-toggle", function() { $("#panel"); var b = $("#map-road-toggle"); "收起" == b.text() ? ($("#panel").css({ "max-height": 0 }), b.css({ top: "11%" }), b.text("展开")) : ($("#panel").css({ "max-height": "90%" }), b.css({ top: "100%" }), b.text("收起")) })
}), _vrshow_browser = { versions: function() { var a = navigator.userAgent; return navigator.appVersion, { trident: a.indexOf("Trident") > -1, presto: a.indexOf("Presto") > -1, webKit: a.indexOf("AppleWebKit") > -1, gecko: a.indexOf("Gecko") > -1 && -1 == a.indexOf("KHTML"), mobile: !!a.match(/AppleWebKit.*Mobile.*/), ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1, iPhone: a.indexOf("iPhone") > -1, iPad: a.indexOf("iPad") > -1, webApp: -1 == a.indexOf("Safari") } }(), language: (navigator.browserLanguage || navigator.language).toLowerCase() }, lsTourGuideObj = null, isTourString = !1, tourGuideindex = 1, hidevrglasses_flag = "0", localsceneName = new Array, blends = ["OPENBLEND(1.0, -0.5, 0.3, 0.8, linear)", "OPENBLEND(1.0, -1.0, 0.3, 0.0, linear)", "OPENBLEND(0.7, 1.0, 0.1, 0.0, linear)", "OPENBLEND(1.0, 0.0, 0.2, 0.0, linear)", "SLIDEBLEND(1.0, 135.0, 0.4, linear)", "SLIDEBLEND(1.0, 90.0, 0.01, linear)", "SLIDEBLEND(1.0, 0.0, 0.2, linear)", "LIGHTBLEND(1.0, 0xFFFFFF, 2.0, linear)", "COLORBLEND(2.0, 0x000000, easeOutSine)", "ZOOMBLEND(2.0, 2.0, easeInOutSine)", "BLEND(1.0, easeInCubic)"];