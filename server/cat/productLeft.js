var o = [];
var weekTop = $('#bigD_weekTop');

var sell_products = {};

sell_products.title = weekTop.siblings().text();
sell_products.lists = [];
var sell_list = weekTop.find('.active');
for (let i = 0; i < sell_list.length; i++) {
    let oo = {};
    oo.pic = "http:" + sell_list.eq(i).find('.pic img').eq(0).attr('src');
    oo.name = sell_list.eq(i).find('.name').text();
    oo.price = sell_list.eq(i).find('.price').html();
    sell_products.lists.push(oo);
}
o.push(sell_products);

var prd_r3 = $('#prdRight-3');
var prd_r4 = $('#prdRight-4');

var prd = [prd_r3, prd_r4];
prd.forEach((ele) => {
    let oo = {};
    oo.title = ele.find('.hd').text();
    oo.lists = [];
    let list = ele.find('.buy-items');
    for (let i = 0; i < list.length; i++) {
        let oO = {};
        oO.pic = "http:" + list.eq(i).find('.pic img').eq(0).attr('src');
        oO.name = list.eq(i).find('.name').eq(0).text();
        oO.price = list.eq(i).find('.price').eq(0).html();
        oo.lists.push(oO);
    }
    o.push(oo);
})