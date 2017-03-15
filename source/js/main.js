// import '../css/main.scss'
'use strict'
// header 
!function() {
    // menu
    let $header, $menuEl, $search, $menu, $winTop_1
    $header = $('header')
    $menuEl = $header.find('.menu-ico')
    $search = $header.find('.search')
    $menu = $header.find('.menus')
    $winTop_1 = 0
    function preventDefault(e) {
        e.preventDefault();
    }
    $menuEl.on('click', () => {
        $menuEl.toggleClass('active')
        $search.toggleClass('active')
        $menu.toggleClass('active')
        $menuEl.hasClass('active')
            ? $(window).on('wheel', preventDefault)
            : $(window).off('wheel', preventDefault)
    })
    // scroll => header [show|hide]
    $(window).on('scroll', () => {
        let $winTop_2 = $(window).scrollTop()
        if ($winTop_2 > $winTop_1 && $winTop_2 > 500) {
            $header.fadeOut(1000)
        } else if ($winTop_2 < $winTop_1) {
            $header.fadeIn(800)
        }
        $winTop_1 = $(window).scrollTop()
    })
}()

// time-line
!function() {
    let $timeLine, $year,  $month
    $timeLine = $('.archive-time-line')
    $year = $timeLine.find('.year')
    $month = $timeLine.find('.month')
    $year.each((i, el) => {
        let $yt = $(el).html()
        $month.each((i, el) => {
            let $mt = $(el).html()
            $timeLine.find('[class^="line-'+$yt+$mt+'"]').each(() => {
                let postNum = $timeLine.find('[class^="line-'+$yt+$mt+'"]').length
                $('.date-'+$yt+$mt+' .num').html(postNum)
            })
        })
        $(el).on('click', () => {
            $timeLine.find('[class^="line-'+$yt+'"]').each((i, el) => {
                $(el).slideToggle(1000)
            })
        })
    })
}()

// post-toc
!function() {
    // scroll => toc[show|hide]
    const SPAC = 80
    let $toc, $foot, maxScrollTop, H, $tocLink, $headerLink, $headerLinkTop, $tocTitle, $tocEl

    $toc = $('.post-toc')
    $foot = $('.post-foot')
    $toc.length
        // ? maxScrollTop = $foot.offset().top - $toc.height()
        ? maxScrollTop = $foot.offset().top
        : false
    $(window).on('scroll', () => {
        let scrollTop = $(window).scrollTop()
        scrollTop > maxScrollTop
            ? $toc.fadeOut()
            : $toc.fadeIn()
    })

    // scroll => toc status
    H = 100
    $tocLink = $toc.find('.toc-link')
    $headerLink = $('.post-content .headerlink')
    $headerLinkTop = $.map($headerLink, (link) => {
        return $(link).offset().top
    })

    // console.log($tocLink)
    // console.log($headerLinkTop)
    $(window).on('scroll', () => {
        let scrollTop = $(window).scrollTop()
        for(let i=0, len=$tocLink.length; i<len; i++) {
            let isLastOne = i+1 === len
            let currentTop = $headerLinkTop[i] - H
            let nextTop = isLastOne ? Infinity : $headerLinkTop[i+1] - H
            currentTop < scrollTop && scrollTop <= nextTop
                ? $($tocLink[i]).addClass('active')
                : $($tocLink[i]).removeClass('active')
        }
    })

    // toc list[on|off]
    $tocTitle = $toc.find('#toc-title')
    $tocEl = $toc.find('ol.toc')
    $tocTitle.on('click', () => {
        $tocTitle.toggleClass('off')
        $tocEl.slideToggle(800)

        let $i, iDown, iUp
        $i = $tocTitle.find('i')
        iDown = 'fa-chevron-circle-down'
        iUp = 'fa-chevron-circle-up'
        if($tocTitle.hasClass('off')) {
            $i.removeClass(iDown)
            $i.addClass(iUp)
        } else {
            $i.removeClass(iUp)
            $i.addClass(iDown)
        }
    })
}()

$(document).ready(function(){
    let $backToTop = $("#back-to-top")
    $backToTop.hide()
    $(window).on('scroll', () => {
        $(this).scrollTop() > 500
            ? $backToTop.fadeIn(900)
            : $backToTop.fadeOut(800)
    });
    $backToTop.on('click', (e) => {
        $("html, body").animate({scrollTop: 0}, 800)
    })
})

!function() {
    let $figure = $('figure')
    let $theme = '<span class="theme">theme[white]<span>'
    $figure.append($theme)
    let themeList = $figure.find('.theme')
    themeList.each(i => {
        $(themeList[i]).on('click', () => {
            $(themeList[i]).parent().toggleClass('black')
            $(themeList[i]).parent().hasClass('black')
                ? $(themeList[i]).html('theme[black]')
                : $(themeList[i]).html('theme[white]')
        })
    })
}()

// TODO: images
// $(document).ready(function(){
//     let $postImg = $('article img')
//     console.log($postImg)
//     $postImg.each(i => {
//         $($postImg[i]).attr('data-fancybox', '')
//     })
// })