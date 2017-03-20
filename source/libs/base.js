'use strict'
/**Random Color
 * @author Lencx
 * @param {Number} saturation => 0 - 100
 * @param {Number} lightness => 0 - 100
 * @return {String} hsla()
 */
function randomColor (s, l) {
    let deg, random, alpha
    deg = Math.ceil(Math.random()*360)
    // random = Math.random().toFixed(2)
    random = Math.random()
    alpha = random < .4 ? .7 : random
    return 'hsla('+deg+', '+s+'%, '+l+'%,'+alpha+')'
}
/** Unique values in an array
 * @author Lencx
 * @param {Array} arr
 */
// ES5
function unique(arr) {
    return arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
}
// ES6
function unique2(arr) {
    return [...new Set(arr)]
}