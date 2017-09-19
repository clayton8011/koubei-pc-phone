<?php

namespace frontend\modules\market\controllers;

use common\models\AliOpen;
use common\models\Member;
use Yii;
use yii\web\Controller;

/**
 * Base controller for the `market` module
 */
class BaseController extends Controller
{
    public function beforeAction($action)
    {
        $login_url = Yii::$app->params['aliyun_app']['openauth'] . '?app_id=' . Yii::$app->params['aliyun_app']['appId'] . '&redirect_uri=' . urlencode(Yii::$app->params['aliyun_app']['redirect_uri'] . '?id=market&return_url=' . urlencode(Yii::$app->request->hostInfo . Yii::$app->request->getUrl()));
        $user_id = Yii::$app->session->get('pano_market_session');
        if (!$user_id) {
            $this->redirect($login_url);
            return false;
        }
        // 数据库取值 判断刷新接口
        $user = Member::findOne(['user_id' => $user_id]);

        if (!$user) {
            // 用户不存在 重新登录
            $this->redirect($login_url);
            return false;
        }

        if (($user->created_at + $user->re_expires_in) <= time()) { // app_refresh_token 过期，重新登录
            $this->redirect($login_url);
            return false;
        }

        if (($user->created_at + $user->expires_in) <= time()) { // 过期刷新
            if (AliOpen::refreshAppAuthToken($user->app_refresh_token)) {
                $user = Member::findOne(['user_id' => $user_id]);
            } else { // 刷新失败重新登录
                $this->redirect($login_url);
                return false;
            }
        }
        if(!Yii::$app->user->login($user)){
            $this->redirect($login_url);
            return false;
        }
        return parent::beforeAction($action);
    }
}
