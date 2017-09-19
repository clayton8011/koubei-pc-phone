<?php

namespace frontend\modules\scenic\controllers;

use common\models\PanoramicList;
use Yii;
use common\models\Activity;
use yii\web\ForbiddenHttpException;
use common\models\ScenicSpot;
use common\models\Panoramic;
use common\models\PanoramicMaterial;
use common\models\ScenicAudio;
use yii\web\Response;

/**
 * Default controller for the `scenic` module
 */
class ActivityController extends BaseController
{

    public $layout = '/scenic_backend';
    public $enableCsrfValidation = false;

    /**
     * 初始页面
     */
    public function actionIndex()
    {
        $activityList = Activity::find()->where(['AND', 'user_id=' . Yii::$app->user->id, ['!=', 'status', 3]])->all();
        return $this->render('index', [
            'activityList' => $activityList,
        ]);
    }

    /**
     * 初始页面
     */
    public function actionEdit($id = '')
    {
        $activity = Activity::findOne($id);
        if ($activity && $activity->user_id != Yii::$app->user->id) {
            return new  ForbiddenHttpException('活动不存在。');
        }
        if (!$activity) {
            $activity = new Activity();
        }
        return $this->render('edit', [
            'activity' => $activity,
        ]);
    }

    /**
     * 保存景点
     */
    public function actionSave()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0, 'msg' => '', 'data' => []];
        $post = Yii::$app->request;
        $model = null;
        if (!$post->post('id')) {
            $model = new Activity (['scenario' => 'create']);
        } else {
            $model = Activity::findOne($post->post('id'));
            $model->scenario = 'update';
        }
        $model->setAttributes([
            'title' => $post->post('title'),
            'user_id' => Yii::$app->user->id,
            'scenic_time' => $post->post('scenic_time'),
            'sort' => $post->post('sort'),
            'thumb_path' => $post->post('thumb_path'),
            'address' => $post->post('address'),
            'address_info' => $post->post('address_info'),
            'sort' => $post->post('sort'),
            'lat' => $post->post('lat'),
            'lng' => $post->post('lng'),
            'introduce' => $post->post('introduce'),
            'is_ticket' => $post->post('is_ticket'),
            'ticket_price' => $post->post('ticket_price'),
            'traffic' => $post->post('traffic'),
        ]);
        if ($model->save()) {
            $return['data']['activity_id'] = $model->id;
            $return['status'] = 1;
        }
        return $return;
    }

    /**
     * 删除
     */
    public function actionDelete()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $activity = Activity::findOne($post->post('id'));
            if ($activity && $activity->user_id = Yii::$app->user->id) {
                $activity->scenario = 'update';
                $status = $post->post('status');
                if($status==3){

                }else if($status=='true'){
                    $status = 1;
                }else{
                    $status = 2;
                }
                $activity->status = $status;
                if ($activity->save()) {
                    $return['status'] = 1;
                }
            }
        }

        return $return;
    }
}
