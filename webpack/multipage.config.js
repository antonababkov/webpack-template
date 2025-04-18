const path = require('path');

result = {};
result.entry = {
    'index': ['@babel/polyfill', path.join(__dirname, '../src/index.js')],
    'newPage': ['@babel/polyfill', path.join(__dirname, '../src/newPage.js')]
}

result.pages = [
    { chunks: ['index'], page: 'index.html', template: path.join(__dirname, '../src/index.html'), },
    { chunks: ['newPage'], page: 'pages/newPage.html', template: path.join(__dirname, '../src/pages/newPage.html'), },
]
module.exports = result;