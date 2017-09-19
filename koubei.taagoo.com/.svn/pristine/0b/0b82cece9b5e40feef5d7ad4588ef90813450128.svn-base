<?php

namespace frontend\modules\shop\controllers;

use common\models\AliOssClient;
use common\models\KoubeiServiceMarketOrder;
use common\models\PanoramicList;
use common\models\PanoramicMaterial;
use yii\web\Response;
use common\models\AliOpen;
use common\models\Panoramic;
use Yii;
use dosamigos\qrcode\QrCode;
use yii\web\ForbiddenHttpException;


/**
 * Default controller for the `shop` module
 */
class ShopAdminController extends BaseController
{
    public $layout = '/user_backend';
    public $enableCsrfValidation = false;

    /**
     * 店铺管理
     * @param $id string 商铺ID
     * @return string
     */
    public function actionIndex()
    {
        $user = Yii::$app->user->Identity;
        // 验证商铺 信息 等等
        // 获取商铺信息 后期改为从 order 表中获取数据
        //$shop = AliOpen::getOfflineMarketShopQuerydetailRequest($user->app_auth_token, $id);
        $shop = KoubeiServiceMarketOrder::find()->where(['merchant_pid'=>$user->user_id])->orderBy('id desc')->one();
        if(!$shop){
            throw new ForbiddenHttpException('The requested page does not exist.');
        }
        return $this->render('index', [
            'shop' => $shop
        ]);
    }

    /**
     * 获取单个店铺的全景
     */
    public function actionGetPanoramic()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $shop_id = Yii::$app->request->post('shop_id');
        $return = ['status' => 0, 'data' => []];
        if ($shop_id) {
            $panoramic = Panoramic::find()->where(['shop_id' => $shop_id, 'status' => 1])->one();
            if ($panoramic) {
                $panoramicList = PanoramicList::find()->where(['panoramic_id' => $panoramic->id, 'status' => 1])->limit(8);
                if ($panoramicList->count() > 0) {
                    $data = [
                        'panoramic_id' => $panoramic->id,
                        'scene_data' => []
                    ];
                    foreach ($panoramicList->all() as $listKey => $listVal) {
                        $panoramicMaterialModel = $listVal->panoramicMaterial;
                        $data['scene_data'][$listKey]['scene_id'] = $listVal->panoramic_material_id;
                        $data['scene_data'][$listKey]['title'] = $listVal->getTitle()['default'];
                        $data['scene_data'][$listKey]['thumb'] = $panoramicMaterialModel->getThumbs()['default'];
                        $data['scene_data'][$listKey]['status'] = $panoramicMaterialModel->status;
                    }
                    $return['status'] = 1;
                    $return['data'] = $data;
                }
            }
        }
        return $return; // 没有数据
    }

    /**
     * 上传获取Policy，直接传递到alioss
     */
    public function actionGetPolicy()
    {
        $params = Yii::$app->params['alioss'];
        $AliOssClient = AliOssClient::getInstance();
        $type = Yii::$app->request->get('type');
        $fileName = mt_rand(1, 999) . uniqid(Yii::$app->user->id);
        $type_arr = [
            'upload_pano' => [//全景图
                'dir' => 'vr_cloud/pano_private/' . date('Y') . '/' . date('m') . '/' . date('d') . '/' . Yii::$app->user->id . '/' . $fileName,
                'endpoint' => 'pano_endpoint',
            ],
            'material_music' => [//素材音乐
                'dir' => 'vr_cloud/music/' . date('Ym') . '/' . md5(Yii::$app->user->id . uniqid() . time())
            ],
            'material_images' => [//素材图片
                'dir' => 'vr_cloud/images/' . date('Ym') . '/' . md5(Yii::$app->user->id . uniqid() . time())
            ],
        ];
        if (isset($type_arr[$type])) {
            $res = $AliOssClient->getPolicy([
                'dir' => $type_arr[$type]['dir'],
                'endpoint' => isset($type_arr[$type]['endpoint']) ? $type_arr[$type]['endpoint'] : false,
                'callback_url' => Yii::$app->params['line_www_domain'] . '/interface/oss-upload-callback.html',
                'callbackBody' => 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}',
            ]);
            $res['file_name'] = $fileName;
            return is_array($res) ? json_encode($res) : json_encode([]);
        }
        return json_encode([]);
    }

    /**
     * 添加动景图
     * @return mixed
     */
    public function actionAddMaterial()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0, 'data' => []];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $transaction = Yii::$app->db->beginTransaction();
            try {
                $panoramicModel = Panoramic::createPanoramic($post->post('shop_id'));
                if ($panoramicModel === false){
                    throw new \Exception('创建动景组失败');
                }
                $materialModel = PanoramicMaterial::addMaterial($post);
                if ($materialModel === false){
                    throw new \Exception('创建动景失败');
                }
                $listModel = PanoramicList::createMaterial($panoramicModel->id, $materialModel->id);
                if ($listModel === false){
                    throw new \Exception('创建动景失败');
                }
                $transaction->commit();
                $return['status'] = 1;
                $return['data']['scene_id'] = $materialModel->id;
                $return['data']['panoramic_id'] = $panoramicModel->id;
            }catch (\Exception $e) {
                $error = $e->getMessage();
                $transaction->rollBack();
                $return['msg'] = $error;
            }
        }
        return $return;
    }

    /**
     * 重命名
     * @return mixed
     */
    public function actionRenameMaterial()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $post = Yii::$app->request;
        $return = ['status' => 0];
        if($post->post() && $post->post('panoramic_id') && $post->post('scene_id') && $post->post('rename_val')){
            $listModel = PanoramicList::findOne(['panoramic_id' => $post->post('panoramic_id') , 'panoramic_material_id' => $post->post('scene_id')]);
            if($listModel){
                $listModel->scenario = 'rename';
                $listModel->panoramic_material_title = trim($post->post('rename_val'));
                if($listModel->save() !== false){
                    $return['status'] = 1;
                    $return['data'] = $post->post();
                }else
                    $return['msg'] = $listModel->errors;
            }
        }

        return $return;
    }
    
    /**
     * 删除全景
     * @return mixed
     */
    public function actionDeleteMaterial()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $post = Yii::$app->request;
        $return = ['status' => 0];
        if($post->post() && $post->post('panoramic_id') && $post->post('scene_id')){
            $listModel = PanoramicList::findOne(['panoramic_id' => $post->post('panoramic_id') , 'panoramic_material_id' => $post->post('scene_id')]);
            if($listModel){
                $listModel->scenario = 'delete';
                $listModel->status = 2;
                if($listModel->save() !== false){
                    $return['status'] = 1;
                    $return['data'] = $post->post();
                }else
                    $return['msg'] = $listModel->errors;
            }
        }
        return $return;
    }

    /**
     * 上下架服务
     */
    public function actionPubService(){
        $return = ['status' => 0];
        Yii::$app->response->format = Response::FORMAT_JSON;
        $request = Yii::$app->request;
        $shopId = $request->post('shop_id');
        $status = $request->post('status');
        $koubeiServiceMarketOrder = KoubeiServiceMarketOrder::find()->orderBy('id desc')->where(['shop_id'=>$shopId])->one();
        if($koubeiServiceMarketOrder){
            $koubeiServiceMarketOrder->scenario = 'update';
            $aop = AliOpen::getAopObj();
            if($status ==1){
                //确认完成实施
                if($koubeiServiceMarketOrder->order_status=='TO_CONFIRM') {
                    $requestConfirm = new \AlipayOpenServicemarketOrderItemConfirmRequest ();
                    $requestConfirm->setBizContent("{" .
                        "    \"commodity_order_id\":\"" . $koubeiServiceMarketOrder->commodity_order_id . "\"," .
                        "    \"shop_id\":\"" . $koubeiServiceMarketOrder->shop_id . "\"" .
                        "  }");
                    $result = $aop->execute($requestConfirm);
                    $responseNode = str_replace(".", "_", $requestConfirm->getApiMethodName()) . "_response";
                    $resultCode = $result->$responseNode->code;
                    if (!empty($resultCode) && $resultCode == 10000) {
                        $koubeiServiceMarketOrder->order_status = 'DONE';//已完成
                        if($koubeiServiceMarketOrder->save()){
                            $return['status'] = 1;
                            Yii::error($koubeiServiceMarketOrder->commodity_order_id.'已完成  DONE:','alipay');
                        }else{
                            Yii::error($koubeiServiceMarketOrder);
                        }
                    } else {
                        Yii::error('AlipayOpenServicemarketOrderItemConfirmRequest error,result:' . json_encode($result),'alipay');
                    }
                }

                //上架
                $requestOnline = new \AlipayOpenServicemarketCommodityShopOnlineRequest ();
                $user = Yii::$app->user->Identity;
                $aop->app_auth_token = $user->app_auth_token;
                $requestOnline->setBizContent("{" .
                    "    \"commodity_id\":\"".$koubeiServiceMarketOrder->commodity_id."\"," .
                    "    \"shop_id\":\"".$koubeiServiceMarketOrder->shop_id."\"" .
                    "  }");
                $result = $aop->execute ( $requestOnline);
                $responseNode = str_replace(".", "_", $requestOnline->getApiMethodName()) . "_response";
                $resultCode = $result->$responseNode->code;
                if(!empty($resultCode)&&$resultCode == 10000){
                    $koubeiServiceMarketOrder->shop_status = 'ONLINE';
                    if($koubeiServiceMarketOrder->save()) {
                        Yii::error($koubeiServiceMarketOrder->commodity_order_id . '上架成功  ' . json_encode($result), 'alipay');
                    }else{
                        Yii::error($koubeiServiceMarketOrder, 'alipay');
                    }
                } else {
                    Yii::error($koubeiServiceMarketOrder->commodity_order_id.'上架失败  '.json_encode($result),'alipay');
                }

            }else if($status ==0){
                //下架操作
                $request = new \AlipayOpenServicemarketCommodityShopOfflineRequest ();
                $request->setBizContent("{" .
                    "    \"commodity_id\":\"".$koubeiServiceMarketOrder->commodity_id."\"," .
                    "    \"shop_id\":\"".$koubeiServiceMarketOrder->shop_id."\"" .
                    "  }");
                $result = $aop->execute ( $request);

                $responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
                $resultCode = $result->$responseNode->code;
                if(!empty($resultCode)&&$resultCode == 10000){
                    $koubeiServiceMarketOrder->shop_status = 'OFFLINE';
                    if($koubeiServiceMarketOrder->save()) {
                        Yii::error($koubeiServiceMarketOrder->commodity_order_id . '下架成功  ' . json_encode($result), 'alipay');
                        $return['status'] = 1;
                    }else{
                        Yii::error($koubeiServiceMarketOrder, 'alipay');
                    }
                } else {
                    Yii::error($koubeiServiceMarketOrder->commodity_order_id.'下架失败  '.json_encode($result),'alipay');
                }
            }
        }
        return $return;
    }

    /**
     * 获取缩略图
     */
    public function actionGetThumb()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        $post = Yii::$app->request;
        if($post->post()){
            $materialModel = PanoramicMaterial::findOne($post->post('scene_id'));
            if($materialModel){
                $return['status'] = 1;
                $return['data'] = $materialModel->getThumbs()['default'];
            }
        }
        return $return;
    }

    /**
     * 生成二维码
     */
    public function actionQrcode()
    {
        $id = Yii::$app->request->get('url');
        return QrCode::png($id, false, 1, 3);    //调用二维码生成方法
    }
    
    /**
     * 退出登录
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goBack();
    }
}
