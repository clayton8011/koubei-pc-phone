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
		});
//		重命名
		$(".add-sceneimg-list").on('click','.rename-btn',function() {
			var txt=$(this).prev().text();
			var scene_id = $(this).parent().attr('scene-id');
			$('.rename-input').val(txt);
			$('.scene-id').val(scene_id);
		});
		$("#rename-modal").on('hide.bs.modal',function(){
			$('.rename-input').val("");
            $('.scene-id').val("");
		});
		$(".shangq-link").click(function () {
			$('#2Dcode-modal .modal-content img').attr('src',$('#2Dcode-modal .modal-content img').attr('data-src') + encodeURIComponent($('#pano_url').val()));
        });
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
    renameCallback : function (result) {
		if(result.status == 1){
			$('#rename-modal').modal('hide');
			$('.add-sceneimg-list li[scene-id='+result.data.scene_id+'] .text-over').text(result.data.rename_val);
		}else {
			alert('失败');
		}
    },
    deleteCallback : function (result) {
        if(result.status == 1){
            $('.add-sceneimg-list li[scene-id='+result.data.scene_id+']').remove();
            var length = $('.add-sceneimg-list li[scene-id]').length;
            if(length == 0)
                $('.mui-switch').attr('disabled',true);
            if(length == 7)
                $('#selectfiles').parent().show();
        }else {
            alert('删除失败');
        }
    }
}
businessCircle.init();