# Features
> [View Demo](https://lencx.github.io/blog/)

- Navigation [page]
  - home
  - archives
  - categories
  - tags
  - ...
- Sidebar
  - tagCloud
  - archives
  - categories
  - recent posts
- Post
  - post meta
    - author
    - create date
    - updated date
    - category
    - tags
  - read more
  - post toc
  - code theme[white|black]
  - comment: disqus
- Analytics: google analytics
- Fancybox-3.0
- font-awesome-4.7.0
- Responsive
- canvas background
- RSS

## Update

- `RSS`
```bash
# rss => atom.xml
npm i hexo-generator-feed --save
```
- `Search`
> local search
```bash
# generator content.json or search.json
npm i hexo-generator-json-content --save
```


## Config

> `/source/css/_theme.color.scss` file covers almost all of the color and shadow effects in the theme, `/source/css/variable／_mixin.scss` @mixin radius parameter $radius-enable is set to true enable all rounded corners in the theme, false is off.

## Goal
Implement a highly customizable blog theme.

## TODO:
- ~~search~~
- share
- duoshuo
- languages
- calendar