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

    $('.prdmod').on('click', 'a', (e) => {
        e.preventDefault();
        $(e.currentTarget).addClass('select');
        $(e.delegateTarget).siblings().find('a').removeClass('select');
    })
})