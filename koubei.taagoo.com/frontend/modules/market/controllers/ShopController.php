<?php

namespace frontend\modules\market\controllers;

use Yii;
use common\models\AliOpen;
/**
 * 店铺管理
 * @package frontend\modules\market\controllers
 */
class ShopController extends BaseController
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        $res = AliOpen::getBatchQuery('MERCHANT_SELF',Yii::$app->user->Identity->user_id);
        var_dump($res);exit;
        return $this->render('index',['res'=>$res]);
    }
}
