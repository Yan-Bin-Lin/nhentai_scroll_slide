// ==UserScript==
// @name         Nhentai scroll
// @namespace    https://github.com/Yan-Bin-Lin/nhentai_scroll_slide
// @version      0.1(
// @description  scroll to read picture in nhentai
// @author       Lin Yan Bin
// @match        https://nhentai.net/g/*/*/
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==
(function() {
    let ic = $("#image-container");
    let num = parseInt($("span.num-pages").first().text());
    let img = ic.find("img");
    let src = img.attr("src");
    let base = src.slice(0, src.lastIndexOf("/") + 1);
    let width = img.attr("width");
    let height = img.attr("height");
    let imgs = [];
    for (let i = 1;i <= num; i++){
        imgs.push(base + i.toString() + '.jpg');
    }

    function loadImage(imgs, width, height, target) {
        if (!imgs.length) {
            return;
        }

        let url = imgs.shift();
        $('<img src="'+ url +'">').on("load", function() {
            $(this).width(width).height(height).appendTo(target);
            loadImage(imgs, width, height, target);
        });
    }

    loadImage(imgs, width, height, '#image-container');
    
})();
