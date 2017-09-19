<div class="shop-list-box">
    <h5 class="shop-title-name">商圈店铺列表</h5>
    <div class="shop-box">
        <label class="shop-name">店铺名称：</label>
        <span class="search-shop-box">
							<input class="search-shop-input" type="text" name="" id="" value="" placeholder="搜索店铺名称">
							<button type="button"><img src="images/search-btn.png"></button>
						</span>
        <label class="vr-shop-name">VR店铺：</label>
        <select class="sel-shop-name" name="vr-shop">
            <option value="">全部</option>
            <option value="">全部1</option>
            <option value="">全部2</option>
        </select>
        <table class="shop-list" border="" cellspacing="" cellpadding="0">
            <tbody>
            <tr class="list-head">
                <th>店铺编号</th>
                <th>店铺名称</th>
                <th>地址</th>
                <th>VR店铺</th>
                <th>操作</th>
            </tr>
            </tbody>
            <tbody>
            <?php  foreach ($res->shop_summary_infos as $one) {?>
                <tr>
                    <td class="text-over"><?=$one->shop_id?></td>
                    <td class="text-over" title=""><?=$one->main_shop_name?></td>
                    <td class="text-over" title=""><?=$one->address?></td>
                    <td>有</td>
                    <td>
                        <button class="vr-set-btn shop-link-color">VR设置</button>
                        <a class="vr-preview shop-link-color" href="#" data-toggle="modal"
                           data-target="#vr-preview-modal">VR预览</a>
                    </td>
                </tr>
            <?php } ?>
            </tbody>
        </table>
    </div>
</div>