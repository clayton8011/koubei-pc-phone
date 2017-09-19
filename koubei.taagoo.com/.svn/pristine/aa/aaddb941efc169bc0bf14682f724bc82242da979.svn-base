<?php
//用户中心动景管理
namespace frontend\controllers;

use common\models\PanoramicMaterialDelLog;
use Yii;
use yii\web\Controller;
use common\models\PanoramicMaterial;

class InterfaceController extends Controller
{
    public $enableCsrfValidation = false;

    /**
     *
     */
    public function actionCutPanoNotify()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request = Yii::$app->request;
        $id = $request->post('panorama_id');
        $status = $request->post('status');
        $sign = $request->post('sign');
        if ($id && $sign && $sign == md5(Yii::$app->params['cut_service']['notify_sign'] . $id * $id)) {
            $model = PanoramicMaterial::findOne($id);
            if ($model) {
                $model->scenario = 'update';
                //发布成功
                $width = $request->post('width');
                $height = $request->post('height');
                $size = $request->post('size');
                $sceneStr = $request->post('scene_str');
                $imageStr = $request->post('image_str');
                $remotePath = $request->post('remote_path');
                if ($status == 1 && $width && $height && $size && $sceneStr && $imageStr && $remotePath) {
                    $oldPath = $model->remote_path;
                    $newPath = $remotePath;
                    $model->remote_path = $remotePath;
                    $model->scene_str = $sceneStr;
                    $model->image_str = $imageStr;
                    $model->width = $width;
                    $model->height = $height;
                    $model->size = $size;
                    if (in_array($model->status, [4, 5, 6, 7])) {
                        $model->status = 3;
                    }
                } else if ($status == 2) {
                    //切图完成，待发布
                    $model->status = 5;
                } else {
                    //切图失败
                    $model->status = 6;
                }
                if (!$model->save()) {
                    Yii::error($model->getErrors());
                } else {
                    Yii::$app->redis->hset('vr_cloud_cut_pano_notify:panoramic_material', $model->id, 1);
                }
            }
            return ['status' => 1];
        }
        //表示通知成功
        return ['status' => 0, 'msg' => '签名失败'];
    }
}
