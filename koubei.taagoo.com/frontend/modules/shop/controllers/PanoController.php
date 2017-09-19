<?php

namespace frontend\modules\shop\controllers;

use common\models\AliOpen;
use common\models\Member;
use Yii;
use yii\web\Controller;
use yii\web\ForbiddenHttpException;
use common\models\Panoramic;
use common\models\KoubeiServiceMarketOrder;

/**
 * Base controller for the `shop` module
 */
class PanoController extends Controller
{
    public $enableCsrfValidation = false;
    public $layout = false;

    /**
     * 动景播放
     * @param $id string 动景ID
     * @return mixed
     */
    public function actionView($shop_id,$merchant_pid)
    {
        $koubeiServiceaMarketOrder = KoubeiServiceMarketOrder::find()->where(['shop_id'=>$shop_id,'merchant_pid'=>$merchant_pid])->one();
        if($koubeiServiceaMarketOrder){
            $model = Panoramic::findOne(['shop_id'=>$shop_id]);
            if($model){
                return $this->render('view', [
                    'model' => $model,
                    'shop' => $koubeiServiceaMarketOrder,
                ]);
            }

        }
        throw new ForbiddenHttpException('The requested page does not exist.');
    }

    /**
     * 播放xml
     * @date   2016-08-29T17:13:30+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public function actionPlayXml($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;
        $headers = Yii::$app->response->headers;
        $headers->add('Content-Type', 'text/xml');
        $model = Panoramic::findOne($id);
        if (!$model || !in_array($model->status, [1, 3, 4])) {
            throw new ForbiddenHttpException('The requested page does not exist.');
        }
        return $this->render('play_xml', [
            'model' => $model
        ]);
    }

    /**
     * 动景播放json
     */
    public function actionPanoJson()
    {
        if (Yii::$app->request->post()) {
            $id = Yii::$app->request->post('panoramic_id');
            $returnData = Panoramic::getPlayJson($id);
            return json_encode(['status' => 1, 'data' => $returnData]);
        }
        return json_encode(['status' => 0]);
    }
}
