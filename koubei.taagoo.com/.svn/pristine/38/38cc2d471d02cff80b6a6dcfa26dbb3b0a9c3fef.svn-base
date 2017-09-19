<?php

namespace frontend\modules\shop\controllers;

use common\models\AliOpen;
use Yii;
use yii\web\Controller;


/**
 * Default controller for the `shop` module
 */
class DefaultController extends Controller
{
    public $layout = '/user_backend';

    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {


        $aop = AliOpen::getAopObj ();
//        $aop->app_auth_token ='201705BB80c399d78485464ebe9c7702113bbX11';


        $request = new \AlipayOfflineMarketShopCreateRequest ();
        $ver = '1009';
//         $request->setBizContent("{" .
//             "    \"store_id\":\"20170608000770".$ver."\"," .
//             "    \"category_id\":\"2016062900190185\"," .
//             "    \"brand_name\":\"其它品牌\"," .
//             "    \"brand_logo\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//             "    \"main_shop_name\":\"测试用门店".$ver."\"," .
//             "    \"branch_shop_name\":\"五路居店".$ver."\"," .
//             "    \"province_code\":\"150000\"," .
//             "    \"city_code\":\"152200\"," .
//             "    \"district_code\":\"152224\",".
//             "    \"address\":\"水泉镇中心卫生院\"," .
//             "    \"longitude\":121.766111," .
//             "    \"latitude\":\"45.485238\"," .
//             "    \"contact_number\":\"15810862902\"," .
//             "    \"notify_mobile\":\"15810862902\"," .
//             "    \"main_image\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//             "    \"audit_images\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC,4Q8Pp00AT7eo9NoAJkMR3AAAACMAAUYT\"," .
//             "    \"business_time\":\"周一-周五 09:00-20:00,周六-周日 10:00-22:00\"," .
//             "    \"wifi\":\"T\"," .
//             "    \"parking\":\"F\"," .
//             "    \"value_added\":\"免费茶水、免费糖果\"," .
//             "    \"avg_price\":\"35.83\"," .
//             "    \"isv_uid\":\"2088001969784501\"," .
//             "    \"licence\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//             "    \"licence_code\":\"91110108MA00BRQG7J\"," .
//             "    \"licence_name\":\"北京大国宝文创科贸有限公司\"," .
// //            "    \"business_certificate\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
// //            "    \"business_certificate_expires\":\"2020-03-20\"," .
// //            "    \"auth_letter\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//             "    \"is_operating_online\":\"F\"," .
//             //"    \"online_url\":\"http://www.taagoo.com/\"," .
//             // "    \"operate_notify_url\":\"https://koubei.taagoo.com/alipay-monitor/index.html\"," .
//             "    \"implement_id\":\"HU00".$ver.",HT00".$ver."\"," .
//             "    \"no_smoking\":\"T\"," .
//             "    \"box\":\"T\"," .
//             "    \"request_id\":\"20171232354".$ver."\"," .
//             // "    \"other_authorization\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC,1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//             // "    \"licence_expires\":\"2020-10-20\"," .
//             // "    \"op_role\":\"ISV\"," .
//             "    \"biz_version\":\"2.0\"" .
//             "  }");



        //大国宝
        $request->setBizContent("{" .
            "    \"store_id\":\"20170608000770".$ver."\"," .
            "    \"category_id\":\"2016062900190185\"," .//礼品
            "    \"brand_name\":\"其它品牌\"," .
            "    \"brand_logo\":\"j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED\"," .//["image_id"]=>string(32) "j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED"["image_url"]=>string(106) "https://oalipay-dl-django.alicdn.com/rest/1.0/image?fileIds=j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED&zoom=original"
            "    \"main_shop_name\":\"大国宝天坛旅游文创店\"," .
            "    \"branch_shop_name\":\"五路居店".$ver."\"," .
            "    \"province_code\":\"110000\"," .
            "    \"city_code\":\"110100\"," .
            "    \"district_code\":\"110108\",".
            "    \"address\":\"阜外亮甲店1号恩济西园10号楼西三门243室\"," .
            "    \"longitude\":116.28101," .
            "    \"latitude\":\"39.932463\"," .
            "    \"contact_number\":\"15810862902\"," .
            "    \"notify_mobile\":\"15810862902\"," .
            "    \"main_image\":\"j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED\"," .
            "    \"audit_images\":\"j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED,DEMzpAvISJulZ_m9FdyYHwAAACMAAQED,ri3fE9qIQAWFyMpTcV-YrAAAACMAAQED\"," .
            "    \"business_time\":\"周一-周五 09:00-20:00,周六-周日 10:00-22:00\"," .
            "    \"wifi\":\"T\"," .
            "    \"parking\":\"F\"," .
            "    \"value_added\":\"免费茶水、免费糖果\"," .
            "    \"avg_price\":\"35.83\"," .
            "    \"isv_uid\":\"2088001969784501\"," .
            "    \"licence\":\"_NXASAKpRKOH-4brIRXkDgAAACMAAQQD\"," .
            "    \"licence_code\":\"91110108MA00BRQG7J\"," .
            "    \"licence_name\":\"北京大国宝文创科贸有限公司\"," .
//            "    \"business_certificate\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//            "    \"business_certificate_expires\":\"2020-03-20\"," .
//            "    \"auth_letter\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
            "    \"is_operating_online\":\"F\"," .
            //"    \"online_url\":\"http://www.taagoo.com/\"," .
            // "    \"operate_notify_url\":\"https://koubei.taagoo.com/alipay-monitor/index.html\"," .
            "    \"implement_id\":\"HU00".$ver.",HT00".$ver."\"," .
            "    \"no_smoking\":\"T\"," .
            "    \"box\":\"T\"," .
            "    \"request_id\":\"20171232354".$ver."\"," .
            // "    \"other_authorization\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC,1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
             "    \"licence_expires\":\"2027-02-13\"," .
             "    \"op_role\":\"ISV\"," .
            "    \"biz_version\":\"2.0\"" .
            "  }");

//        $request->setBizContent("{" .
//            "    \"store_id\":\"20170608000770".$ver."\"," .
//            "    \"category_id\":\"2016062900190185\"," .//礼品
//            "    \"brand_name\":\"其它品牌\"," .
//            "    \"brand_logo\":\"j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED\"," .//["image_id"]=>string(32) "j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED"["image_url"]=>string(106) "https://oalipay-dl-django.alicdn.com/rest/1.0/image?fileIds=j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED&zoom=original"
//            "    \"main_shop_name\":\"大国宝天坛旅游文创店\"," .
//            "    \"branch_shop_name\":\"五路居店".$ver."\"," .
//            "    \"province_code\":\"110000\"," .
//            "    \"city_code\":\"110100\"," .
//            "    \"district_code\":\"110108\",".
//            "    \"address\":\"阜外亮甲店1号恩济西园21号楼21-1\"," .
//            "    \"longitude\":116.28101," .
//            "    \"latitude\":\"39.932463\"," .
//            "    \"contact_number\":\"15810862902\"," .
//            "    \"notify_mobile\":\"15810862902\"," .
//            "    \"main_image\":\"j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED\"," .
//            "    \"audit_images\":\"j8H7_pMrTzCxyZ6ho81LMwAAACMAAQED,DEMzpAvISJulZ_m9FdyYHwAAACMAAQED,ri3fE9qIQAWFyMpTcV-YrAAAACMAAQED\"," .
//            "    \"business_time\":\"周一-周五 09:00-20:00,周六-周日 10:00-22:00\"," .
//            "    \"wifi\":\"T\"," .
//            "    \"parking\":\"F\"," .
//            "    \"value_added\":\"免费茶水、免费糖果\"," .
//            "    \"avg_price\":\"35.83\"," .
//            "    \"isv_uid\":\"2088001969784501\"," .
//            "    \"licence\":\"_NXASAKpRKOH-4brIRXkDgAAACMAAQQD\"," .
//            "    \"licence_code\":\"91110108665623894\"," .
//            "    \"licence_name\":\"北京大国慧谷科技股份有限公司\"," .
////            "    \"business_certificate\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
////            "    \"business_certificate_expires\":\"2020-03-20\"," .
////            "    \"auth_letter\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//            "    \"is_operating_online\":\"F\"," .
//            //"    \"online_url\":\"http://www.taagoo.com/\"," .
//            // "    \"operate_notify_url\":\"https://koubei.taagoo.com/alipay-monitor/index.html\"," .
//            "    \"implement_id\":\"HU00".$ver.",HT00".$ver."\"," .
//            "    \"no_smoking\":\"T\"," .
//            "    \"box\":\"T\"," .
//            "    \"request_id\":\"20171232354".$ver."\"," .
//            // "    \"other_authorization\":\"1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC,1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC\"," .
//            "    \"licence_expires\":\"2027-02-13\"," .
//            "    \"op_role\":\"ISV\"," .
//            "    \"biz_version\":\"2.0\"" .
//            "  }");
        $result = $aop->execute ( $request);
        var_dump($result);exit;

        $responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
        $resultCode = $result->$responseNode->code;
        if(!empty($resultCode)&&$resultCode == 10000){
            echo "成功";
        } else {
            echo "失败";
        }
        return $this->render('index');
    }

    //获取店铺列表
    public function actionGet(){
        $aop = AliOpen::getAopObj ();

        $request = new \AlipayOfflineMarketShopBatchqueryRequest ();
        $request->setBizContent("{" .
            "    \"page_no\":\"1\"" .
            "  }");
        $result = $aop->execute ( $request);
        var_dump($result);exit;

        $responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
        $resultCode = $result->$responseNode->code;
        if(!empty($resultCode)&&$resultCode == 10000){
            echo "成功";
        } else {
            echo "失败";
        }

    }

    //创建广告
    public function actionAddAdv(){
        $aop = AliOpen::getAopObj ();
        $request = new \AlipayMarketingCdpAdvertiseCreateRequest ();
        $request->setBizContent("{" .
            "    \"ad_code\":\"CDP_OPEN_MERCHANT\"," .
            "    \"content_type\":\"PIC\"," .
            "    \"content\":\"EQkrdik4Q6-YgrKWic57AQAAACMAAQED\"," .
            "    \"action_url\":\"https://data.taagoo.com/pano/20160800001947.html\"," .
            "    \"ad_rules\":\"{\\\"shop_id\\\":[\\\"2017051600077000000000095053\\\"]}\"," .
            "    \"height\":\"100\"," .
            "    \"start_time\":\"2016-02-24 12:12:12\"," .
            "    \"end_time\":\"2018-09-24 12:12:12\"" .
            "  }");
        $result = $aop->execute ( $request);
        $responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
        $resultCode = $result->$responseNode->code;
        if(!empty($resultCode)&&$resultCode == 10000){
            $request = new \AlipayMarketingCdpAdvertiseOperateRequest();
            $request->setBizContent("{" .
                "    \"ad_id\":\"".$result->$responseNode->ad_id."\"," .
                "    \"operate_type\":\"online\"" .
                "  }");
            $result = $aop->execute ( $request);

            $responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
            $resultCode = $result->$responseNode->code;
            if(!empty($resultCode)&&$resultCode == 10000){
                echo "广告上线成功";
            } else {
                echo "广告上线失败";
            }
        } else {
            echo "失败";
        }
        print_r($result);
    }

    //图片上传
    public function actionUploadPic(){
        $aop = AliOpen::getAopObj ();
        $request = new \AlipayOfflineMaterialImageUploadRequest ();
        $request->setImageType("jpg");
        $request->setImageName("taagoo");
        $request->setImageContent("@"."/Users/cnzhangxl/Downloads/yyzz.jpg");
        $request->setImagePid("2088021822217233");
        $result = $aop->execute ( $request);

        var_dump($result);
        exit;
        $responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
        $resultCode = $result->$responseNode->code;
        if(!empty($resultCode)&&$resultCode == 10000){
            echo "图片上传成功";

        } else {
            echo "失败";
        }
        print_r($result);
//        [code] => 10000
//            [msg] => Success
//        [image_id] => inz0ctd4SZKrezuOfxtZ9AAAACMAAQED
//        [image_url] => https://oalipay-dl-django.alicdn.com/rest/1.0/image?fileIds=inz0ctd4SZKrezuOfxtZ9AAAACMAAQED&zoom=original
    }



    //店铺优惠查询
    public function actionYouhui(){
        echo '<pre>';
        $aop = AliOpen::getAopObj ();


        $request = new \AlipayOfflineMarketShopBatchqueryRequest ();
        $request->setBizContent("{" .
            "    \"page_no\":\"1\"" .
            "  }");
        $result = $aop->execute ( $request);
        echo '查询商户的门店编号列表:<br/>';
        print_r($result);



        $request = new \AlipayOfflineMarketShopSummaryBatchqueryRequest ();
        $request->setBizContent("{" .
            "    \"op_role\":\"ISV\"," .
            "    \"query_type\":\"MALL_SELF\"," .
            "    \"related_partner_id\":\"2088621644606760\"," .
            "    \"page_no\":1," .
            "    \"page_size\":100" .
            "  }");
        $result = $aop->execute ( $request);
        echo '查询商户下商圈门店:<br/>';
        print_r($result);


        $request = new \AlipayOfflineMarketShopSummaryBatchqueryRequest ();
        $request->setBizContent("{" .
            "    \"op_role\":\"ISV\"," .
            "    \"query_type\":\"MALL_RELATION\"," .
            "    \"related_partner_id\":\"2088621644606760\"," .
            "    \"page_no\":1," .
            "    \"page_size\":100" .
            "  }");
        $result = $aop->execute ( $request);
        echo '查询商圈下所有门店:<br/>';
        print_r($result);




        $request = new \AlipayOfflineMarketShopQuerydetailRequest ();
        $request->setBizContent("{" .
            "    \"shop_id\":\"2017032100077010000027333609\"" .
            "  }");
        $result = $aop->execute ( $request);

        echo '店铺信息：<br/>';
        print_r($result);

        $request = new \AlipayOfflineMarketShopDiscountQueryRequest ();
        $request->setBizContent("{" .
            "    \"shop_id\":\"2017032100077010000027333609\"" .
            "  }");
        $result = $aop->execute ( $request);
        echo '优惠信息：<br/>';
        print_r($result);

        return false;
    }
}
