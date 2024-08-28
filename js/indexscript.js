'use strict';

$(function(){
    // 読み込み直後にスペシャルアニメーション

    // index.htmlのメイン画像(slick setting)
    $('.slider').slick({
        autoplay: true,          // 自動再生を有効にする
        autoplaySpeed: 6000,     // 自動再生のスライド切り替え速度 (ミリ秒)
        dots: true,              // ナビゲーションドットを表示する
        arrows: true,            // 前後のナビゲーション矢印を表示する
        infinite: true,          // 無限ループを有効にする
        speed: 500,              // 切り替えアニメーションの速度 (ミリ秒)
        slidesToShow: 1,         // 表示するスライドの数
        slidesToScroll: 1,       // スクロール時に切り替わるスライドの数
        pauseOnHover: false,      // マウスホバー時に自動再生を一時停止する
        pauseOnFocus: false,      // フォーカス時に自動再生を一時停止する
        swipe: true,             // スワイプ操作を有効にする
        draggable: true          // ドラッグ操作を有効にする
    });

    // メイン
    // section#news
        // 今月を表示する
    let thisMonth = new Date().getMonth();
    $('span.this-month').text(thisMonth+1);

        // アコーディオンパネル
    $('article.beginning').click(function(){
        // パネル開閉部分
        const target = $(this);
        target.toggleClass('open');
        if(target.hasClass('open')){
            // スクロール領域を含めた高さを取得・付与する
            const openHeight = target.get(0).scrollHeight;
            target.css('height',openHeight);
        }else{
            // 高さを戻す
            target.css('height','');
        }
    });
    $('div.news-list').click(function(){
        // 指差しアイコン回転
        $(this).find('i.rotate-icon').toggleClass('rotate');
        // パネル開閉部分
        const target = $(this).children('div.news-container');
        target.toggleClass('open');
        if(target.hasClass('open')){
            // スクロール領域を含めた高さを取得・付与する
            const openHeight = target.get(0).scrollHeight;
            target.css('height',openHeight);
        }else{
            // 高さを戻す
            target.css('height','');
        }
    });
});