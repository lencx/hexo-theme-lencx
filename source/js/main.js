'use strict'
/**
 * Random Color
 * @author lencx
 * @param {Number} saturation => 0 - 100
 * @param {Number} lightness => 0 - 100
 * @return {String} hsla()
 */
function randomColor (s, l) {
    let deg, random, alpha
    deg = Math.ceil(Math.random()*360)
    random = Math.random()
    alpha = random < .4 ? .7 : random
    return 'hsla('+deg+', '+s+'%, '+l+'%,'+alpha+')'
}
/**
 * Unique values in an array
 * @author lencx
 * @param {Array} arr
 */
function unique(arr) {
    return arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
}

// header 
!function() {
    // menu
    let $header, $menuEl, $search, $menu, $winTop_1
    $header = $('header')
    $menuEl = $header.find('.menu-ico')
    $search = $header.find('#search')
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
            if(!$header.find('#search input').is(':focus')) $header.fadeOut(1000)
        } else if ($winTop_2 < $winTop_1) {
            $header.fadeIn(800)
        }
        $winTop_1 = $(window).scrollTop()
    })
}()

// time-line
$(function() {
    let $timeLine, $year,  $month
    $timeLine = $('.archive-time-line')
    $year = $timeLine.find('.year')
    $month = $timeLine.find('.month')
    $year.each((i, el) => {
        $($year[i]).parent().css('border', 'none')
        let $yt = $(el).html()
        $month.each((i, el) => {
            let $mt = $(el).attr('date-m')
            $timeLine.find('[class^="line-'+$yt+$mt+'"]').each(() => {
                let postNum = $timeLine.find('[class^="line-'+$yt+$mt+'"]').length
                $('.date-'+$yt+$mt+' .num').html(postNum)
            })
        })
        $(el).on('click', () => {
            $timeLine.find('[class^="line-'+$yt+'"]').each((i, el) => {
                // $(el).slideToggle(1000)
                $(el).toggle(800)
            })
        })
    })
})

// post-toc
$(function() {
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
})

$(function(){
    let $backToTop = $("#back-to-top")
    $backToTop.hide()
    $(window).on('scroll', () => {
        $(this).scrollTop() > 300
            ? $backToTop.fadeIn(900)
            : $backToTop.fadeOut(800)
    });
    $backToTop.on('click', (e) => {
        $("html, body").animate({scrollTop: 0}, 800)
    })
})

// code theme
$(function() {
    let $figure = $('figure')
    let $theme = '<span class="code-theme">theme[white]<span>'
    $figure.append($theme)
    let themeList = $figure.find('.code-theme')
    $figure.addClass('black')
    themeList.each(i => {
        $(themeList[i]).html('theme[black]')
        $(themeList[i]).on('click', () => {
            $(themeList[i]).parent().toggleClass('black')
            $(themeList[i]).parent().hasClass('black')
                ? $(themeList[i]).html('theme[black]')
                : $(themeList[i]).html('theme[white]')
        })
    })
})

// fancybox
$(function(){
    let $postImg = $('article').find('img')
    $postImg.each(i => {
        let _this, src, title
        _this = $($postImg[i])
        src = $(_this).attr('src')
        title = $(_this).parents('article').find('.post-title').text()
        _this.wrap('<a data-fancybox="'+ title +'" href="'+ src +'"></a>')
        // data-width="2048" data-height="1365"
    })
    $('[data-fancybox]').fancybox({
        image : {
            protect: true
        }
    })
})

// tagCloud font color
$(function(){
    let $tag = $('.tagCloud').find('a')
    $tag.each((i) => {
        let fontSize, vertical, rx, ry, x, y, style
        // console.log(randomColor(65, 72))
        // console.log($($tag[i]).css('font-size').split('px')[0])
        fontSize = $($tag[i]).css('font-size').split('px')[0]
        rx = Math.ceil(Math.random()*10)
        ry = Math.ceil(Math.random()*10)

        x = rx<4?rx+'px':-2+'px '
        y = ry<4?ry+'px':-1+'px '
        vertical = fontSize < 28
            ? Math.random()>.5?Math.ceil(Math.random()*16):-3
            : ''
        style = {
            'box-shadow': 'inset '+x+y+'8px '+randomColor(70, 60),
            'border-radius': fontSize < 24 ? Math.ceil(Math.random()*8) : Math.ceil(Math.random()*12),
            'color': randomColor(70, 60),
            'vertical-align': vertical
        }
        $($tag[i]).css(style)
    })
})

// tags icon
$(function() {
    let $tags, tagList, tagArr
    $tags = $('.post-meta .tag')
    tagList = []
    $tags.each(i => {
        let _this = $($tags[i])
        tagList.push(_this.html())
    })
    tagArr = unique(tagList)
    for(let i=0, len=tagArr.length; i<len; i++) {
        let _this = tagArr[i]
        let c = randomColor(80, 60)
        $tags.each(j => {
            let __this = $($tags[j])
            if(__this.html() === _this) {
                let deg = Math.random() > .5
                    ? -Math.ceil(Math.random()*4)
                    : Math.ceil(Math.random()*12)
                __this.css({
                    'background': c,
                    'transform': 'rotate('+deg+'deg)'
                })
                __this.find('i').css('background', c) 
            }
        })
    }
})

// disqus loaded error
!function() {
    setTimeout(() => {
        if($('.post-comment #disqus_thread').html() === '') $('.post-comment #disqus-loader-error').fadeIn(2000)
    }, 3000)
    setTimeout(() => {
        if($('.post-comment #disqus_thread').html() !== '') $('.post-comment #disqus-loader-error').remove()
    }, 10000)
}()


// sidebar archives
$(function() {
    try {
        $('.sidebar').css('display') === 'none' ? $('.sidebar').remove() : ''
        const MonthArr = ['January','February','March','April','May','June','July','August','September','October','November','December']
        let $archives = $('.archives')
        let $el = $archives.find('.archives-data')
        let data = $el.attr('data')
        let url = $el.attr('data-uri')+'/'
        // console.log(data.slice(1).split(','))
        // console.log(url)
        let arr = data.slice(1).split(',')

        let tmp = ''
        let count = 0
        let newArr = []
        for(let i=0,len=arr.length; i<len; i++) {
            if(arr[i] != -1) {
                tmp = arr[i]
                for(let j=0,len2=arr.length; j<len2; j++) {
                    if(tmp === arr[j]) {
                        count++
                        arr[j] = -1
                    }
                }
                newArr.push(tmp+','+count)
                count = 0
            }
        }
        
        // year
        let yArr = []
        for(let i=0,len=newArr.length; i<len; i++) {
            // console.log(newArr[i])
            // let y = newArr[i].split(',')
            let y = newArr[i].split(',')[0].slice(0, 4)
            // console.log(y)
            yArr.push(y)
        }
        let archiveY = ''
        for(let i=0,len=unique(yArr).length; i<len; i++) {
            archiveY += '<div class="y'+unique(yArr)[i]+'"><h3 class="archive-year">'+unique(yArr)[i]+'<i class="fa"></i></h3></div>'
        }
        $archives.append(archiveY)

        // year => archive list
        for(let i=0,len=unique(yArr).length; i<len; i++) {
            let _this = unique(yArr)[i]
            // console.log(_this)
            let li = ''
            for(let i=0,len=newArr.length; i<len; i++) {
                let __this = newArr[i]
                if((new RegExp(_this)).exec(__this.split(',')[0])) {
                    // console.log(__this)
                    let a = __this.split(',')[0].slice(4, 6)
                    if (/^0/.test(a)) a = a.slice(1)
                    // console.log(MonthArr[parseInt(a)-1])
                    li += '<li><a href="'+url+_this+'#'+__this.split(',')[0]+'">'+MonthArr[parseInt(a)-1]+'</a><span class="num">('+__this.split(',')[1]+')</span></li>'
                }
            }
            // console.log(li)
            $archives.find('.y'+_this).append('<ul class="y-'+_this+'">'+li+'</ul>')
        }
        $archives.find('.archives-data').remove()

        let $year = $archives.find('.archive-year')
        // console.log($year)
        $year.each(i => {
            let _this = $($year[i])
            _this.on('click', () => {
                _this.parent().find('ul').toggle(800)
                _this.toggleClass('on')
            })
        })
    } catch (e) {
        // console.log(e);
    }
})

// sidebar scroll
// $(function() {
//     let $sidebar = $('aside.sidebar')
//     let sidebarTop = $sidebar.offset().top
//     let state = {
//         start: {
//             'position': 'fixed',
//             'top': '60px',
//             'right': '50px',
//             'overflower': 'auto',
//             'height': '80vh',
//             'overflow-y': 'scroll',
//             'bottom': '50px'
//         },
//         end: {
//             'position': 'absolute',
//             'top': '30px',
//             'right': 0,
//             'height': '100vh',
//             'overflow': 'hidden'
//         }
//     }
//     $(window).on('scroll', () => {
//         let scrollTop = $(window).scrollTop()
//         scrollTop > sidebarTop
//             ? $sidebar.css(state.start)
//             : $sidebar.css(state.end)
//     })
// })