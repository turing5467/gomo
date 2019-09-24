var ul_list = $('#j-imgload-recomm ul');
var data = [];
for (let i = 0; i < ul_list.length; i++) {
    let arr = [];
    let li_list = ul_list.eq(i).find('li a');
    for (let j = 0; j < li_list.length; j++) {
        let o = {};
        o.img = "http:" + li_list.eq(j).find('img').eq(0).attr('src');
        o.guess_title = li_list.eq(j).find('.guess_title').text();
        o.guess_price = li_list.eq(j).find('.guess_price').html();
        arr.push(o);
    }
    data.push(arr);
}