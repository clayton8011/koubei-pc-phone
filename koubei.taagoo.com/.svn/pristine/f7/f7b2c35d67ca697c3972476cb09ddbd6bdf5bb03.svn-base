<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use common\models\AliOpen;
use common\models\KoubeiServiceMarketOrder;



/**
 * 支付宝向服务商推送消息Controller
 */
class PanoController extends Controller
{

    /**
     * 监听支付宝推送消息
     * @return bool
     */
    public function actionPlay()
    {
        $this->layout = false;
        $request = Yii::$app->request;
        if($request->get('shop_id')!='2016041800077000000015345841' || $request->get('merchant_pid')!='2088802532857530'){
            echo '此店未开通此服务';
        }else{
            $arr = [];
            return $this->render('play', [
                'arr' => $arr,
            ]);
        }
    }
}
