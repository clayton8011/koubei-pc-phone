
/**
html信息：
    <div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
    <div id="container">
        <a id="selectfiles" style="width: 90px; height: 36px; display:block;border:1px solid #333;" href="javascript:void(0);" class='btn'>选择文件</a>
    </div>
调用方式：
    var oss_uploader_obj = get_uploader_obj();
    oss_uploader_obj.uploader.init();

开始上传
    oss_uploader_obj.set_upload_param(oss_uploader_obj.uploader, '', false);

**/
function get_uploader_obj(params){
    var oss_obj={
        mime_types: (undefined!=params.mime_types?params.mime_types:[
            {title : "jpg,png", extensions : "jpg,png" },
        ]),
        max_file_size:(undefined!=params.max_file_size?params.max_file_size:'1mb'),//最大大小
        get_policy_url:(undefined!=params.get_policy_url?params.get_policy_url:''),//获取签名url
        upload_success:function(up,file,info,json){//需要重写上传成功页面

        },
        browse_button:(undefined!=params.browse_button?params.browse_button:'selectfiles'),//选择文件按钮
        container_box:(undefined!=params.container_box?params.container_box:'container'),//上传信息显示框
        tip_info_box:(undefined!=params.tip_info_box?params.tip_info_box:'ossfile'),//不支持提示 进度提示
        selected_upload:(undefined!=params.selected_upload?params.selected_upload:false),//选择后即开始上传
        one_file:(undefined!=params.one_file?params.one_file:true),//是否只能上传一个文件
        files_added:function(up, files){},//成功选择文件后
        upload_progress:function(up, file){},//文件进度
        upload_error:function(up,err){},
        //以上参数为必填


        accessid:'',
        file_title:'',//当前文件的本地名称
        host:'',
        policyBase64:'',
        signature:'',
        callbackbody:'',
        key:'',
        expire:'',
        g_object_name:'',
        send_request:function()
        {
            var xmlhttp = null;
            if (window.XMLHttpRequest)
            {
                xmlhttp=new XMLHttpRequest();
            }
            else if (window.ActiveXObject)
            {
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }

            if (xmlhttp!=null)
            {
                xmlhttp.open( "GET", oss_obj.get_policy_url, false );
                xmlhttp.send( null );
                return xmlhttp.responseText
            }
            else
            {
                alert("Your browser does not support XMLHTTP.");
            }
        },

        get_signature:function()
        {
            //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
            // var now = Date.parse(new Date()) / 1000;
            // if (oss_obj.expire < now + 3)
            // {
                body = oss_obj.send_request();
                if(body){
                    var obj = eval ("(" + body + ")");
                    oss_obj.host = obj['host']
                    oss_obj.policyBase64 = obj['policy']
                    oss_obj.accessid = obj['accessid']
                    oss_obj.signature = obj['signature']
                    oss_obj.expire = parseInt(obj['expire'])
                    oss_obj.callbackbody = obj['callback']
                    oss_obj.key = obj['dir']
                    return true;
                }
            // }
            alert('获取相关信息错误，请稍后再试。');
            return false;
        },
        get_suffix:function(filename) {
            pos = filename.lastIndexOf('.')
            suffix = ''
            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        },

        calculate_object_name:function(filename)
        {
            suffix = oss_obj.get_suffix(filename);
            oss_obj.g_object_name = oss_obj.key + suffix;
            return ''
        },

        set_upload_param:function(up, filename, ret)
        {
            if (ret == false)
            {
                ret = oss_obj.get_signature()
            }
            oss_obj.g_object_name = oss_obj.key;
            if (filename != '') { suffix = oss_obj.get_suffix(filename)
                oss_obj.calculate_object_name(filename)
            }
            new_multipart_params = {
                'key' : oss_obj.g_object_name,
                'policy': oss_obj.policyBase64,
                'OSSAccessKeyId': oss_obj.accessid,
                'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                'callback' : oss_obj.callbackbody,
                'signature': oss_obj.signature,
            };

            up.setOption({
                'url': oss_obj.host,
                'multipart_params': new_multipart_params
            });

            up.start();
        },
        start_upload:function(){
            oss_obj.uploader.start();
        }
    }
    oss_obj.uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button: oss_obj.browse_button,
        multi_selection: !oss_obj.one_file,
        container: document.getElementById(oss_obj.container_box),
        flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
        url : 'http://oss.aliyuncs.com',
        filters: {
            mime_types : oss_obj.mime_types,
            max_file_size : oss_obj.max_file_size,
            prevent_duplicates : false //不允许选取重复文件
        },
        init: {
            Browse:function(){//选择触发
                if(oss_obj.one_file){
                    var file_len = oss_obj.uploader.files.length;
                    while(file_len--){
                        oss_obj.uploader.removeFile(oss_obj.uploader.files[file_len]);
                    }
                    //document.getElementById(oss_obj.tip_info_box).innerHTML = '';
                }
            },
            PostInit: function() {
                //document.getElementById(oss_obj.tip_info_box).innerHTML = '';
            },
            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    oss_obj.file_title = file.name;
                    //document.getElementById(oss_obj.tip_info_box).innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'+'<div class="progress" style="width: 100%;"><div class="progress-bar" style="width: 0%"></div></div>'+'</div>';
                });
                //document.getElementById(oss_obj.browse_button).remove();
                oss_obj.files_added(up, files);
                if(oss_obj.selected_upload){//选择后即开始上传
                    oss_obj.start_upload();
                }
            },
            BeforeUpload: function(up, file) {
                oss_obj.set_upload_param(up, file.name, false);
                //document.getElementById(oss_obj.tip_info_box).style.display="block";
            },
            UploadProgress: function(up, file) {
                oss_obj.upload_progress(up, file);
            },
            FileUploaded: function(up, file, info) {
                if (info.status == 200)
                {
                    var json = $.parseJSON(info.response);
                    if(json.status=='1'){
                        oss_obj.upload_success(up,file,info,json);
                    }else{
                        alert('上传失败，请稍后再试。');
                    }
                }
                else if (info.status == 203)
                {
                    alert('上传失败，请稍后再试。');
                }
                else
                {
                    alert('上传失败，请稍后再试。');
                }
            },

            Error: function(up, err) {
                if (err.code == -600) {
                    alert("文件太大，最大不能超过"+(oss_obj.uploader.settings.filters.max_file_size)+"。");
                }
                else if (err.code == -601) {
                    alert("不支持此文件类型。");
                }
                else if (err.code == -602) {
                    alert("不能重复上传。");
                }
                else
                {
                    alert("上传失败。");
                }
                oss_obj.upload_error(up,err);
            }
        }
    });
    return oss_obj;
}

