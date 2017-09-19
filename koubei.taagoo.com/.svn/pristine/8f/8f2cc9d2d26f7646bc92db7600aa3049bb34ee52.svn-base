<?php
use frontend\assets\AppAsset;
$this->title = '景区设置';
?>
    <div class="base-content base-width">
        <div class="scenic-area-list" style="display: block;">
            <p class="list-title">景点列表<button onclick="location.href='<?=Yii::$app->urlManager->createUrl(['scenic/scenic-spot/edit'])?>'" class="pull-right bulid-scenic-spot">新建景点</button></p>
            <table class="spot-list short-spot-list" border="" cellspacing="" cellpadding="">
                <thead>
                <tr><th>序号</th><th>景点名称</th><th>权重</th><th>操作</th></tr>
                </thead>
                <tbody>
                <?php foreach ($spotList as $item){ ?>
                <tr data-id="<?=$item->id?>">
                    <td><?=$item->id?></td>
                    <td class="text-over"><?=$item->title?></td>
                    <td><?=$item->sort?></td>
                    <td class="edit-grp">
                        <a href="<?=Yii::$app->urlManager->createUrl(['scenic/scenic-spot/edit','id'=>$item->id])?>" class="list-edit-btn">修改</a>
                        <button  class="del-btn" data-loading-text="操作中...">删除</button>
                    </td>
                </tr>
                <?php }?>
                </tbody>
            </table>
        </div>
    </div>
<?php
AppAsset::addCss($this,"@web/css/2.0/index.css");
?>


<?php $this->beginBlock('page')?>
    $('button.del-btn').click(function(){
        if(!confirm('确定要删除？')){
            return false;
        }
        var thisBtn = $(this);
        thisBtn.button('loading');
        $.ajax({
            type : 'POST',
            url : '<?=Yii::$app->urlManager->createUrl(['scenic/scenic-spot/delete'])?>',
            data : {id : thisBtn.parents('tr').attr('data-id')},
            dataType : 'json',
            success : function (result){
                thisBtn.button('reset');
                if(result.status == 1){
                    alert('删除成功。');
                    thisBtn.parents('tr').remove();
                }else{
                    alert('删除失败');
                }
            },
            error : function (){
                thisBtn.button('reset');
                alert('删除失败')
            }
        });
    });
<?php
$this->endBlock();
$this->registerJs($this->blocks['page']);

?>