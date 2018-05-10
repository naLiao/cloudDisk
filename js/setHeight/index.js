//设置下方主区域的高度，自动占满屏幕
const head = document.getElementById('head');
const section = document.getElementById('section');
let headH = head.offsetHeight;
let sectionH = window.innerHeight - headH;
section.style.height = sectionH + 'px';