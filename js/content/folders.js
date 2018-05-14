const folders = document.querySelector('.folders');
const fEmpty = document.querySelector('.f-empty');
const checkAll = document.querySelector('#checkedAll');
render(0);  //初始化
window.onmousemove = function (ev) {
    ev.preventDefault();  //阻止拖拽选中的默认行为
}

//根据数据渲染文件夹
function render(num) {
    // console.log('渲染');
    //清空化
    folders.innerHTML = '';
    fEmpty.style.display = 'none';

    //找到当前数字对应的所有子集对象集合
    let arr = t.getChild(num);
    if(!arr){  //当前元素没有子集
        // console.log('空');
        fEmpty.style.display = 'block';
        checkAll.className = '';
        checkAll.onclick = null;
        return;
    }

    //每次渲染查看当前所有文件夹状态，都选上勾选全选框
    checkAll.className = arr.every(e=>e.checked) ? 'checked' : '';

    //根据子集数据生成文件夹
    arr.forEach(e=>{
        let div = document.createElement('div');
        div.className = `${t.modeLine? 'file-tr':'file-item'}` + `${e.checked? ' hov':''}`;
        div.id = e.id;
        let img = document.createElement('img');
        img.src = "img/folder-b.png";
        let span = document.createElement('span');
        span.className = "folder-name";
        span.innerHTML = e.title;
        let input = document.createElement('input');
        input.className = 'editor';
        let i = document.createElement('i');
        i.className = e.checked ? 'checked' : '';

        i.onclick = function (ev) {  //给勾选框加点击事件
            e.checked = !e.checked;
            render(num);
        }

        img.ondblclick = function () {  //双击进入文件夹
            if(t.naming) return;
            arr.forEach(e=>e.checked=false);
            render(e.id);
            renderNav(e.id);
        }

        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(input);
        div.appendChild(i);

        folders.appendChild(div);
    })

    //点击全选框勾选所有文件
    checkAll.onclick = function (ev) {
        let rlt = checkAll.classList.toggle('checked');
        arr.forEach(e=>e.checked = rlt);
        render(num);
    }
}