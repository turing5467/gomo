$(() => {

    //放大镜
    let zoom_box = $('.jqzoom');
    let zoom = $('.jqzoom img');
    let zoomPup = $('.jqZoomPup');
    let zoomdiv = $('.zoomdiv');
    let bigimg = $('.bigimg');
    $('.pic-small img').hover((e) => {
        // console.log(e.target);
        // console.log(e.currentTarget);
        let t = $(e.currentTarget);
        let src = t.attr('src');
        t.toggleClass('hover');
        zoom.attr('src', src.replace('_50', '_360'));
        bigimg.attr('src', src.replace('_50', '_800_pc'))
    });

    zoom_box.mouseenter((e) => {
        zoomPup.css({
            'visibility': 'visible'
        });
        zoomdiv.css('display', 'block');
    });

    zoom_box.mousemove((e) => {
        let x = e.pageX - zoom_box.offset().left;
        let y = e.pageY - zoom_box.offset().top;

        let { left, top } = offset(x, y);

        zoomPup.css({
            left,
            top
        });

        //设置右边大图left,top属性
        //倍数为800/360
        bigimg.css({
            left: -left * 2.2,
            top: -top * 2.2
        })
    })

    zoom_box.mouseleave((e) => {
        zoomPup.css('visibility', 'hidden');
        zoomdiv.css('display', 'none');
    })

    function offset(x, y) {
        // let x = e.offsetX;
        // let y = e.offsetY;
        let left;
        let top;
        if (x < 100) {
            left = 0;
        } else if (x > 260) {
            left = 160;
        } else {
            left = x - 100;
        }
        if (y < 100) {
            top = 0
        } else if (y > 260) {
            top = 160;
        } else {
            top = y - 100
        }
        return { left, top }
    }

    $('#mobtn').hover(() => {
        $(this).toggleClass('mobtnshowtop');
    })

    $('.prdmod').eq(0).find('a').addClass('select');
    $('.prdmod').on('click', 'a', (e) => {
        e.preventDefault();
        $(e.currentTarget).addClass('select');
        $(e.delegateTarget).siblings().find('a').removeClass('select');
    });

    const num_node = $('#enterQty');
    let num = 1;
    $('#addCart').click((e) => {
        num = num_node.val();
        let id = Cookie.get('userId');
        let product_code = e5.getUrlPrmt(window.location.search).code;
        let type = $('.select').eq(0).parent().index() + 1;
        $.ajax({
            type: "post",
            url: "./server/addToCart.php",
            data: {
                id,
                product_code,
                num,
                type,
                flag: false
            },
            dataType: "json",
            success: function(response) {
                if (response) {
                    window.location.href = `./add_cart_succeed.html?code=${product_code}&num=${num}&type=${type}`;
                }
            }
        });
    })

    num_node.on('input', () => {
        if (num_node.val() - 0 <= 0) {
            num_node.val(1);
        }
        if (num_node.val() == 1) {
            $('.minus').addClass('disab');
        }
        num = num_node.val();
    })

    $('.plus').click((e) => {
        num_node.val(num_node.val() - 0 + 1);
        $('.minus').removeClass('disab');
    })
    $('.minus').click((e) => {
        num_node.val(num_node.val() - 0 - 1);
        if (num_node.val() == 1) {
            $('.minus').addClass('disab');
        }
    })

})

/* 
    $('.addTo-cart').click((e) => {


        //获取当前用户id
        let id = Cookie.get('userId');
        // let id = 33;

        //获取当前商品id => php:添加至数据库,数量 加 1
        let product_code = $(e.target).parents('.product-item').attr('id');
        // let product_code = '5468';

        let num = 1;
        let type = 1;

        $.ajax({
            type: "post",
            url: "./server/addToCart.php",
            data: {
                id,
                product_code,
                num,
                type
            },
            dataType: "json",
            success: function(response) {
                if (response) {
                    window.location.href = `./add_cart_succeed.html?p_code=${product_code}&num=${num}&type=${type}`;
                }
            }
        });
    });
*/