<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use common\models\AliOpen;

/**
 * auth controller
 */
class AuthController extends Controller
{
    /**
     * 授权回调
     */
    public function actionAuth()
    {
        if (Yii::$app->request->get('app_auth_code')) { // 商户授权
            $appData = AliOpen::getAccessToken(Yii::$app->request->get('app_auth_code'));
        } else {
            return ''; // 暂时无法为您提供服务
        }
        $modules = Yii::$app->request->get('id', 'shop');
        if ($appData) {
            if ($modules == 'market') {
                Yii::$app->session->set('pano_market_session', $appData->user_id);
            } else if ($modules == 'shop') {
                Yii::$app->session->set('pano_shop_session', $appData->user_id);
            } else if ($modules = 'scenic') {
                Yii::$app->session->set('pano_scenic_session', $appData->user_id);
            }
            $this->redirect(Yii::$app->request->get('return_url', [$modules . '/shop-admin/index']));
        }
    }
}
