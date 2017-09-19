<?php

namespace frontend\modules\market\controllers;


/**
 * Default controller for the `market` module
 */
class MarketAdminController extends BaseController
{
    /**
     * 商圈管理
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }
}
