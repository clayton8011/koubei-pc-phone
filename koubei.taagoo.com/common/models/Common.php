<?php
namespace common\models;
use Yii;

class Common
{
    /**
     * 获取状态码
     * @return  [type] [description]
     * @version 1.0    2015-12-31T16:52:39+0800
     * @author zhangxianglong@yolo24.com
     */
    public static function getStatus()
    {
        return [
            '' => '请选择',
            1 => '正常',
            2 => '删除',
            3 => '待审核',
            4 =>'审核未通过',
        ];
    }

    /**
     * 推荐选择框
     * @date   2016-04-12T14:48:31+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public static function getRecommend(){
        return [
            '' => '请选择',
            0 => '不推荐',
            1 => '推荐',
        ];
    }

    /**
     * 全页面显示选择框
     * @date   2016-04-12T14:48:31+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public static function getTexttype(){
        return [
                0 => '否',
                1 => '是',
        ];
    }

    /**
     * 获取客户端IP地址
     */
    public static function getClientIP()
    {
        static $ip = NULL;
        if ($ip !== NULL)
        {
            return $ip;
        }

        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos = array_search('unknown', $arr);
            if (false !== $pos)
            {
                unset($arr[$pos]);
            }

            $ip = trim($arr[0]);
        }
        elseif (isset($_SERVER['HTTP_CLIENT_IP']))
        {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }
        elseif (isset($_SERVER['REMOTE_ADDR']))
        {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        // IP地址合法验证
        $ip = (false !== ip2long($ip)) ? $ip : '0.0.0.0';
        return $ip;
    }

    /**
     * 循环创建目录
     */
    public static function mkdir($dir, $mode = 0777)
    {
        if (is_dir($dir) || @mkdir($dir, $mode))
        {
            return true;
        }

        if ( ! mk_dir(dirname($dir), $mode))
        {
            return false;
        }

        return @mkdir($dir, $mode);
    }

    /**
     * 验证邮箱
     */
    public static function isEmail($str)
    {
        if (empty($str))
        {
            return true;
        }

        $chars = "/^([a-z0-9+_]|\\-|\\.)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,6}\$/i";
        if (strpos($str, '@') !== false && strpos($str, '.') !== false)
        {
            if (preg_match($chars, $str))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }

    /**
     * 验证手机号码
     */
    public static function isMobile($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('#^13[\d]{9}$|14^[0-9]\d{8}|^15[0-9]\d{8}$|^18[0-9]\d{8}$#', $str);
    }

    /**
     * 验证固定电话
     */
    public static function isTel($str)
    {
        if (empty($str))
        {
            return true;
        }
        return preg_match('/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/', trim($str));

    }

    /**
     * 验证qq号码
     */
    public static function isQq($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('/^[1-9]\d{4,12}$/', trim($str));
    }

    /**
     * 验证邮政编码
     */
    public static function isZipCode($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('/^[1-9]\d{5}$/', trim($str));
    }

    /**
     * 验证ip
     */
    public static function isIp($str)
    {
        if (empty($str))
        {
            return true;
        }

        if ( ! preg_match('#^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$#', $str))
        {
            return false;
        }

        $ip_array = explode('.', $str);

        //真实的ip地址每个数字不能大于255（0-255）
        return ($ip_array[0] <= 255 && $ip_array[1] <= 255 && $ip_array[2] <= 255 && $ip_array[3] <= 255) ? true : false;
    }

    /**
     * 验证身份证(中国)
     */
    public static function isIdCard($str)
    {
        $str = trim($str);
        if (empty($str))
        {
            return true;
        }

        if (preg_match("/^([0-9]{15}|[0-9]{17}[0-9a-z])$/i", $str))
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    /**
     * 验证网址
     */
    public static function isUrl($str)
    {
        if (empty($str))
        {
            return true;
        }

        return preg_match('#(http|https|ftp|ftps)://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?#i', $str) ? true : false;
    }

    /**
     * 字符截取
     *
     * @param $string
     * @param $length
     * @param $dot
     */
    public static function cutstr($str, $length, $charset = 'UTF-8')
    {
        return mb_substr($str, 0, $length, $charset);
    }

    /**
     * 描述格式化
     * @param  $subject
     */
    public static function clearCutstr($subject, $length = 0, $dot = '...', $charset = 'utf-8')
    {
        if ($length)
        {
            return StringHelper::cutstr(strip_tags(str_replace(array("\r\n"), '', $subject)), $length, $dot, $charset);
        }
        else
        {
            return strip_tags(str_replace(array("\r\n"), '', $subject));
        }
    }

    /**
     * 检测是否为英文或英文数字的组合
     *
     * @return unknown
     */
    public static function isEnglist($param)
    {
        if ( ! eregi("^[A-Z0-9]{1,26}$", $param))
        {
            return false;
        }
        else
        {
            return true;
        }
    }


    // 自动转换字符集 支持数组转换
    public static function autoCharset($string, $from = 'gbk', $to = 'utf-8')
    {
        $from = strtoupper($from) == 'UTF8' ? 'utf-8' : $from;
        $to   = strtoupper($to)   == 'UTF8' ? 'utf-8' : $to;
        if (strtoupper($from) === strtoupper($to) || empty($string) || (is_scalar($string) &&  ! is_string($string)))
        {
            //如果编码相同或者非字符串标量则不转换
            return $string;
        }
        if (is_string($string))
        {
            if (function_exists('mb_convert_encoding'))
            {
                return mb_convert_encoding($string, $to, $from);
            }
            elseif (function_exists('iconv'))
            {
                return iconv($from, $to, $string);
            }
            else
            {
                return $string;
            }
        }
        elseif (is_array($string))
        {
            foreach ($string as $key => $val)
            {
                $_key = self::autoCharset($key, $from, $to);
                $string[$_key] = self::autoCharset($val, $from, $to);
                if ($key != $_key)
                {
                    unset($string[$key]);
                }

            }
            return $string;
        }
        else
        {
            return $string;
        }
    }


    /**
     * 获取随机ip
     * @return [type] [description]
     */
    public static function getRandomIp()
    {
        $ip_long = array(
            array('607649792', '608174079'), //36.56.0.0-36.63.255.255
            array('1038614528', '1039007743'), //61.232.0.0-61.237.255.255
            array('1783627776', '1784676351'), //106.80.0.0-106.95.255.255
            array('2035023872', '2035154943'), //121.76.0.0-121.77.255.255
            array('2078801920', '2079064063'), //123.232.0.0-123.235.255.255
            array('-1950089216', '-1948778497'), //139.196.0.0-139.215.255.255
            array('-1425539072', '-1425014785'), //171.8.0.0-171.15.255.255
            array('-1236271104', '-1235419137'), //182.80.0.0-182.92.255.255
            array('-770113536', '-768606209'), //210.25.0.0-210.47.255.255
            array('-569376768', '-564133889'), //222.16.0.0-222.95.255.255
            //array('-899412725', '-899415024'), //202.100.13.11 202.100.4.16 陕西ip
        );
        $rand_key = mt_rand(0, count($ip_long) - 1);
        $ip = long2ip(mt_rand($ip_long[$rand_key][0], $ip_long[$rand_key][1]));
        return $ip;
    }

    /**
     * ip随机请求url
     * @param  [type] $url  [description]
     * @param  [type] $parm [description]
     * @return [type]       [description]
     */
    public static function reqUrl($url,$post_data=array(),$random_ip = true,$timeout = 15,$gzip = false){
        $headers = array();
        if($random_ip){
            $ip = self::getRandomIp();
            $headers['HTTP_X_FORWARDED_FOR'] = $ip;
            $headers['X-FORWARDED-FOR'] = $ip;
            $headers['HTTP_X_FORWARDED'] = $ip;
            $headers['HTTP_FORWARDED_FOR'] = $ip;
            $headers['CLIENT-IP'] = $ip;
            $headers['HTTP_CLIENT_IP'] = $ip;
            $headers['REMOTE_ADDR'] = $ip;
            $headers['HTTP_VIA'] = $ip;
        }
        $ch  = curl_init($url);
        curl_setopt($ch, CURLOPT_URL, $url);
        if($post_data){
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); //构造IP
        curl_setopt($ch, CURLOPT_REFERER, $url); //构造来路
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT,$timeout);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36');
        if($gzip){
            curl_setopt($ch, CURLOPT_ENCODING, "gzip");
        }
        $out = curl_exec($ch);
        $req_status_arr = curl_getinfo($ch);
        curl_close($ch);
        $return = array('content'=>'');
        if($req_status_arr['http_code'] == '200'){
            $return['content'] = $out;
        }else{
            \Yii::error($url.'--'.$req_status_arr['http_code'].$out);
        }
        return $return;
    }

    /**
     * 百度api接口 请求sn
     */
    function caculateAKSN($ak, $sk, $url, $querystring_arrays, $method = 'GET')
    {
        if ($method === 'POST'){
            ksort($querystring_arrays);
        }
        $querystring = http_build_query($querystring_arrays);
        return md5(urlencode($url.'?'.$querystring.$sk));
    }

    /**
     * 获取汉字星期几
     * @date   2016-03-04T18:28:16+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public static function getWeek(){
        return ['0'=>'日','1'=>'一','2'=>'二','3'=>'三','4'=>'四','5'=>'五','6'=>'六'][date('w')];
    }

    /**
     * 字节数转换成带单位的
     * 原理是利用对数求出欲转换的字节数是1024的几次方。
     * 其实就是利用对数的特性确定单位。
     */
    public static function size2mb($size,$digits=2){ //digits，要保留几位小数
        $unit= array('','K','M','G','T','P');//单位数组，是必须1024进制依次的哦。
        $base= 1024;//对数的基数
        $i   = floor(log($size,$base));//字节数对1024取对数，值向下取整。
        if(pow($base,$i) != 0){
            return round($size/pow($base,$i),$digits).' '.$unit[$i] . 'B';
        }else{
            return "0 MB";
        }
    }


    /**
     * 判断是否为手机
     * @date   2016-07-22T18:32:29+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public static function getUserAgentIsMobile(){
        $arr = ['android','iphone','micromessenger'];
        if (preg_match("/(" . implode('|', $arr) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
            return true;
        }
    }

    /**
     * 域名pano分流
     */
    public static function getPanoDomain($num){

        return sprintf(Yii::$app->params['pano_format_domain'], ($num % Yii::$app->params['pano_format_domain_num']) + 1);
    }

    /**
     * 域名pano分流
     */
    public static function getUpldDomain($name){
        return Yii::$app->params['oss_domain'];
    }

    /**
     * 判断是否为手机
     * @date   2016-07-22T18:32:29+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public static function getDeviceType(){
        $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        $type = 'other';
        if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
            $type = 'ios';
        }
        if(strpos($agent, 'android')){
            $type = 'android';
        }
        return $type;
    }

    /**
     * 循环创建目录
     */
    public static function mk_dir($dir, $mode = 0777)
    {
        if (is_dir($dir) || @mkdir($dir,$mode)) return true;
        if (!self::mk_dir(dirname($dir),$mode)) return false;
        return @mkdir($dir,$mode);
    }

    /**
     * 分片上传图片 【backend/controllers/DirectoryPicController.php】
     * @date 2016-06-23T14:23:24+0800
     * @author cnzhangxl@foxmail.com
     *
     * @param string $fileName ='file'
     * @param string $saveDir = Yii::getAlias('@scene_pic_dir/');
     * @param string $prefexFileName = Yii::$app->params['platform_id'];
     * @param string $prefexFileName
     * @param string $guid = $_POST['guid'] //前端传递过来的唯一字符串，供分片上传使用
     * @param array  $filterArr['width_percent_height'] 宽高比
     * @param array  $prefexDir 相对$saveDir的一个子目录 例如上传资源目录素材目录为 /material $prefexDir可以为pic、music、video
     * @return array
     */
    public static function fragmentUpload($fileName = '', $saveDir = '', $prefexDir = '', $prefexFileName = '', $guid = '', $filterArr = [], $allowArr = ['jpg']) {
        set_time_limit ( 0 );
        if (! empty ( $_FILES )) {
            if ($_FILES [$fileName] ["error"] || ! is_uploaded_file ( $_FILES [$fileName] ["tmp_name"] )) {
                return [
                    'status' => 0,
                    'msg' => 'Failed to move uploaded file.'.$_FILES [$fileName] ["error"]
                ];
            }
            // Read binary input stream and append it to temp file
            if (! $in = @fopen ( $_FILES [$fileName] ["tmp_name"], "rb" )) {
                return [
                    'status' => 0,
                    'msg' => 'Failed to open input stream.'
                ];
            }
        } else {
            return [
                'status' => 0,
                'msg' => 'Not Files'
            ];
        }

        if (! $guid) {
            return [
                'status' => 0,
                'msg' => 'guid error'
            ];
        }
        $pathinfo_name = pathinfo ( $_FILES [$fileName] ["name"] );
        $pathinfo_name ['extension'] = strtolower ( $pathinfo_name ['extension'] );
        if (! in_array ( $pathinfo_name ['extension'], $allowArr )) {
            return [
                'status' => 0,
                'msg' => 'type error'
            ];
        }
        $targetDir = $saveDir . ($prefexDir ? ('/' . $prefexDir) : '') . '/tmp';
        $cleanupTargetDir = true; // Remove old files
        $maxFileAge = 5 * 3600; // Temp file age in seconds
        if (! is_dir ( $targetDir )) {
            Common::mk_dir ( $targetDir );
        }
        $fileName = $guid . '_' . md5 ( $pathinfo_name ['filename'] ) . '.' . $pathinfo_name ['extension']; // 文件名
        $filePath = $targetDir . '/' . $fileName; // 存储路径
        // Chunking might be enabled
        $chunk = isset ( $_REQUEST ["chunk"] ) ? intval ( $_REQUEST ["chunk"] ) : 0;
        $chunks = isset ( $_REQUEST ["chunks"] ) ? intval ( $_REQUEST ["chunks"] ) : 0;
        // Remove old temp files
        if ($cleanupTargetDir) {
            if (! is_dir ( $targetDir ) || ! $dir = opendir ( $targetDir )) {
                return [
                    'status' => 0,
                    'msg' => 'Failed to open temp directory.'
                ];
            }
            while ( ($file = readdir ( $dir )) !== false ) {
                $tmpfilePath = $targetDir . '/' . $file;
                // If temp file is current file proceed to the next
                if ($tmpfilePath == "{$filePath}.part") {
                    continue;
                }
                // Remove temp file if it is older than the max age and is not the current file
                if (preg_match ( '/\.part$/', $file ) && (filemtime ( $tmpfilePath ) < time () - $maxFileAge)) {
                    @unlink ( $tmpfilePath );
                }
            }
            closedir ( $dir );
        }

        // Open temp file
        if (! $out = @fopen ( "{$filePath}.part", $chunks ? "ab" : "wb" )) {
            return [
                'status' => 0,
                'msg' => 'Failed to open output stream.'
            ];
        }

        while ( $buff = fread ( $in, 4096 ) ) {
            fwrite ( $out, $buff );
        }

        @fclose ( $out );
        @fclose ( $in );
        // Check if file has been uploaded
        if (! $chunks || $chunk == $chunks - 1) {
            if (in_array ( $pathinfo_name ['extension'], $allowArr )) { // 是图片
                $size_arr = getimagesize ( "{$filePath}.part" );
                if (isset ( $filterArr ['width_percent_height'] )) {
                    if ($size_arr [0] / $size_arr [1] != $filterArr ['width_percent_height']) {
                        return [
                            'status' => 0,
                            'msg' => '宽高比不为' . $filterArr ['width_percent_height']
                        ];
                    }
                }
            }
            // Strip the temp .part suffix off
            $relPath = ($prefexDir ? ($prefexDir . '/') : '') . date ( 'Y' ) . '/' . date ( 'm' ) . '/' . date ( 'd' );
            $targetDir = $saveDir . '/' . $relPath;
            $fileName = $prefexFileName . uniqid () . '.' . $pathinfo_name ['extension'];
            $saveFile = $targetDir . '/' . $fileName;
            if (! is_dir ( $targetDir )) {
                Common::mk_dir ( $targetDir );
            }
            $b = rename ( "{$filePath}.part", $saveFile );
            if ($b) {
                return [
                    'status' => 1,
                    'msg' => 'upload_ok',
                    'savePath' => $relPath . '/',
                    'saveFileName' => $fileName,
                    'pathInfoArr' => $pathinfo_name,
                    'absoluteFile' => $saveFile
                ];
            }
        }
        return [
            'status' => 2,
            'msg' => 'chunk_ok'
        ];
    }


    /**
     *计算某个经纬度的周围某段距离的正方形的四个点
     *
     *@param lng float 经度
     *@param lat float 纬度
     *@param distance float 该点所在圆的半径，该圆与此正方形内切，默认值为0.5千米
     *
    array 正方形的四个点的经纬度坐标
    mysql_query("select ID,X,Y from `life` where Y<>0 and Y>{$squares['right-bottom']['lat']} and Y<{$squares['left-top']['lat']} and X>{$squares['left-top']['lng']} and X<{$squares['right-bottom']['lng']}");
     */
    public static function  returnSquarePoint($lng, $lat,$distance = 1){
        $dlng =  2 * asin(sin($distance / (2 * 6371)) / cos(deg2rad($lat)));
        $dlng = rad2deg($dlng);
        $dlat = $distance/6371;
        $dlat = rad2deg($dlat);
        return array(
            'left_top'=>array('lat'=>$lat + $dlat,'lng'=>$lng-$dlng),
            'right_top'=>array('lat'=>$lat + $dlat, 'lng'=>$lng + $dlng),
            'left_bottom'=>array('lat'=>$lat - $dlat, 'lng'=>$lng - $dlng),
            'right_bottom'=>array('lat'=>$lat - $dlat, 'lng'=>$lng + $dlng)
        );
    }

    //坐标计算函数
    public static function rad($d)
    {
        return $d * 3.14159265358979323846 / 180.0;
    }
    /**
     * 获取两个坐标点之间的距离，单位km，小数点后2位
     * $lat1, $lng1;  数据库已存数据
     * $lat2, $lng2   用户传参
     */
    public static function GetDistance($lat1, $lng1, $lat2, $lng2)
    {
        $EARTH_RADIUS = 6378.137;
        $radLat1 = self::rad($lat1);
        $radLat2 = self::rad($lat2);
        $a = $radLat1 - $radLat2;
        $b = self::rad($lng1) - self::rad($lng2);
        $s = 2 * asin(sqrt(pow(sin($a/2),2) + cos($radLat1)*cos($radLat2)*pow(sin($b/2),2)));
        $s = $s * $EARTH_RADIUS;
        $s = round ( $s * 1000 ) / 1000; //单位为公里(km)
        $s = $s*1000;
        return $s;//输出米
    }

}
