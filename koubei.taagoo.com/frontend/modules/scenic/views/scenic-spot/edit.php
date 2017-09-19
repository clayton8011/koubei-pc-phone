<?php
use frontend\assets\AppAsset;
$this->title = '景区新建';
?>

<?= $this->render('_form', [
    'scenicSpotModel' => $scenicSpotModel,
    'scenicRadioList'=>$scenicRadioList,
    'panoramicList'=>$panoramicList
]) ?>

<?php
AppAsset::addCss($this,"@web/css/2.0/index.css");
?>