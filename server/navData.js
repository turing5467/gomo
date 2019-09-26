let lis = document.querySelectorAll("#lisnav li h3");
let subs = document.querySelectorAll("#loading1-sync .fullcategory");
let oArr = [];
for (let i = 0; i < lis.length; i++) {
    let o = {};

    //一级菜单a标签
    o.l_titles = [];
    let oA = lis[i].querySelectorAll('a');
    for (let j = 0; j < oA.length; j++) {
        o.l_titles.push(oA[j].innerText);
    }

    //左tag => tags
    let rignt_l_tags = subs[i].querySelectorAll('.fullcategory-left .fullcategory-title a');

    o.r_l_tags = [];
    for (let j = 0; j < rignt_l_tags.length; j++) {
        o.r_l_tags.push(rignt_l_tags[j].innerHTML);
    }

    //左li  => navs  (是否class=hot)
    let rignt_l_contents = subs[i].querySelectorAll('.fullcategory-left .fullcategory-content-box .fullcategory-content');

    o.r_l_navs = [];
    for (let j = 0; j < rignt_l_contents.length; j++) {
        let oo = {};
        oo.n_l_title = rignt_l_contents[j].querySelector('.title').innerText;
        let as = rignt_l_contents[j].querySelectorAll('.list a');
        oo.r_l_contents = [];
        for (let k = 0; k < as.length; k++) {
            if (as[k].className == 'hot') {
                oo.r_l_contents.push({
                    className: 'hot',
                    text: as[k].innerText,
                    code: as[k].dataset.code
                });
            } else {
                oo.r_l_contents.push({
                    text: as[k].innerText,
                    code: as[k].dataset.code
                });
            }
        }
        o.r_l_navs.push(oo);
    }

    //右商标图 => brand_imgs
    let rignt_r_contents = subs[i].querySelectorAll('.fullcategory-right .brand a img');
    o.r_r_brand_imgs = [];
    for (let j = 0; j < rignt_r_contents.length; j++) {
        o.r_r_brand_imgs.push(rignt_r_contents[j].src);
    }

    //右大图   => big_img
    let big_img = subs[i].querySelector('.fullcategory-right .category-img img');
    if (big_img) {
        o.r_r_big_img = big_img.src;
    }
    oArr.push(o);
}