$(document).ready(() => {

    let pre = $('.pre');
    let nex = $('.nex');


    //索引数组
    let indexs = [0, 0];

    //每日必抢区按钮
    pre.eq(0).click(() => {
        //该选择器无法保存(不可写在外面),因为渲染是异步的
        prev($('.mrbq_body ul li'), indexs, 0);
    });
    nex.eq(0).click(() => {
        next($('.mrbq_body ul li'), indexs, 0);
    });

    //猜你喜欢区按钮
    pre.eq(1).click(() => {
        prev($('.guess_main ul'), indexs, 1);
    });
    nex.eq(1).click(() => {
        next($('.guess_main ul'), indexs, 1);
    });

    const prev = (ele, indexs, index) => {
        let len = ele.length;

        if (indexs[index] == 0) {
            indexs[index] = len - 1;
        } else {
            --indexs[index];
        }

        ele.eq(indexs[index]).css({
            display: 'block'
        }).siblings().css({
            display: 'none'
        });
    }
    const next = (ele, indexs, index) => {

        let len = ele.length;

        if (indexs[index] == len - 1) {
            indexs[index] = 0;
        } else {
            ++indexs[index];
        }

        ele.eq(indexs[index]).css({
            display: 'block'
        }).siblings().css({
            display: 'none'
        });
    }

    //每日必抢
    let ele = $('.mrbq_body ul').eq(0);

    $.getJSON('../server/mrbq.json', function(res) {
        let count = 4;
        let len = res.length;
        let group = Math.ceil(len / count);
        for (let i = 0; i < group; i++) {
            let j = i * count;
            let html = res.slice(j, j + count).map((ele, index) => {
                return `<div class="list_li fl ">
                            <a href="# ">
                                <img src=${ele.src}>
                                <div class="price ">
                                    <i>${ele.price}</i>
                                    <i class="del ">${ele.del_price}</i>
                                </div>
                                <p class="name ">${ele.title}</p>
                            </a>
                        </div>`
            });
            $('<li class="clearfix ">').html(html).appendTo(ele);
        };
    })

    //猜你喜欢
    let guess_main = $('.guess_main');
    new Promise((resolve) => {
        $.getJSON('../server/guess.json', (data) => {

            for (let i = 0; i < data.length; i++) {
                $('<ul>').html(() => {
                    return data[i].map((ele) => {
                        return `<li>
                                    <a href="# ">
                                        <img src=${ele.img}>
                                        <p class=guess_title>${ele.guess_title}
                                        </p>
                                        <p class="guess_price ">
                                            ${ele.guess_price}
                                        </p>
                                    </a>
                                </li>`
                    })
                }).appendTo(guess_main);
            }
            resolve();
        })
    }).then(() => {
        guess_main.find('ul').eq(0).css({
            display: 'block'
        })
    });

    //吸顶搜索框
    $('.search-box').clone().appendTo($('.stick-nav .w1200-bg'));

    //登录注册标签 <=> 退出
    let id = Cookie.get('userId');
    $.ajax({
        type: "get",
        url: "../server/getUserName.php",
        data: {
            id
        },
        dataType: "json",
        success: function(response) {
            if (response.status == 'success') {
                $('.user-name').eq(0).text(response.data[0].username);
                $('.top-left').eq(0).prepend('<a class=fl href="./index.html">国美首页</a>');
            } else {
                $('.logout').eq(0).remove();
                $('.top-left').eq(0).append('<a href="./login.html">登陆</a><a class="gome-link-register" href="./register.html">注册有礼<i></i></a>');
            }
        }
    });

    $('.logout a').click((e) => {
        e.preventDefault();
        Cookie.remove('userId');
        window.location.href = './login.html';
    })

    //购物车数量
    $.ajax({
        type: "get",
        url: "../server/getCart.php",
        data: {
            id
        },
        dataType: "json",
        success: function(response) {

            $('#commerceItemQuantityId').html(response.length);
            if (response.length != 0) {
                $('.shop-car').addClass('havecount');
            }
        }
    });

    //二级导航
    let navFirst = $('.nav-first');
    $.getJSON('../server/nav.json?version=1', function(res) {
        //一级菜单
        let html = res.map(function(ele, index) {
            let ahtml = ele.l_titles.map(
                (e) => {
                    return `<a href="./">${e}</a>`;
                }
            ).join('');

            //二级菜单

            //标签
            let tag_html = ele.r_l_tags.map((e, index) => {
                return `<a href="#" class="sec-tag ">${e}</a>`;
            }).join('');
            let tagHTML = `<div class="sec-tags clearfix ">${tag_html}</div>`

            let list_html = ele.r_l_navs.map(
                (e, index) => {
                    let title = `<div class="title">${e.n_l_title}</div>`;
                    let list = e.r_l_contents.map(
                        (ee, index) => {

                            if (ee.className) {
                                return `<a class="hot " href="./cat.html?intcmp=${ee.code}" code=${ee.code}>${ee.text}</a>`
                            } else {
                                return `<a href="./cat.html?intcmp=${ee.code}" code=${ee.code}>${ee.text}</a>`;
                            }
                        }
                    ).join('');
                    list = `<div class=list>${list}</div>`
                    return `<div class=sec-list>${title+list}</div>`;
                }
            ).join('');
            let listHTML = `<div class=sec-lists>${list_html}</div>`;

            let brand_img_html = ele.r_r_brand_imgs.map(
                (e, index) => {
                    return `<a href="javascript:;"><img src=${e}></a>`
                }
            ).join('');
            let img_html = `<div class="top_img_box ">${brand_img_html}</div>`;

            if (ele.r_r_big_img) {
                img_html += `<div class="bottom_img_box">
                <a href="# ">
                    <img src=${ele.r_r_big_img}>
                </a>
            </div>`;
            }
            let imgHTML = `<div class="sec-right-box clearfix ">${img_html}</div>`;

            let secHTML = `<div class="nav-second clearfix ">${tagHTML+listHTML+imgHTML}</div>`;


            return `<li>${ahtml+secHTML}</li>`;
        });
        navFirst.html(html);
        navFirst.clone(true).appendTo($('.top-nav-l'));
    });



    //轮播图
    $('#slide').enCarousel({
        _width: 750,
        _height: 450,
        nextText: '>',
        prevText: '<',
        fade: 1000,
        time: 3000,
        pagelocat: true
    });

    //倒计时
    let hour = $('.hour').eq(0);
    let minute = $('.minute').eq(0);
    let second = $('.second').eq(0);
    let start = new Date();
    let end = new Date();
    end.setHours(end.getHours() + 3);
    let {
        h,
        m,
        s
    } = e5.getEndTime(start, end);
    hour.text(h.toString().padStart(2, '0'))
    minute.text(m.toString().padStart(2, '0'))
    second.text(s.toString().padStart(2, '0'))
    window.setInterval(() => {
        start = new Date();
        let {
            h,
            m,
            s
        } = e5.getEndTime(start, end);
        hour.text(h.toString().padStart(2, '0'))
        minute.text(m.toString().padStart(2, '0'))
        second.text(s.toString().padStart(2, '0'))
    }, 1000);


    //滚动动画函数
    let timer = null;

    function elevatorScroll(height, step = 10) {

        timer && clearInterval();
        timer = setInterval(() => {
            let top = $(document).scrollTop();
            // step = top < height ? step : -step;
            if (top < height) {

                if (top + step < height) {
                    $(document).scrollTop(top + step);
                } else {
                    $(document).scrollTop(height);
                }

            } else {
                if (top - step > height) {
                    $(document).scrollTop(top - step);
                } else {
                    $(document).scrollTop(height);
                }
            }
            if (top == height) {
                clearInterval(timer);
            }
        }, 1);
    }

    //楼层渲染
    new Promise((resolve) => {
        $.getJSON('../server/floor.json', function(res) {
            $('.floors').eq(0).html(
                function() {
                    return res.map((ele, index) => {
                        let floor = $('<div class="floor "></div>');

                        //楼层头部
                        let mt = $('<div class=mt></div>');

                        $('<div class=mtTop></div>').html(ele.title).appendTo(mt).appendTo(mt);

                        $('<ul class=tab></ul>').html(function() {
                            return ele.tab_titles.map((e, index) => {
                                return `<li><a href=#>${e}</a></li>`
                            }).join('');
                        }).appendTo(mt);

                        //楼层中间
                        let mc = $('<div class=mc></div>');

                        let mc_l = $('<div class=mc_l></div>');
                        $(`<a class=mc_l_img><img src=${ele.channel_img}></a>`).appendTo(mc_l);

                        let keyAll = $('<div class=keyAll></div>');

                        $('<div class=channelbg></div>').html(`<div class=channel>${ele.channel}</div>`).appendTo(keyAll);
                        $('<div class="keywords"></div>').html(
                            function() {
                                return ele.keywords.map((e) => {
                                    let ul = $('<ul>').html(e.map((ee) => {
                                        return `<li><a href="#">${ee}</a></li>`
                                    }).join(''));

                                    return ul.get(0).outerHTML;
                                }).join('');
                            }
                        ).appendTo(keyAll);
                        keyAll.appendTo(mc_l);

                        mc_l.appendTo(mc);

                        let main_wrap = $('<div class=main_wrap></div>');

                        let main_1 = $('<div class=main></div>');
                        let mc_c = $('<div class=mc_c></div>').html(() => {
                            let li_html = ele.tab_content_1.l_imgs.map((e) => {
                                return `<li>
                                        <a href="javascript:; ">
                                            <img src=${e}>
                                        </a>
                                        </li>`
                            }).join('');
                            return `<ul class=slider>${li_html}</ul>`
                        }).appendTo(main_1);


                        let mc_r = $('<div class=mc_r></div>').html(() => {
                            let li_html = ele.tab_content_1.r_imgs.map((e) => {
                                return `<li>
                                        <a href="javascript:; ">
                                            <img src=${e}></a>
                                        </li>`
                            }).join('');
                            return `<ul class=mc_r_inner>${li_html}</ul>`;
                        }).appendTo(main_1);


                        main_1.appendTo(main_wrap);


                        ele.tab_contents.forEach((e) => {
                            $('<div class=main>').html(
                                () => {
                                    let li_html = e.map((ee) => {
                                        return `<li>
                                                <a href="# ">
                                                    <img src=${ee.img} alt=${ee.title}>
                                                    <p class="p_name ">${ee.title}
                                                    </p>
                                                    <p class="p_price ">${ee.price}
                                                    </p>
                                                </a>
                                                </li>`
                                    }).join('');
                                    return `<ul class=main_inner>${li_html}</ul>`
                                }
                            ).appendTo(main_wrap);
                        });
                        main_wrap.append(`<div class=page_slider><p class=page_down><a href=javascript:; class=slider_next></a><span class=next></span></p></div>`);
                        main_wrap.appendTo(mc);

                        mt.appendTo(floor);
                        mc.appendTo(floor);

                        return floor.get(0).outerHTML;

                    }).join('');
                }
            );
            resolve();
        });
    }).then(() => {
        //楼层选项卡
        $('.tab').each((index, ele) => {
            $(ele).find('li').eq(0).addClass('active');
        });

        let arr = new Array($('.tab').length).fill(0);
        $('.tab li').on('mouseenter', (e) => {
            let t = e.currentTarget;

            $(t).addClass('active').siblings().removeClass('active');
            let index = $(t).index();

            $(t).parents('.floor').find('.main').eq(index).css('display', 'block').siblings('.main').css('display', 'none');

            arr[$(t).parents('.floor').index()] = index;

        });

        $('.main').on('click', '.next', (e) => {
            e.preventDefault();
        });


        let floor = $('.floor');
        let nexts = $('.slider_next');


        $('.page_slider').click((e) => {

            let floor_index = $(e.target).parents('.floor').index();
            let floor_tab_len = floor.eq(floor_index).find('.tab li').length;


            if (arr[floor_index] == floor_tab_len - 1) {
                arr[floor_index] = 0;
            } else {
                ++arr[floor_index];
            }
            $('.tab').eq(floor_index).find('li').eq(arr[floor_index]).trigger('mouseenter');

        });


        //滚动条事件
        let elevator = $('#elevator');
        let handler = $('.handler');
        let stickNav = $('.stick-nav');

        let floor_scrollTop = Array.from(floor.map((index, ele) => {
            return $(ele).offset().top;
        }));
        //[1877, 2418, 2959, 3500, 4041, 4582, 5123]

        function scrollFn() {
            let w_top = $(window).scrollTop();
            let f0 = floor_scrollTop[0];
            let fl = floor_scrollTop[floor_scrollTop.length - 1] + 300;

            if (w_top >= f0 && w_top <= fl) {
                elevator.css('display', 'block');

                if (window.innerWidth < 1200) {
                    elevator.css('display', 'none');
                }

                let index = floor_scrollTop.findIndex((ele, index) => floor_scrollTop[index + 1] >= w_top);
                handler.eq(index).addClass('current').siblings().removeClass('current');

            } else if (w_top >= 700) {
                stickNav.css('display', 'block');
                elevator.css('display', 'none');
            } else if (w_top < 700) {
                stickNav.css('display', 'none');
                elevator.css('display', 'none');
            }
        }

        $(window).scroll(e5.throttle(scrollFn, 100));
        $(window).resize(e5.throttle(() => {
            if (window.innerWidth < 1200) {
                elevator.css('display', 'none');
            }
        }, 500));


        handler.on('click', 'a', (e) => {
            e.preventDefault();
            let index = $(e.currentTarget).parent().index();

            elevatorScroll(floor_scrollTop[index] + 1, 30);

        });

        $('.flTop a').click((e) => {
            e.preventDefault();
            elevatorScroll(0, 30);
        });

        $('.fl_bottom a').click((e) => {
            e.preventDefault();

            //底部: 文档长度 - 窗口长度
            elevatorScroll($(document).innerHeight() - window.innerHeight, 20);
        })
    })



});