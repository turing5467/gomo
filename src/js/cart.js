//渲染一家店铺


$(() => {
    //购物车渲染
    let id = Cookie.get('userId');
    $.ajax({
        type: "get",
        url: "../server/getCart.php",
        data: {
            id
        },
        dataType: "json",
        async: false,
        success: function(response) {

            //按照店铺分类
            let shops = [];
            response.forEach((ele, index) => {
                //店铺名 => 商品索引
                let flag = shops.findIndex((e) => e.shop_name == ele[4]);
                if (flag != -1) {
                    shops[flag].products.push(ele);
                } else {
                    let o = {};
                    o.shop_name = ele[4];
                    o.products = [];
                    o.products.push(ele);
                    shops.push(o);
                }
            });

            //按照名称排序,名称相同则按照单价升序
            shops.forEach((ele) => ele.products.sort((a, b) => a[1] == b[1] ? a[3] * 1 - b[3] * 1 : a[1] - b[1]));

            shops.forEach((e) => {
                renderOneShop(e);
            });
        }
    });

    $.ajaxSetup({
        url: "../server/addToCart.php",
        global: false,
        type: "POST"
    });

    let cart_list = $('.cart-list').eq(0);

    let totalItem = $('.selected-item').eq(0);
    let totalPrice = $('.selected-price').eq(0);

    //数据库相关(删除,类型改变,数量改变,结算)
    let itemNum = $('.dytest');
    let addCountBtn = $('.gui-count-add');
    let subCountBtn = $('.gui-count-sub');



    //数量变化
    itemNum.on('input change', (e) => {

        let product_code = $(e.target).parents('.cart-shop-good').attr('id');
        let num = $(e.target).val() - 0;
        let type = $(e.target).parents('.cart-shop-good').find('.cart-good-value').data('type') - 0;

        let item_price = $(e.target).parents('.cart-shop-good').find('.cart-good-real-price').data('price');


        $(e.target).parents('.cart-shop-good').find('.cart-good-amount').text(`¥ ${(num * item_price).toFixed(2)}`);

        $.ajax({
            data: {
                id,
                product_code,
                num,
                type,
                flag: 1
            }
        });

        totalItem.text(countTotalItem());
        totalPrice.text('￥' + countTotalPrice());
    });

    addCountBtn.click((e) => {

        $(e.target).parent().find('.gui-count-sub').removeClass('gui-count-disabled');
        let numItem = $(e.target).parent().find('.dytest').eq(0);
        numItem.val(numItem.val() * 1 + 1);
        let num = numItem.val() * 1;
        let product_code = $(e.target).parents('.cart-shop-good').attr('id');
        let type = $(e.target).parents('.cart-shop-good').find('.cart-good-value').data('type') - 0;

        $.ajax({
            data: {
                id,
                product_code,
                num,
                type,
                flag: 1
            }
        })
        let item_price = $(e.target).parents('.cart-shop-good').find('.cart-good-real-price').data('price');
        $(e.target).parents('.cart-shop-good').find('.cart-good-amount').text(`¥ ${(num * item_price).toFixed(2)}`);
        totalItem.text(countTotalItem());
        totalPrice.text('￥' + countTotalPrice());
    })
    subCountBtn.click((e) => {

        let num;
        let numItem = $(e.target).parent().find('.dytest').eq(0);
        if (numItem.val() > 1) {
            numItem.val(numItem.val() - 1);
            num = numItem.val() * 1;
            let product_code = $(e.target).parents('.cart-shop-good').attr('id');
            let type = $(e.target).parents('.cart-shop-good').find('.cart-good-value').data('type') - 0;

            $.ajax({
                data: {
                    id,
                    product_code,
                    num,
                    type,
                    flag: 1
                }
            })
        } else {
            numItem.val(1);
        }

        num = numItem.val();

        if (num == 1) {
            $(e.target).addClass('gui-count-disabled');
        }

        let item_price = $(e.target).parents('.cart-shop-good').find('.cart-good-real-price').data('price');
        $(e.target).parents('.cart-shop-good').find('.cart-good-amount').text(`¥ ${(num * item_price).toFixed(2)}`);
        totalItem.text(countTotalItem());
        totalPrice.text('￥' + countTotalPrice());
    });

    //删除
    let delBtn = $('.delfixed');
    delBtn.click((e) => {
        if (confirm('确定要删除选中商品吗?')) {

            // id product_code type
            let p = $(e.target).parents('.cart-shop-good').eq(0);
            let pp = $(e.target).parents('.cart-shop-goods').eq(0);

            let product_code = p.attr('id');
            let type = p.find('.cart-good-value').data('type') - 0;
            $.ajax({
                url: '../server/deleteFromCart.php',
                data: {
                    id,
                    product_code,
                    type
                },
                success(res) {
                    if (res) {
                        p.remove();

                        if (pp.children().length == 0) {
                            pp.prev().remove();
                            pp.remove();
                        }
                    }
                }
            })
        }
    });
    let delMany = $('.del-goods');
    delMany.click((e) => {
        if (confirm('确定要删除选中商品吗?')) {
            let itemToDel = $('.cart-shop-goods').find('.checkbox_chose');
            itemToDel.each((i, ele) => {
                let p = $(ele).parents('.cart-shop-good').eq(0);
                let pp = $(ele).parents('.cart-shop-goods').eq(0);

                let product_code = p.attr('id');
                let type = p.find('.cart-good-value').data('type') - 0;
                $.ajax({
                    url: "../server/deleteFromCart.php",
                    data: {
                        id,
                        product_code,
                        type
                    },
                    success(res) {
                        if (res) {
                            p.remove();

                            if (pp.children().length == 0) {
                                pp.prev().remove();
                                pp.remove();
                            }
                        }
                    }
                });
            })
            totalItem.text(countTotalItem());
            totalPrice.text('￥' + countTotalPrice());
        }
    })



    //数据库无关

    //全选按钮处理

    let checkAll = $('.checkAll');
    let checkShop = $('.checkShop');
    let checkItem = $('.checkItem');

    let shops = Array.from(checkShop);
    let items = Array.from(checkItem);

    checkAll.on('click', (e) => {
        let t = $(e.target);
        let isCheckedAll = t.hasClass('checkbox_chose');

        if (isCheckedAll) {
            deCheck(checkAll);
            deCheck(checkShop);
            deCheck(checkItem);

        } else {
            enCheck(checkAll);
            enCheck(checkShop);
            enCheck(checkItem);
        }

        // //计算价格
        // // countPrice
        totalItem.text(countTotalItem());
        totalPrice.text('￥' + countTotalPrice());
    });

    //店铺选中按钮
    checkShop.on('click', (e) => {
        let t = $(e.target).parent().find('.checkShop');
        let isShopChecked = t.hasClass('checkbox_chose');
        let cur_shop_items = t.parents('.cart-shop-header').next().find('.checkItem');

        if (isShopChecked) {
            deCheck(t);
            deCheck(cur_shop_items);
        } else {
            enCheck(t);
            enCheck(cur_shop_items);
        }

        //这时样式已经发生改变
        //所有店铺选中或有一个店铺未选中,则触发全选按钮的单击事件
        if (shops.every((e) => $(e).is('.checkbox_chose'))) {
            enCheck(checkAll);
        } else if (shops.some((e) => $(e).is('.good-checkboxs-no'))) {
            deCheck(checkAll);
        }

        totalItem.text(countTotalItem());
        totalPrice.text('￥' + countTotalPrice());
    });

    //商品选中
    checkItem.on('click', (e) => {
        let t = $(e.target);
        let isItemChecked = $(e.target).hasClass('checkbox_chose');
        let cur_shop_items = Array.from(t.parents('.cart-shop-goods').find('.checkItem'));
        let cur_shop = t.parents('.cart-shop-goods').prev().find('.checkShop');

        if (isItemChecked) {
            deCheck(t);
        } else {
            enCheck(t);
        }

        //1.如果本店商品全部选中,添加店铺全选
        //2.有一个商品未选中,取消店铺全选按钮,取消购物车全选按钮
        //3.购物车所有商品全部选中,添加购物车全选
        if (cur_shop_items.every((e) => $(e).is('.checkbox_chose'))) {
            enCheck(cur_shop);
            if (items.every((e) => $(e).is('.checkbox_chose'))) {
                enCheck(checkAll);
            }
        } else if (cur_shop_items.some((e) => $(e).is('.good-checkboxs-no'))) {
            deCheck(cur_shop);
            deCheck(checkAll);
        }

        totalItem.text(countTotalItem());
        totalPrice.text('￥' + countTotalPrice());
    })

    function enCheck(ele) {
        ele.addClass('c-i checkbox_chose').removeClass('good-checkboxs-no');
    }

    function deCheck(ele) {
        ele.addClass('good-checkboxs-no').removeClass('c-i').removeClass('checkbox_chose');
    }

    function countTotalItem() {
        let total = 0;
        checkItem.each((i, e) => {
            if ($(e).is('.checkbox_chose')) {
                total += $(e).parents('.cart-shop-good').find('.dytest').eq(0).val() * 1;
            }
        });
        return total;
    }

    function countTotalPrice() {
        let total = 0;
        checkItem.each((i, e) => {
            if ($(e).is('.checkbox_chose')) {
                total += $(e).parents('.cart-shop-good').find('.cart-good-amount').eq(0).text().trim().slice(2) * 1;
            }
        });
        return total.toFixed(2);
    }

    function renderOneShop(data) {
        let list_box = $('.cart-list').eq(0);
        let cart_shop_header = $('<div class="cart-shop-header "></div>').html(() => {
            return `
            <div class="cart-col-1">
                <div class="good-checkboxs-no checkShop" style="margin-top: 13px;">       
                    <input type="checkbox" style="display: none;">      
                </div>
            </div>
            <div class="cart-col-2">
                <a href="//mall.gome.com.cn/80006441/" title="永兴电脑专营店" class="black cart-shop-name cart-shop-name-fixed " target="_blank">${data.shop_name}</a>                             <span style="display: inline-block" class="cart-kf cart-header-kf customerServiceAshes" data-shopname="${data.shop_name}">      
                    <i style="cursor: pointer;vertical-align: middle;" class="c-i c-kf-on"></i>      
                    <span class="contact-customer-word contact-font">在线客服</span>
                </span>
            </div>
            `;
        });
        cart_shop_header.appendTo(list_box);
        let cart_shop_goods = $('<div class="cart-shop-goods cart-shop-goods-normal"></div>').html(() => {
            return data.products.map((ele) => {
                return `<div class="cart-shop-good clearfix  cart-shop-good-common" id=${ele[0]}>
                    <div class="cart-col-1 border-top ">
                        <div class="good-checkboxs-no checkItem">        
                            <input type="checkbox" name="good" style="display: none;">
                        </div>
                    </div>
                    <div class="cart-col-2" style="height: 82px;">
                        <a href="./detail.html?code=${ele[0]}" target="_blank" class="g-img">
                            <img src=${ele[2].split(',')[0].replace('_30','_80')} alt="">           </a>  </div>  <div class="fl">   <div class="clearfix">    <div style="" class="cart-col-3">     <div class="cart-good-name">            <a href="./detail.html?code=${ele[0]}" target="_blank" title="${ele[1]}">${ele[1]}(${ele[6].split(',')[ele[7]-1]})</a>     </div>     <div class="support-server clearfix">                   <i class="c-i seven border-radius-icon" title="支持7天无理由退货"></i>                 </div>                             </div>                  
                            <div class="cart-col-8">
                                <div class="cart-good-pro">
                                    <div class="cart-saleprops-text">
                                        <div class="cart-salesPro-item">              <span class="cart-good-key" title="版本">版本</span>                          <span class="cart-good-value" data-type=${ele[7]} title="${ele[6].split(',')[ele[7]-1].trim()==""?ele[1]:ele[6].split(',')[ele[7]-1]}">：${ele[6].split(',')[ele[7]-1].trim()==""?ele[1]:ele[6].split(',')[ele[7]-1]}</span>                      </div>                                        </div>                               <div class="cart-coupon cart-modify-saleprops">                                     <div class="cart-coupon-box" gui-popupbox="">                                          <div class="js-show-salepropsBox">                  </div></div></div></div></div>            <!--sales property -->
                                        <div class="cart-col-4 cart-price-height47">     <div class="cart-good-real-price " data-price=${ele[3]}>             <!--主品-->       ¥&nbsp;${ele[3]}                    </div>               <div class="red">           </div>             </div>   <div class="cart-col-5">                                                                <div class="gui-count cart-count">
                                        <a href="javascript:;" class="gui-count-btn gui-count-sub ${ele[8]=="1"?'gui-count-disabled':''}">-</a>
                                        <a href="javascript:;" class="gui-count-btn gui-count-add">+</a>
                                        <div class="gui-count-input">
                                            <input  class="dytest " type="text" value="${ele[8]}">
                                        </div></div>                           </div>  <div class="cart-col-6 ">      <div class="cart-good-amount">    ¥&nbsp;${(ele[3]*ele[8]).toFixed(2)}       </div>    </div>  </div>  <div class="cart-good-box"></div>  </div>  <div class="cart-col-7">       <div class="cart-good-fun delfixed">     <a href="javascript:;" >     删除     </a>    </div>                         </div>          </div>`;
            }).join('');
        });
        cart_shop_goods.appendTo(list_box);

    }
})