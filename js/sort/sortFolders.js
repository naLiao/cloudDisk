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

for(let i=0;i<len;i++){
    lis[i].onclick = function (ev) {
        for(let i=0;i<len;i++){
            lis[i].classList.remove('active');
        }
        this.classList.add('active');
        if(i==0){  //按照修改日期排序

        }
        if(i==1){  //按照文件名排序
            let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
            let arr = t.getChild(num);

            console.log(arr);
            arr.sort(function (a, b) {
                return a-b;
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