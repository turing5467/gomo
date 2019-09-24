$(document).ready(() => {
    let pre = $('.pre');
    let nex = $('.nex');

    let control_1 = $('.mrbq_body ul li');

    // let control_3 = $('.floor');

    //索引数组
    let indexs = [0, 0];

    //每日必抢区按钮
    pre.eq(0).click(() => {
        prev(control_1, indexs, 0);
    });
    nex.eq(0).click(() => {
        next(control_1, indexs, 0);
    });

    //猜你喜欢区按钮
    pre.eq(1).click(() => {
        prev($('.guess_main ul'), indexs, 1);
    });
    nex.eq(1).click(() => {
        next($('.guess_main ul'), indexs, 1);
    });

    $('.flTop').click((e) => {
        e.preventDefault();

        $(window).delay(500).scrollTop(0);
    });
    $('.fl_bottom').click(() => {

        $(window).delay(500).scrollTop(document.documentElement.scrollHeight);
    })

    //floor区按钮

    const prev = (ele, indexs, index) => {
        let len = ele.length;
        console.log(len);

        if (indexs[index] == 0) {
            indexs[index] = len - 1;
        } else {
            --indexs[index];
        }

        console.log(indexs);

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




});