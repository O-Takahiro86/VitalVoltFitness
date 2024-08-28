'use strict';

$(function(){

    $('section').click(function(){

        $(this).toggleClass('open');
        $(this).find('.stick').toggleClass('open');
        $(this).find('.xs-container').fadeToggle('fast');

        let scrollPos = $(this).offset().top;
        let sectionSize = $(this).height();

        if($(this).hasClass('open')){
            $('body,html').animate({scrollTop:scrollPos},500,'swing');
        }else{
            $('body,html').animate({scrollTop:scrollPos-sectionSize},500,'swing');
        }
    });

});