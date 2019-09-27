var o = {};

o.code = 'gm-' + window.location.pathname.slice(1).replace('.html', '');
o.product_num = o.code.split('-')[2].slice(3)

var pics = $('.pic-small img');
o.mini_pics = [];
o.big_pics = [];
o.magnify_pics = [];
for (let i = 0; i < pics.length; i++) {
    let src = "http:" + pics.eq(i).attr('src');
    o.small_pics.push(src);
    o.big_pics.push(src.replace('_50', '_360'));
    o.magnify_pics.push(src.replace('_50', '_800_pc'));
}

o.yjhx_tag = $('.yijiuhuanxin a').text();
o.baina_tag = $('.baina a').text(); //dn
o.guanjia_tag = $('.guanjia a').text();
o.types = [];

var prd_box = $('.prdmod a');
for (let i = 0; i < prd_box.length; i++) {
    o.types.push(prd_box.eq(i).data('alt'));
}