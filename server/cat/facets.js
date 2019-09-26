var o = {};

o.brands = [];
var brand_list = $('#facets-category-brand .c-brand a');
for (let i = 0; i < brand_list.length; i++) {
    let oo = {};
    oo.style = brand_list.eq(i).prop('style').cssText.replace(/"/g, '').replace('(', '(http:').replace(')', '.png)').replace(' ', '');
    oo.title = brand_list.eq(i).attr('name');

    o.brands.push(oo);
}

o.commonFacets = [];
var common_list = $('.facets-category-common');
for (let i = 0; i < common_list.length; i++) {
    let oo = {};
    oo.key = common_list.eq(i).find('.fc-key').eq(0).text().replace("：", "");
    oo.contents = [];
    let content_list = common_list.eq(i).find('.facet');

    for (let j = 0; j < content_list.length; j++) {
        oo.contents.push(content_list.eq(j).text());
    }
    o.commonFacets.push(oo);
}