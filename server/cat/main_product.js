function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

var items = $('.product-lists .product-item');
var oArr = [];

for (let i = 0; i < items.length; i++) {
    let item = items.eq(i).find('.item-tab').eq(0);
    let o = {};
    o.code = item.parent().parent().attr('id');
    // o.pic = "http:" + item.find('.item-pic img').eq(0).attr('src');
    o.name = item.find('.item-pic img').eq(0).attr('alt');
    // o.big_pics = [];
    o.small_pics = [];
    let img_list = $('.imgList').eq(i).find('li img');
    for (let j = 0; j < img_list.length; j++) {
        o.small_pics.push('http:' + img_list.eq(j).attr('src'));
        // o.big_pics.push(o.small_pics[j].replace('_30', '_210'));
    }
    o.price = item.find('.item-price .price').text().trim().slice(1);
    let prom = item.find('.item-promotional-language');
    if (prom.length) {
        o.prom_text = prom.eq(0).text().trim();
    } else {
        o.prom_text = '';
    }
    o.comment = +item.find('.comment').html().match(/(\d{1,})/)[0];
    o.shop_name = item.find('.item-shop .nname').html();
    o.shop_zy_tag = item.find('.nnamezy').length ? true : false;

    o.promotion = [];
    let promo = item.find('.item-promotion .promotion-normal');
    if (promo.length) {
        o.promotion = Array.from(promo).map((e) => {
            return $(e).text();
        });
    }
    oArr.push(o)
}