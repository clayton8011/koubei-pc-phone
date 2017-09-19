<?php

use frontend\assets\AppAsset;
$action = explode('/',$this->context->action->uniqueId);
?>
<div class="content-left pull-left">
    <!--<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div class="panel panel-default">-->
    <ul class="panel-group" id="manu-list" role="tablist" aria-multiselectable="true">
        <!--<li class="panel">
            <div  role="tab" id="heading-shangquan">
                <a <?/*= $action[0] == 'market' ? 'class="active"' : ''*/?> role="button" data-toggle="collapse" href="#shangquan-list" data-parent="#manu-list" aria-expanded="true" aria-controls="shangquan-list">商圈管理</a>
            </div>
            <ul class="panel-collapse collapse" id="shangquan-list" role="tabpanel" aria-labelledby="heading-shangquan">
                <li class=""><a href="<?/*= Yii::$app->urlManager->createUrl(['/market/market-admin/index'])*/?>">商圈设置</a></li>
                <li class=""><a href="<?/*= Yii::$app->urlManager->createUrl(['/market/shop/index'])*/?>">店铺列表</a></li>
            </ul>
        </li>-->
        <li class="panel">
            <div role="tab" id="headingShop">
                <a role="button" data-toggle="collapse" href="#shop-list" data-parent="#manu-list" aria-expanded="false" aria-controls="shop-list">店铺管理</a>
            </div>
            <!--<img class="manu-line" src="images/manu-line.png"/>-->
            <ul class="panel-collapse collapse <?= $action[0] == 'shop' ? 'in' : ''?>" id="shop-list" role="tabpanel" aria-labelledby="heading-shangquan">
                <li class=""><a <?= ($action[1].'/'.$action[2]) == 'shop-admin/index' ? 'class="active"' : ''?> href="<?= Yii::$app->urlManager->createUrl(['/shop/shop-admin/index'])?>">店铺设置</a></li>
            </ul>
        </li>
        <!--<li class="panel">
            <div role="tab" id="heading-template">
                <a role="button" data-toggle="collapse" href="#template-list" data-parent="#manu-list" aria-expanded="false" aria-controls="template-list">模板管理</a>
            </div>
            <ul class="panel-collapse collapse" id="template-list" role="tabpanel" aria-labelledby="heading-template">
                <li class=""><a href="#">商圈设置</a></li>
                <li class=""><a href="#">商圈设置</a></li>
            </ul>
        </li>-->
    </ul>
</div>
<?php
AppAsset::addCss($this,"@web/css/index.css");
AppAsset::addScript($this,"@web/js/cloud-business.js");
?>