
var tourPointIdx = 1;

function openFirstImgModal(el){
    var img = $(el).prev('img');
    $('#firstImgModal .modal-body img').attr('src',img.attr('src'));
    var useImg = img.data('useimg');
    if(useImg){
        $('#firstImgModal .modal-body button:eq(1)').show();
    }else{
        $('#firstImgModal .modal-body button:eq(1)').hide();
    }
    $('#firstImgModal').data('useimg',useImg);
    $('#firstImgModal').modal('show');
}

function buildTourGuideSetting(){
    var tourGuideObj = {};
    tourGuideObj.useStartImg = false;
    tourGuideObj.useEndImg = false;
    tourGuideObj.points = new Array();
    var points = $('#home5 .circle_blue');
    if(points.length != 0){
        if($('#home4 .start-end-img img:eq(0)').data('useimg')){
            tourGuideObj.useStartImg = true;
            tourGuideObj.startImgUrl = $('#home4 .start-end-img img:eq(0)').attr('src');
        }
        if($('#home4 .start-end-img img:eq(1)').data('useimg')){
            tourGuideObj.useEndImg = true;
            tourGuideObj.endImgUrl = $('#home4 .start-end-img img:eq(1)').attr('src');
        }
        points.each(function(idx){
            var point = {};
            point.sceneName =  $(this).data('scenename');
            point.sceneTitle =  $(this).data('scenetitle');
            point.ath =  $(this).data('ath');
            point.atv =  $(this).data('atv');
            point.moveTime =  $(this).data('movetime');
            if($(this).data('musicsrc')){
                point.musicSrc =  $(this).data('musicsrc');
            }
            point.musicTitle =  $(this).data('musictitle');
            tourGuideObj.points.push(point);
        });
    }
    return tourGuideObj;
}


var defaultImageUrl = '/pano_player/custom/images/default2-120x120.png';
function removeTourGuideStartEndImg(el){
    $('#firstImgModal .modal-body img').attr('src',defaultImageUrl);
    $('#firstImgModal').data('useimg',false);
    $(el).hide();
}

function initTourGuide(data){
    $('#home4 .start-end-img img:eq(0)').data('useimg',data.useStartImg);
    $('#home4 .start-end-img img:eq(1)').data('useimg',data.useEndImg);
    if(data.useStartImg){
        $('#home4 .start-end-img img:eq(0)').attr('src',data.startImgUrl);
    }
    if(data.useEndImg){
        $('#home4 .start-end-img img:eq(1)').attr('src',data.endImgUrl);
    }
    $(data.points).each(function(idx){
        addTourGuidePoint(this.sceneName, this.sceneTitle, 'tourpoint_'+tourPointIdx, tourPointIdx ,this.moveTime,this.musicTitle,this.musicSrc,this.ath,this.atv);
        tourPointIdx++;
    });
}

function krpTourPointClick(tourpointname){
    $('.circle_blue[data-tourpointname='+tourpointname+']').click();
}
function putTourGuideLocation(tourpointname,ath,atv){
    //alert(tourpointname+','+ath+','+atv);
    $('.circle_blue[data-tourpointname='+tourpointname+']').data('ath',ath);
    $('.circle_blue[data-tourpointname='+tourpointname+']').data('atv',atv);
}

//点击导览节点
$(document).on("click", ".circle_blue", function (e) {
    $(e.target).siblings('.circle_blue').popover('hide');
    var scenetitle = $(e.target).data('scenetitle');
    $('#clickDelete .popover-title span').text(scenetitle);
    $(e.target).popover('show');
    $(".tour-clicked").css('background','white');
    var krpano = document.getElementById('EditPano');
    var lastTourpointname = $(".tour-clicked").data('tourpointname');
    krpano.set('layer[tooltip_'+lastTourpointname+'].background',false);
    $('.tour-clicked').removeClass('tour-clicked');
    $(e.target).css({"background": "#005fcc"});
    $(e.target).addClass('tour-clicked');
    //切换场景、移动视角
    var sceneName = krpano.get('xml.scene');
    var clickSceneName = $(e.target).data('scenename');
    var tourpointname = $(e.target).data('tourpointname');
    krpano.set('layer[tooltip_'+tourpointname+'].background',true);
    if(sceneName != clickSceneName){
        krpano.call('loadscene('+clickSceneName+', null, MERGE);');
    }else{
        var curFov = krpano.get('view.fov');
        krpano.call('looktohotspot('+tourpointname+','+curFov+'))');
    }
});
$("#cancel").click(function () {
    var circle = $(".circle_blue");
    for (var i = 0; i < circle.length; i++) {
        circle[i].style.backgroundColor = 'white';
    }
    $("#home5>div:last").css({'background': '#005fcc'});

});

$(document).on('mouseover','#home5 .square_blue', function (e) {
    var circleBlue = $(e.target).parent().next('.circle_blue');
    var movetime = circleBlue.data('movetime');
    var musictitle = circleBlue.data('musictitle');
    $('#timeLineSetting .popover-content span:eq(0)').text(movetime);
    $('#timeLineSetting .popover-content span:eq(1)').text(musictitle);
    $(e.target).popover('show');
});

$(document).on('mouseout','#home5 .square_blue', function (e) {
    $(e.target).popover('hide');
});

$(document).on('mouseover','#home5 .square_red', function (e) {
    var prevSceneName = $(e.target).parent().prev('.circle_blue').data('scenetitle');
    var nextSceneName = $(e.target).parent().next('.circle_blue').data('scenetitle');
    $('#tourSceneSkip .popover-content span:eq(0)').text(prevSceneName);
    $('#tourSceneSkip .popover-content span:eq(1)').text(nextSceneName);
    $(e.target).popover('show');
});

$(document).on('mouseout','#home5 .square_red', function (e) {
    $(e.target).popover('hide');
});

function deleteTourGuideNode(){
    var clickedObj = $('#home5 .tour-clicked');
    clickedObj.popover('hide');
    var tourpointname = clickedObj.data('tourpointname');
    var krpano = document.getElementById('panoSettingObject');
    krpano.call('removehotspot('+tourpointname+')');
    krpano.call('removelayer('+'tooltip_'+tourpointname+')');
    if(clickedObj.prev().length == 0){
        clickedObj.next().remove();
    }else{
        clickedObj.prev().remove();
    }
    clickedObj.remove();
}
//时间线限制
$(document).on("click", "#home5 .square_blue", function (e) {
    var circleBlue = $(e.target).parent().next('.circle_blue');
    var movetime = circleBlue.data('movetime');
    var musictitle = circleBlue.data('musictitle');
    var musicsrc = circleBlue.data('musicsrc');
    $('#timeModal').data('musicsrc',musicsrc);
    $('#timeModal .modal-body input').val(movetime);
    $('#timeModal .modal-body .time-line-music').text(musictitle);
    $('#timeModal').data('circleblue',circleBlue);
    if(musicsrc){
        $('#timeModal .modal-body .timelinemusicdelete').show();
    }else{
        $('#timeModal .modal-body .timelinemusicdelete').hide();
    }
    $("#timeModal").modal('show');
});
//添加节点

$(document).on("click", "#add_node", function () {
    var krpano = document.getElementById('EditPano');
    var sceneName = krpano.get('xml.scene');
    var sceneTitle = krpano.get('scene[get(xml.scene)].title');
    var tourpointName = 'tourpoint_'+tourPointIdx;
    addTourGuidePoint(sceneName, sceneTitle, tourpointName, tourPointIdx,5,'无',null,null,null);
    //添加导览热点到场景
    addTourGuideHotSpot(krpano,tourpointName,null,null,tourPointIdx,true);
    $('#home5 .circle_blue:last').click();
    tourPointIdx++;
    $("[data-toggle='tooltip']").tooltip();
});

function addTourGuidePoint(sceneName, sceneTitle, tourpointName, idx ,moveTime,musicTitle,musicSrc,ath,atv) {
    if ($("#home5>div").length > 0) {
        var lastSceneName = $('#home5 .circle_blue:last').data('scenename');
        if (lastSceneName == sceneName) {
            $("#home5").append('<div class="line_add"><div class="square_blue" data-target="#timeLineSetting" data-toggle="popover" data-placement="top" data-trigger="manual" data-container="#EditPano"></div></div>');
        } else {
            $("#home5").append('<div class="line_add"><div class="square_red" data-target="#tourSceneSkip" data-toggle="popover" data-placement="top" data-trigger="manual" data-container="#EditPano"></div></div>');
        }
    }
    $("#home5").append('<div class="circle_blue" data-target="#clickDelete" data-toggle="popover" data-placement="top" data-trigger="manual" data-container="#EditPano" data-scenename="' + sceneName + '" data-scenetitle="' + sceneTitle + '" data-tourpointname="' + tourpointName + '" data-movetime="'+moveTime+'" data-musictitle="'+musicTitle+'">' + (idx) + '</div>');
    if(musicSrc){
        $('#home5 .circle_blue:last').data('musicsrc',musicSrc);
    }
    if(ath){
        $('#home5 .circle_blue:last').data('ath',ath);
    }
    if(atv){
        $('#home5 .circle_blue:last').data('atv',atv);
    }
    $("[data-toggle='popover']").popover();
}

function addTourGuideHotSpot(krpano,tourpointName,ath,atv,idx,visible){
    if(!ath || !atv){
        /*krpano.set("curscreen_x", $('#settingPano').width() / 2);
        krpano.set("curscreen_y", $('#settingPano').height() / 2);
        krpano.call("screentosphere(curscreen_x, curscreen_y, curscreen_ath, curscreen_atv);");
        ath = krpano.get("curscreen_ath");
        atv = krpano.get("curscreen_atv");*/
        ath = krpano.get("view.hlookat");
        atv = krpano.get("view.vlookat");
        $("#home5 .circle_blue:last").data('ath',ath);
        $("#home5 .circle_blue:last").data('atv',atv);
    }
    krpano.call('addTourGuidePoint('+tourpointName+','+ath+','+atv+','+idx+','+visible+')');
}


$("[data-toggle='popover']").each(function(index, element) {
    var contentElementId = $(element).data().target;
    var contentHtml = $(contentElementId).html();
    $(element).popover({
        content: contentHtml
    });
});