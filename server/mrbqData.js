var list = $('.lay .list_li');
var oArr = [];
for (let i = 0; i < 8; i++) {
    let o = {};
    o.src = "https:" + list.eq(i).find('img').eq(0).attr('src');
    o.price = list.eq(i).find('.p_price i').eq(0).text();
    o.del_price = list.eq(i).find('.p_price i').eq(1).text();
    o.title = list.eq(i).find('.p_name').eq(0).text();
    oArr.push(o);
}
// JSON.stringify(oArr);