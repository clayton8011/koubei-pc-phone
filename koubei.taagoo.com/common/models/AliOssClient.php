<?php
namespace common\models;
use Yii;
use OSS\OssClient;
//aliyun oss类
class AliOssClient
{
    private static $_instance;
    private static $_client;
    private static $_params;
    private function __construct()    
    {    
        self::$_params = Yii::$app->params['alioss'];
        
    }    
    
    private function __clone(){

    }
    
    public static function getInstance()    
    {    
        if(! (self::$_instance instanceof self) ) {    
            self::$_instance = new self();    
        }    
        return self::$_instance;    
    }

    public static function getOssClient(){
        if(self::$_client){
            return self::$_client;
        }else{
            try {
                self::$_client = new OssClient(self::$_params['accessKeyId'], self::$_params['accessKeySecret'] , self::$_params['endpoint']);
            } catch (OssException $e) {
                \Yii::error('OssClient_error'.$e->getMessage().'___'.var_export(self::$_params));
            }
        }
    }



    /**
     * 获取Policy，拿到上传需要的相关信息
     *config_arr['dir'=>'user-dir/','callback_url'=>'http://oss-demo.aliyuncs.com:23450']
     */
    public static function getPolicy($config_arr=[]){
        $callbackUrl = $config_arr['callback_url'];
        $callback_param = array('callbackUrl'=>$callbackUrl, 
                     'callbackBody'=>'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}', 
                     'callbackBodyType'=>"application/x-www-form-urlencoded");
        $callback_string = json_encode($callback_param);
        $base64_callback_body = base64_encode($callback_string);
        $now = time();
        $expire = 30; //设置该policy超时时间是10s. 即这个policy过了这个有效时间，将不能访问
        $end = $now + $expire;


        $dtStr = date("c", $end);
        $mydatetime = new \DateTime($dtStr);
        $expiration = $mydatetime->format(\DateTime::ISO8601);
        $pos = strpos($expiration, '+');
        $expiration = substr($expiration, 0, $pos);
        $expiration =  $expiration."Z";

        $dir = $config_arr['dir'];

        //最大文件大小.用户可以自己设置
        $condition = array(0=>'content-length-range', 1=>0, 2=>1048576000);
        $conditions[] = $condition; 

        //表示用户上传的数据,必须是以$dir开始, 不然上传会失败,这一步不是必须项,只是为了安全起见,防止用户通过policy上传到别人的目录
        $start = array(0=>'starts-with', 1=>'$key', 2=>$dir);
        $conditions[] = $start; 
        $arr = array('expiration'=>$expiration,'conditions'=>$conditions);
        $policy = json_encode($arr);
        $base64_policy = base64_encode($policy);
        $string_to_sign = $base64_policy;
        $signature = base64_encode(hash_hmac('sha1', $string_to_sign, self::$_params['accessKeySecret'], true));
        $response = array();
        $response['accessid'] = self::$_params['accessKeyId'];
        $response['host'] = self::$_params[(isset($config_arr['endpoint'])&&$config_arr['endpoint'])?$config_arr['endpoint']:'endpoint'];
        $response['policy'] = $base64_policy;
        $response['signature'] = $signature;
        $response['expire'] = $end;
        $response['callback'] = $base64_callback_body;
        //这个参数是设置用户上传指定的前缀
        $response['dir'] = $dir;
        return $response;
    }
}
