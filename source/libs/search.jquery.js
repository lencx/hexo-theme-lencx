'use strict';
const ROOT = window.location.origin + window.BLOG.ROOT
const ATOM = ROOT + 'search.json' || ROOT + 'content.json'
let template = '<template id="searchTpl"><li class="item"><a href="{path}"><h3 class="search-title" title="{title}">{title}</h3><div class="tags">{tags}</div><time class="time">{date}</time></a></template>'
$('#search').append(template)
let searchTpl = $('#searchTpl').html()
$(function() {
    let $input = $('#search input')
    $input.on('keyup', () => {
        let _val = $input.val()
        search(_val)
    })
})
function loadData(cb) {
    $.ajax({
        url: ATOM,
        dataType: 'json',
        success: cb
    })
}
function matcher(post, regExp) {
    return regExp.test(post.title)
        || post.tags.some(tag => {
                return regExp.test(tag.name)
            })
        || regExp.test(post.text)
}
function tpl(html, data) {
    return html.replace(/\{\w+\}/g, str => {
        let prop = str.replace(/\{|\}/g, '')
        return data[prop] || ''
    })
}
function render(data, key) {
    let searchHtml = ''
    if(data.length) {
        searchHtml = data.map(post => {
            return tpl(searchTpl, {
                // title: post.title,
                title: post.title.replace(post.title.match(new RegExp(key, 'gmi')), '<em>'+post.title.match(new RegExp(key, 'gmi'))+'</em>'),
                path: ROOT + post.path,
                // date: new Date(post.date).toLocaleDateString(),
                date: post.date,
                tags: post.tags.map(tag => {
                    // return '<span>'+tag.name+'</span>'
                    return '<span>'+tag.name.replace(tag.name.match(new RegExp(key, 'gmi')), '<em>'+tag.name.match(new RegExp(key, 'gmi'))+'</em>')+'</span>'
                }).join('')
            })
        }).join('')
        // console.log(searchHtml)
    } else {
        searchHtml = '<li class="no-found">No content related to <span>「'+key+'」</span> was found !</li>'
    }
    $('#search .result').html(searchHtml)
}
function search(key) {
    // let keyArr = key.replace(/\||，|\,}/g)
    let regExp = new RegExp(key.replace(/[]/g), 'gmi')
    loadData((data) => {
        let result = data.filter(post => {
            return matcher(post, regExp)
        })
        render(result, key)
    })
}