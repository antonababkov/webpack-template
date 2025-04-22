import './index.html' /* для автматического обновления страницы, после внесения изменений в файле */
import './index.scss'
import { mult, sum } from './modules/calc.js'

console.log(mult(3, 4));
console.log(sum(3, 4));