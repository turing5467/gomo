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
    o.price = item.find('.item-price').text().trim();
    let prom = item.find('.item-promotional-language');
    if (prom.length) {
        o.prom_text = prom.eq(0).text().trim();
    }
    o.comment = item.find('.comment').html().replace(/"/g, '');
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