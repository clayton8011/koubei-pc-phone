<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use common\models\AliOpen;
use common\models\KoubeiServiceMarketOrder;



/**
 * 支付宝向服务商推送消息Controller
 */
class AlipayMonitorController extends Controller
{
    public $enableCsrfValidation = false;

    /**
     * 监听支付宝推送消息
     * @return bool
     */
    public function actionIndex()
    {
        $request = Yii::$app->request;
        $message = 'alipay--收到通知，post:'.json_encode($request->post())."\r\n".'get:'.json_encode($request->get());
        $aop = AliOpen::getAopObj();
        //验签
        $b = $aop->rsaCheckV2($request->post(),'',$aop->signType);
        Yii::info($message."\r\n".'验签结果:'.$b,'alipay');
        if($b){
            $result = KoubeiServiceMarketOrder::addOrder($request,$aop);
            if($result->hasErrors()){
                return 'false';
            }else {
                return 'true';
            }

        }
        return 'false';
    }
}
