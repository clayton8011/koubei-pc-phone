<?php
use frontend\assets\AppAsset;

$this->title = '活动列表';
?>
<div class="base-content base-width clearfix">
    <p class="list-title">活动列表
        <button class="pull-right bulid-scenic-spot"
                onclick="location.href='<?= Yii::$app->urlManager->createUrl(['scenic/activity/edit']) ?>'">新建活动
        </button>
    </p>
    <table class="activity-list" border="" cellspacing="" cellpadding="">
        <thead>
        <tr>
            <th class="text-center">序号</th>
            <th>活动名称</th>
            <th>活动时间</th>
            <th>活动状态</th>
            <th>权重</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($activityList as $item) { ?>
            <tr data-id="<?=$item->id?>">
                <td class="text-center"><?=$item->id?></td>
                <td class="text-over"><?=$item->title?></td>
                <td class="text-over"><?=$item->scenic_time?></td>
                <td>
                    <label class="switch-btn">
                        <input class="checked-switch" type="checkbox" <?=$item->status==1?'checked="checked"':''?> >
                        <span class="text-switch" data-yes="yes" data-no="no"></span>
                        <span class="toggle-btn"></span>
                    </label>
                </td>
                <td><?=$item->sort?></td>
                <td class="edit-grp">
                    <a href="<?= Yii::$app->urlManager->createUrl(['scenic/activity/edit', 'id' => $item->id]) ?>"
                       class="list-edit-btn">修改</a>
                    <button class="del-btn" data-loading-text="操作中..." data-status="3">删除</button>
                </td>
            </tr>
        <?php } ?>
        </tbody>
    </table>
</div>
<?php
AppAsset::addCss($this, "@web/css/2.0/index.css");
?>
<?php $this->beginBlock('page')?>
$('button.del-btn,input.checked-switch').click(function () {
    if (!confirm('确定要操作吗？')) {
        return false;
    }
    var thisBtn = $(this);
    thisBtn.button('loading');
    var status = thisBtn.attr('data-status');
    status = undefined==status?thisBtn.is(':checked'):status;

    $.ajax({
        type: 'POST',
        url: '<?=Yii::$app->urlManager->createUrl(['scenic/activity/delete'])?>',
        data: {id: thisBtn.parents('tr').attr('data-id'),status:status},
        dataType: 'json',
        success: function (result) {
            thisBtn.button('reset');
            if (result.status == 1) {
                alert('操作成功。');
                if(status==3){
                    thisBtn.parents('tr').remove();
                }
            } else {
                alert('操作失败');
            }
        },
        error: function () {
            thisBtn.button('reset');
            alert('操作失败')
        }
    });
});
<?php
$this->endBlock();
$this->registerJs($this->blocks['page']);
?>
