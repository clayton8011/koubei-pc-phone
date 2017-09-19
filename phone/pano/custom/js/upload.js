//全景图片上传对象
var upload_pano_obj = {
    scene_obj:[],
    imgUploadObj: '#imgUploadObj',
    policy_url: '',
    oss_key: {},
    policy: {
        host: '',
        policyBase64: '',
        accessid: '',
        signature: '',
        expire: '',
        callbackbody: '',
        key: '',
        fileName: ''
    },
    maxSize : 0,
    minWidth : 0,
    minHeight : 0,
    fileType : ['jpg','jpeg'],
    successFun : function (data) {},
    errorFun : function (event, data, msg) {},
    get_oss_key: function (init) {
        if (!upload_pano_obj.oss_key.key || init) {
            upload_pano_obj.get_signature();
            console.log(upload_pano_obj.policy.key + upload_pano_obj.policy.fileName + '.'+upload_pano_obj.fileType[0]);
            upload_pano_obj.oss_key = {
                'key': upload_pano_obj.policy.key + upload_pano_obj.policy.fileName + '.'+upload_pano_obj.fileType[0],
                'policy': upload_pano_obj.policy.policyBase64,
                'OSSAccessKeyId': upload_pano_obj.policy.accessid,
                'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                'callback': upload_pano_obj.policy.callbackbody,
                'signature': upload_pano_obj.policy.signature
            };
        }
        return upload_pano_obj.oss_key;
    },
    get_suffix: function (filename) {
        pos = filename.lastIndexOf('.');
        suffix = '';
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix;
    },
    send_request: function () {
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp != null) {
            xmlhttp.open("GET", upload_pano_obj.policy_url, false);
            xmlhttp.send(null);
            return xmlhttp.responseText
        } else {
            taagoo_obj.alert("Your browser does not support XMLHTTP.");
        }
    },
    get_signature: function () {
        var body = upload_pano_obj.send_request();
        if (body) {
            var obj = eval("(" + body + ")");
            upload_pano_obj.policy.host = obj['host'];
            upload_pano_obj.policy.policyBase64 = obj['policy'];
            upload_pano_obj.policy.accessid = obj['accessid'];
            upload_pano_obj.policy.signature = obj['signature'];
            upload_pano_obj.policy.expire = parseInt(obj['expire']);
            upload_pano_obj.policy.callbackbody = obj['callback'];
            upload_pano_obj.policy.key = obj['dir'];
            upload_pano_obj.policy.fileName = obj['file_name'];
            return true;
        } else {
            taagoo_obj.alert('请求错误，请刷新页面重试。');
        }
    },
    initUploadPano: function () {
        upload_pano_obj.get_signature();
        //VR图片上传组件
        $(upload_pano_obj.imgUploadObj).fileinput({
            language: 'zh',
            showDrag:true,
            showClose: false,
            showUpload: false,
            showRemove: false,
            showCancel: false,
            maxFileCount: 1,
            maxFileSize: upload_pano_obj.maxSize * 1024,
            msgSizeTooLarge: '文件大小超过上限'+upload_pano_obj.maxSize+'M',
            msgFileNotFound: '文件{name}不存在',
            msgFileNotReadable: '文件{name}不可读',
            minImageWidth:upload_pano_obj.minWidth,
            minImageHeight:upload_pano_obj.minHeight,
            // maxFilePreviewSize:200000,
            // resizeImage:true,
            // maxImageWidth: 200,
            //previewFileType: "image",
            allowedFileExtensions: upload_pano_obj.fileType,
            //previewClass:"bg-warning",
            msgInvalidFileExtension: '不支持文件类型"{name}"。只支持扩展名为"{extensions}"的文件。',
            browseClass: "btn btn-primary",
            browseLabel: "选择本地文件",
            browseIcon: "<i class=\"icon icon-picture\"></i> ",
            removeClass: "btn btn-danger",
            removeLabel: "删除",
            removeIcon: "<i class=\"icon icon-trash\"></i> ",
            uploadUrl: upload_pano_obj.policy.host,  //"/ws/u/uploadImgPano",
            uploadAsync: true,
            previewSettings: {
                image: {width: "200px", height: "150px"},
                other: {width: "200px", height: "150px"}
            },


            fileActionSettings: {},
            //ajaxSettings:{async:false},
            //隐藏缩略图下面的小按钮
            layoutTemplates: {
                main1: '{preview}\n' +
                '<div class="kv-upload-progress hide"></div>\n' +
                '<div class="input-group {class}">\n' +
                //'   {caption}\n' +
                '   <div class="input-group-btn text-right">\n' +
                '       {remove}\n' +
                '       {cancel}\n' +
                '       {upload}\n' +
                '       {browse}\n' +
                '' +
                '<div style="margin-left:10px;display:inline-block;" id="addMaterialButtonDiv"> </div>' +
                '   </div>\n' +
                '</div>',
                actions: '<div class="file-actions">\n' +
                '    <div class="file-footer-buttons">\n' +
                '        {delete}' +
                '    </div>\n' +
                '    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
                '    <div class="clearfix"></div>\n' +
                '</div>'
            },
            //maxFileSize:"",
            dropZoneTitle: "拖拽文件到这里 …",
            textEncoding: "UTF-8",
            uploadExtraData: function () {
                return upload_pano_obj.get_oss_key();
            }
        }).on('fileloaded', function (event, files) {
            $(upload_pano_obj.imgUploadObj).fileinput('upload');
        }).on('filepreupload', function (event, data, previewId, index) {
            upload_pano_obj.get_oss_key(true);
        }).on('filebatchuploadcomplete', function (event, files, extra) {
            //全部上传成功操作
            upload_pano_obj.successFun(upload_pano_obj.scene_obj);
        }).on('fileuploaded', function (event, data, previewId, index) {
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;
            if(response && response.status==1){//上传成功
                response.file_title = data.files[index].name;
                upload_pano_obj.scene_obj.push(response);
            }
        }).on('fileerror', function (event, data, msg) {
            upload_pano_obj.errorFun(event, data, msg);
        });
    }
};
