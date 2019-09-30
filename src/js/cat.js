//数据渲染
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
            let shop_tag = ele.shop_zy_tag == 'true' ? '<span class=nnamezy>自营</span>' : '';

            let option = `<p class="item-option clearfix">	            <span class="add-contrast" cid="A0004958764/pop8010690303" title="对比"><i class="icon"></i></span>	            <span class="add-collection" pid="A0004958764" skuid="pop8007961586" pname=${ele.name} title="收藏"><i class="icon"></i></span>	            	            <a class="add-cart addTo-cart" href="javascript:void(0);" title="加入购物车"><i class="icon"></i></a>	            	            	                	     <span title="在线客服" class="gomekf online-server"><i class="icon"></i></span></p>`;
            return `<li class=product-item id=${ele.code}>
        <div class=item-tab>
            <p class="item-pic"><a class=item-link href='./detail.html?code=${ele.code}' title=${ele.name}><img src=${small_pics[0].replace('_30','_210')} alt=${ele.name}></a></p>
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
    });
    $('.addTo-cart').click((e) => {

        //获取当前用户id
        let id = Cookie.get('userId');

        //获取当前商品id => php:添加至数据库,数量 加 1
        let product_code = $(e.target).parents('.product-item').attr('id');

        let num = 1;
        let type = 1;

        $.ajax({
            type: "post",
            url: "../server/addToCart.php",
            data: {
                id,
                product_code,
                num,
                type,
                flag: 0
            },
            success: function(response) {

                if (response) {
                    window.location.href = `./add_cart_succeed.html?code=${product_code}&num=${num}&type=${type}`;
                }
            }
        });
    });
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
        url: "../server/getProductData.php",
        global: false,
        type: "get",
        dataType: "json",
        success: (response) => {
            if (response.status == 'success') {
                render(response.data);
            }
        }
    });

    $.getJSON('../server/hot_tj.json', (res) => {
        $('#hot-list').html(() => {
            return res.map((ele) => {

                return `
                <li class=item>
                    <p class="pic">
                        <a href=# title='${ele.name}'>
                        <img src=${ele.pic} alt=${ele.name}></a>
                    </p>
                    <p class=name>
                        <a href=# title='${ele.name}'>${ele.name}</a>
                    </p>
                    <p class=price>${ele.price}</p>
                    <p class=btn>
                        <a class=buy href=#>立即抢购</a>
                    </p>
                </li>
                `;
            }).join('');
        })
    });

    let facets = $('.nSearch-facets').eq(0);
    new Promise((resolve) => {
        $.getJSON('../server/facets.json', function(res) {

            let brand = $('<div id=facets-category-brand class="facets-category clearfix"></div>').appendTo(facets);

            brand.append(`<span class=fc-key><b>品牌：</b></span>`);
            $('<div>').addClass('fc-content').html(() => {
                let li_html = res.brands.map((ele) => {

                    return `<li class=c-brand>
                                    <a href="javascript:;" name=${ele.title} style=${ele.style}>
                                        ${ele.title}
                                    </a>
                                </li>`
                }).join('');
                return `<ul class="category-brand clearfix">${li_html}</ul>`
            }).appendTo(brand);

            res.commonFacets.forEach((e) => {
                let common_facet = $('<div>').addClass('facets-category facets-category-common  clearfix');

                common_facet.append(`<span class="fc-key fir">${e.key}</span>`);

                $('<div>').addClass('fc-content').html(() => {
                    let li_html = e.contents.map((ee) => {
                        return `<li><a class="facet">${ee}</a></li>`;
                    }).join('');
                    return `<ul class=clearfix>${li_html}<ul>`;
                }).appendTo(common_facet);

                common_facet.appendTo(facets);
            });
            resolve();
        });
    }).then(() => {
        facets.find('.facets-category-common:gt(3)').addClass('fc-hide');
        facets.append(`<div class="fccc-control-warp">
            <span class="fccc-control" id="fc-common-show">更多选项（屏幕规格,显卡类型,硬盘容量,内存容量,操作系统,Game+游戏装备）</span>
            <span class="fccc-up" id="fc-common-hide">收起&nbsp;&nbsp;</span>
        </div>`);
        let control_down = facets.find('.fccc-control').eq(0);
        let control_up = facets.find('.fccc-up').eq(0);
        let control_box = control_down.parent();
        control_down.click((e) => {
            $('.fc-hide').removeClass('fc-hide');
            control_box.addClass('show');
        })
        control_up.click((e) => {
            $('.facets-category-common:gt(3)').addClass('fc-hide');
            control_box.removeClass('show');
        });
        let priceRangeBtn = $('.facets-category-common').eq(0).find('.facet');
        priceRangeBtn.click((e) => {

            e.preventDefault();

            let val1, val2;
            if ($(e.target).text().indexOf('-') != -1) {
                [val1, val2] = $(e.target).text().trim().split('-');

            } else {
                [val1, val2] = [10000, 1000000];
            }
            $('.product-box').eq(0).html('');
            $.ajax({
                data: {
                    page: 0,
                    type: 4,
                    'low_price': val1 * 1,
                    'high_price': val2 * 1
                }
            });
        })
    })

    let prdBox = $('.product-right-box').eq(0);
    $.getJSON('../server/productLeft.json', (res) => {

        //销量排行榜
        let prd = $('<div id=prdRight-2>').appendTo(prdBox);

        let prd_item = $('<div class=prd-right-normal>').appendTo(prd);

        prd_item.append(`<h3 class=hd>${res[0].title}</h3>`);
        $('<ul class="sell-product">').html(() => {
            return res[0].lists.map((ele, index) => {
                return `<li class=active>
                                        <p class="num num${index+1}">${index+1}</p>
                                        <div class=pdetail>
                                            <p class=pic>
                                                <a class=bigD_item><img src=${ele.pic}></a>
                                            </p>    
                                            <p class=name>
                                                <a class=bigD_item>${ele.name}</a>
                                            </p>
                                            <p class=price>${ele.price}</p>
                                        </div>
                                    </li>`
            }).join('');
        }).appendTo(prd_item);

        //另外两个
        res.slice(1).forEach((ele, index) => {
            let prd = $('<div id=prdRight-' + (index + 3) + '>').appendTo(prdBox);

            let prd_item = $('<div class=prd-right-normal>').appendTo(prd);

            prd_item.append(`<h3 class=hd>${ele.title}</h3>`);
            $('<ul class=bd id=bigD_liulan>').html(() => {
                return ele.lists.map((e, index) => {
                    return `<li class=buy-items>
                                            <div class=pic>
                                                <a class=bigD_item><img src=${e.pic}></a>
                                            </div>    
                                            <div class=price>${e.price}</div>
                                            <div class=name>
                                                <a class=bigD_item>${e.name}</a>
                                            </div>
                                    </li>`
                }).join('');
            }).appendTo(prd_item)
        })

    })

    //携带信息跳转详情页
    $.ajax({
        type: "get",
        url: "../server/getProductData.php?version=2",
        data: {
            page: 0,
            type: 0
        },
        dataType: "json",
        success(response) {
            render(response.data);
            let links = $('.item-link');

            links.each((i, e) => {
                let href = './detail.html?code=' + $(e).parents('li').attr('id');
                $(e).attr('href', href);
            })
        }
    });

    //分页配置
    $.ajax({
        type: "get",
        url: "../server/getPageCount.php",
        // data: "",
        dataType: "json",
        success: function(response) {
            kkpager.generPageHtml({
                pno: 1,
                total: response[1],
                totalRecords: response[0],
                mode: 'click',
                click(n) {
                    this.selectPage(n);
                    $('.product-box').eq(0).html('');
                    $.ajax({
                        type: "get",
                        url: "../server/getProductData.php",
                        data: {
                            page: n - 1,
                            type: getType(),
                        },
                        dataType: "json",
                        success: function(response) {

                            if (response.status == 'success') {
                                render(response.data);
                            }
                        }
                    });
                }
            });
        }
    });

    let flag = true;

    $('#sort-price').click((e) => {

        //清空之前渲染的列表
        $('.product-box').eq(0).html('');
        kkpager.selectPage(1);

        let t = $(e.currentTarget);
        t.addClass('cur').siblings().removeClass('cur');

        let type;
        if (flag == true) {
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
    cancel_btn.click((e) => {
        low_price.val('¥');
        high_price.val('¥');
    })
    ok_btn.click(() => {

        let val1 = low_price.val().replace('¥', '').trim() * 1;
        let val2 = high_price.val().replace('¥', '').trim() * 1;
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

    });



})