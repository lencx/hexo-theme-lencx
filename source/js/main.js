// import '../css/main.scss'
// import '../css/hello.scss'
'use strict'
// header
!function() {
    let $header = $('header')
    let $menuEl = $header.find('.menu-ico')
    let $search = $header.find('.search')
    let $menu = $header.find('.menus')
    let $winTop_1 = 0
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

!function() {
    let $timeLine = $('.archive-time-line')
    let $year = $timeLine.find('.year')
    let $month = $timeLine.find('.month')
    $year.each((i, el) => {
        let $yt = $(el).html()
        $month.each((i, el) => {
            let $mt = $(el).html()
            $timeLine.find('[class^="line-'+$yt+$mt+'"]').each(() => {
                var postNum = $timeLine.find('[class^="line-'+$yt+$mt+'"]').length
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

$(document).ready(function(){
    let $backToTop = $("#back-to-top")
    $backToTop.hide()
    $(window).on('scroll', () => {
        $(this).scrollTop() > 500
            ? $backToTop.fadeIn(1200)
            : $backToTop.fadeOut(1200)
    });
    $backToTop.on('click', (e) => {
        $("html, body").animate({scrollTop: 0}, 800)
    })
})

// $(document).ready(function(){
// 	$('article').textillate({  
// 		initialDelay: 100,
// 		loop: false,
// 		in: {
// 			effect: 'fadeInUp',
// 			delayScale: .4,
// 			delay: 6, 
// 			sync: false,
// 			shuffle: true
// 		},
// 		type: 'word'
// 	});
// });