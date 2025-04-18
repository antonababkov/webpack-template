import './index.html' /* для автматического обновления страницы, после внесения изменений в файле */
import './index.scss'
import nature from './img/nature.jpeg'
import { mult, sum } from './modules/calc.js'

const imgWrap = document.querySelector('.image')
const img = new Image();

img.src = nature;
imgWrap.append(img)
console.log(img.src)

console.log(mult(3, 4));
console.log(sum(3, 4));