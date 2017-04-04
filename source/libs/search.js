!function() {
'use strict';
const ROOT = window.location.origin + window.BLOG.ROOT
const ATOM = ROOT + 'search.json' || ROOT + 'content.json'
let posts = []
fetch(ATOM).then(blob => blob.json()).then(data => posts.push(...data))
// console.log(posts)
function findMatches(wordToMatch, posts) {
    return posts.filter(post => {
        // here we need to figure out if the posts on state matches what was searched.
        const regex = new RegExp(wordToMatch, 'gi')
        return post.title.match(regex)
            || post.tags.some(tag => tag.name.match(regex))
            || post.text.match(regex)
    })
}

function displayMatches() {
    // console.log(this.value)
    const matchArr = findMatches(this.value, posts)
    if(matchArr.length) {
        const html = matchArr.map(post => {
            const _regex = new RegExp(this.value, 'gi')
            let _lightTitle = post.title.replace(post.title.match(_regex), `<em>${post.title.match(_regex)}</em>`)
            let _tags = post.tags.map(tag => {
                let _lightTag = tag.name.replace(tag.name.match(_regex), `<em>${tag.name.match(_regex)}</em>`)
                return `<span>${_lightTag}</span>`
            }).join('')
            return `
                <li>
                    <a href='${ROOT + post.path}'>
                        <h3 class='search-title'>${_lightTitle}</h3>
                        <div class='tags'>${_tags}</div>
                        <time>${post.date}</time>
                    </a>
                </li>
            `
        }).join('')
        // console.log(matchArr)
        searchResult.innerHTML = html
    } else {
        searchResult.innerHTML = `<li class="no-found">No content related to <span>「${this.value}」</span> was found !</li>`
    }
}
const searchInput = document.querySelector('#search input')
const searchResult = document.querySelector('#search .result')
searchInput.addEventListener('keyup', displayMatches)
}()