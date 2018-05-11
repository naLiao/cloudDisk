const breadNav = document.querySelector('.bread-nav');
renderNav(0);  //初始化

function renderNav(num) {
    breadNav.innerHTML = '';
    let arrNav = t.getParents(num);
    arrNav.forEach((e,i,all)=>{  //数据生成面包屑
        if(i==all.length-1){
            let span = document.createElement('span');
            span.innerHTML = e.title;
            span.id = e.id;
            breadNav.appendChild(span);
        }else{
            let a1 = document.createElement('a');
            a1.innerHTML = e.title;
            a1.href = 'javascript:;';
            a1.id = e.id;
            breadNav.appendChild(a1);
            a1.onclick = function () {  //点击面包屑渲染对应的文件和面包屑
                let arr = t.getChild(num);  //点击面包屑回退之前，清除当前文件夹选中状态
                if(arr) arr.forEach(e=>e.checked = false);
                render(a1.id);
                renderNav(a1.id);
            }
        }
    })
}

