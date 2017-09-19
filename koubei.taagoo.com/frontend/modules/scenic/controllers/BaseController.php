<?php

namespace frontend\modules\scenic\controllers;

use common\models\AliOpen;
use common\models\Member;
use Yii;
use yii\web\Controller;

/**
 * Base controller for the `scenic` module
 */
class BaseController extends Controller
{
    public function beforeAction($action)
    {
        if (Yii::$app->user->isGuest) {
            $login_url = Yii::$app->params['aliyun_app']['openauth'] . '?app_id=' . Yii::$app->params['aliyun_app']['appId'] . '&redirect_uri=' . urlencode(Yii::$app->params['aliyun_app']['redirect_uri'] . '?id=scenic&return_url=' . urlencode(Yii::$app->request->hostInfo . Yii::$app->request->getUrl()));
            $user_id = Yii::$app->session->get('pano_scenic_session');
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
            if (!Yii::$app->user->login($user, $user->expires_in-(time()-$user->created_at))) {
                $this->redirect($login_url);
                return false;
            }
        }
        return parent::beforeAction($action);
    }

    /**
     * 退出登录
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();
        $login_url = Yii::$app->params['aliyun_app']['openauth'] . '?app_id=' . Yii::$app->params['aliyun_app']['appId'] . '&redirect_uri=' . urlencode(Yii::$app->params['aliyun_app']['redirect_uri'] . '?id=scenic&return_url=' . urlencode(Yii::$app->request->hostInfo . Yii::$app->urlManager->createUrl(['scenic/scenic-admin/index'])));
        return $this->redirect($login_url);
    }
}
