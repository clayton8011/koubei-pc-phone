<?php

namespace frontend\modules\scenic\controllers;


/**
 * Default controller for the `scenic` module
 */
class DefaultController extends BaseController
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        echo '景区管理后台';
    }
}
