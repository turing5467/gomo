var floor = $('.floor'); //len=7

var oArr = [];
for (let i = 0; i < floor.length; i++) {
    let o = {};
    o.title = floor.eq(i).find('.mtTop').eq(0).html();

    o.tab_titles = [];
    let titles = floor.eq(i).find('.tab li a');
    for (let j = 0; j < titles.length; j++) {
        o.tab_titles.push(titles.eq(j).text());
    }

    o.channel_img = "http:" + floor.eq(i).find('.mc_l img').eq(0).attr('src');
    o.channel = floor.eq(i).find('.channel_inner').get(0).outerHTML;

    let keywords = floor.eq(i).find('.keywords ul');
    o.keywords = [];
    for (let j = 0; j < keywords.length; j++) {
        let keywords_li = keywords.eq(j).find('li');
        let arr = [];
        for (let k = 0; k < keywords_li.length; k++) {
            arr.push(keywords_li.eq(k).text());
        }
        o.keywords.push(arr);
    }


    o.tab_content_1 = {}; //[[{}, {}, {}, ...], [], ...]
    let tab_content_1 = floor.eq(i).find('.main_warp .main').eq(0);

    o.tab_content_1.l_imgs = [];
    let l_imgs = tab_content_1.find('.mc_c .slider img');
    for (let j = 0; j < l_imgs.length; j++) {
        o.tab_content_1.l_imgs.push("http:" + l_imgs.eq(j).attr('src'));
    }
    o.tab_content_1.r_imgs = [];
    let r_imgs = tab_content_1.find('.mc_r img');
    for (let j = 0; j < r_imgs.length; j++) {
        o.tab_content_1.r_imgs.push("http:" + r_imgs.eq(j).attr('src'));
    }

    o.tab_contents = [];
    let tab_contents = tab_content_1.siblings();
    // console.log(tab_contents);

    for (let j = 0; j < tab_contents.length - 1; j++) {
        let arr1 = [];
        let lists = tab_contents.eq(j).find('li');
        for (let k = 0; k < lists.length; k++) {
            let oo = {};
            oo.img = "http:" + lists.eq(k).find('img').eq(0).attr('src');
            oo.title = lists.eq(k).find('.p_name').eq(0).text();
            oo.price = lists.eq(k).find('.p_price').eq(0).html();
            arr1.push(oo);
        }

        o.tab_contents.push(arr1);
    }

    oArr.push(o);
}



/*
 title       floor.eq(i).find('.mtTop').eq(0).html()
 tab_title   floor.eq(i).find('.tab li a');   //数组=>遍历
 channel     floor.eq(i).find('.channel_inner').get(0).outerHTML
 channel_img floor.eq(i).find('.mc_l img').eq(0).attr('src')
 keywords    floor.eq(i).find('.keywords ul')  //数组
                ./eq(j).find('li')  //数组
                    ./eq(k).text()
 tab_content_1  {} floor.eq(i).find('.main_warp .main').eq(0)   //对象
                {
                   l_imgs : ./$('mc_c .slider img') 数组
                    r_imgs  [] floor.eq(i).find('.mc_r img') 数组
                }
 tab_contents   [[], [], ...]
                   [] floor.eq(i).find('.main_warp .main').eq(1-len)
                        ./
                    {
                      img:  ./find('.main_inner img').eq(k).attr('src')
                      title: ./find('.p_name').eq(k).text()
                      price: ./find('.p_price').eq(k).html()
                    }
 */

l