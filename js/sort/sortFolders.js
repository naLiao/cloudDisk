const sortMode = document.querySelector('.sort_mode');
const lis = document.querySelectorAll('.sort_mode li');
let len = lis.length;

sortMode.onmouseenter = function (e) {
    if(this.children[1].style.display == 'block'){
        this.children[1].style.display = 'none';
        this.children[2].style.display = 'none';
    }else{
        this.classList.add('sel2');
        this.children[1].style.display = 'block';
        this.children[2].style.display = 'block';
    }
}
sortMode.onmouseleave = function (e) {
    this.classList.remove('sel2');
    this.children[1].style.display = 'none';
    this.children[2].style.display = 'none';
}

let sortedArr = Object.keys(data).sort(function (a, b) {
    return data[b].id < data[a].id;
});
let tmp = {};
for(let attr in sortedArr){
    tmp[sortedArr[attr]] = data[sortedArr[attr]];
}
console.log(sortedArr);
console.log(tmp);

for(let i=0;i<len;i++){
    lis[i].onclick = function (ev) {
        let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
        let arr = t.getChild(num);
        for(let i=0;i<len;i++){
            lis[i].classList.remove('active');
        }
        this.classList.add('active');
        if(i==0){  //按照修改日期排序，也就是文件的ID，ID越大说明创建时间越晚
            arr.sort(function (a, b) {
                return a.id < b.id;
            })
            console.log(arr);
        }
        if(i==1){  //按照文件名排序
            arr.sort(function (a, b) {
                return a.title-b.title;
            })
            console.log(arr);
        }
        if(i==2){  //显示缩略图
            t.modeLine = true;
            show_mode.classList.add('sel2');
            show_mode.classList.remove('sel1');
            let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
            render(num);
        }
        ev.stopPropagation();
        ev.preventDefault();
    }
}