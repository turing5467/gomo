function render(data) {
    $('<ul class="product-lists clearfix" id="product-box">').html(() => {

        return data.map((ele) => {
            let small_pics = ele.small_pics.split(',');
            let promotion = ele.promotion.length == 0 ? [] : ele.promotion.split(',');
            let shop_name = ele.shop_name == 'null' ? '' : `<a class=nname>${ ele.shop_name}</a>`;

            let li_html = small_pics.map((e) => {
                return `<li class="icon-li current already"><img src=${e}></li>`;
            }).join('');
            prom_text = ele.prom_text == undefined ? '' : `<p class=item-promotional-language>${ele.prom_text}</p>`;

            let promotion_normal = promotion.map((e) => {
                return `<span class=promotion-normal>${e}</span>`
            }).join('');
            let shop_tag = ele.shop_zy_tag == true ? '<span class=nnamezy>自营</span>' : '';
            let option = `<p class="item-option clearfix">	            <span class="add-contrast" cid="A0004958764/pop8010690303" title="对比"><i class="icon"></i></span>	            <span class="add-collection" pid="A0004958764" skuid="pop8007961586" pname=${ele.name} title="收藏"><i class="icon"></i></span>	            	            <a class="add-cart addTo-cart" href="javascript:void(0);" ismcard="" shopflag="0" ishyg="0" pid="A0004958764" skuid="pop8007961586" taotype="0" taoskuid="" data-code="list-9000000700-1_1_3" title="加入购物车"><i class="icon"></i></a>	            	            	                	                <span title="在线客服" class="gomekf online-server" customer-entry="product" shopid="80005619" skuid="pop8010690303" productid="A0004958764" categoryid="cat10000001_cat10000015_cat10000097" brandid="147L" orgi="80005619"><i class="icon"></i></span>	            	        </p>`;
            return `<li class=product-item id=${ele.code}>
        <div class=item-tab>
            <p class="item-pic"><a href=javascript:; title=${ele.name}><img src=${small_pics[0].replace('_30','_210')} alt=${ele.name}></a></p>
            <div class=item-pic-small-box>
                <a href=javascript:void(0); class="icon-prev disable">
                <a href=javascript:void(0); class="icon-next  disable"></a>
                <div class=item-pic-small-wrap>
                    <ul class=imgList>${li_html}</ul>
                </div>
            </div>
            <p class=item-price><span class=price>¥${ele.price}</span></p>
            <p class="item-name"><a class="item-link" href="//item.gome.com.cn/A0004958764-pop8007961586.html" target="_blank" title=${ele.name}>${ele.name}</a></p>
            ${prom_text}
            <p class=item-comment-dispatching>
                <span class=dispatching></span>
                <a class=comment href=javascript:;>
                        <span class="grey">已有</span>${ele.comment}<span class="grey">人评价</span>
                </a>
            </p>
            <p class=item-shop>${shop_tag}${shop_name}</p>
            <p class=item-promotion>${promotion_normal}</p>
            ${option}
        </div>
            </li>`;
        })
    }).appendTo($('.product-box').eq(0));
    $('.imgList').on('mouseenter', 'img', (e) => {
        let cur_small_pic = $(e.currentTarget).attr('src');
        let cur_big_pic = $(e.currentTarget).parents('.product-item').find('.item-pic img');
        cur_big_pic.attr('src', cur_small_pic.replace('_30', '_210'));
    })
}

function getType() {
    let cur_sort = $('.filter-order-box .cur');
    let index = cur_sort.index();
    let type;
    switch (index) {
        case 0:
            type = 0;
            break;
        case 1:
            type = 1;
            break;
        case 2:
            if (cur_sort.is('.price-up')) {
                type = 2
            } else {
                type = 3;
            }
            break;
    }
    return type;
}

$(() => {

    //设置ajax全局配置
    $.ajaxSetup({
        url: "./server/getProductData.php",
        global: false,
        type: "get",
        dataType: "json",
        success: (response) => {
            if (response.status == 'success') {
                render(response.data);
            }
        }
    });


    let flag = true;

    $('#sort-price').click((e) => {

        //清空之前渲染的列表表
        $('.product-box').eq(0).html('');
        kkpager.selectPage(1);

        let t = $(e.currentTarget);
        t.addClass('cur').siblings().removeClass('cur');

        let type;
        if (flag == true) {
            // console.log(e.currentTarget);
            t.addClass('price-up').removeClass('price-down');
            type = 1;
        } else {
            t.addClass('price-down').removeClass('price-up');
            type = 2;
        }
        flag = !flag;

        $.ajax({
            data: {
                page: 0,
                type,
            }
        });
    });

    $('#sort-general').click((e) => {
        $('.product-box').eq(0).html('');
        kkpager.selectPage(1);

        let t = $(e.currentTarget);
        t.addClass('cur').siblings().removeClass('cur');

        $.ajax({
            data: {
                page: 0,
                type: 0
            }
        });
    })

    $('#sort-comment').click((e) => {
        $('.product-box').eq(0).html('');
        kkpager.selectPage(1);

        let t = $(e.currentTarget);
        t.addClass('cur').siblings().removeClass('cur');

        $.ajax({
            data: {
                page: 0,
                type: 3
            }
        });
    })

    const low_price = $('#fc-lowPrice');
    const high_price = $('#fc-highPrice');
    const cancel_btn = $('#fc-btn-cancel');
    const ok_btn = $('#fc-btn-ok');
    const price_input = $('.priceRange-input');
    const price_box = $('.filter-priceRange-box').eq(0);

    price_box.mouseleave((e) => {
        price_box.removeClass('filter-priceRange-click');
    });

    price_box.on('click', '.priceRange-input', (e) => {
        price_box.addClass('filter-priceRange-click');
    });

    ok_btn.click(() => {

        let val1 = low_price.val().trim().replace('¥', '') * 1;
        let val2 = high_price.val().trim().replace('¥', '') * 1;
        if (val1 > val2) {
            [val1, val2] = [val2, val1];
        }
        if (val1 && val2) {
            $('.product-box').eq(0).html('');
            $.ajax({
                data: {
                    page: 0,
                    type: 4,
                    'low_price': val1,
                    'high_price': val2
                }
            })
        }

    })

})