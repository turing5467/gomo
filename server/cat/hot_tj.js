var hot_list = $('.hot-tj .hot-list .item');
var oArr = [];
for (let i = 0; i < hot_list.length; i++) {
    let o = {};
    o.pic = "http:" + hot_list.eq(i).find('.pic a img').eq(0).attr('src');
    o.name = hot_list.eq(i).find('.name a').eq(0).text();
    o.price = hot_list.eq(i).find('.price').eq(0).html();
    // o.btn
    oArr.push(o);
}