const tanbox = document.getElementById('tanbox');
const del = document.getElementById('del');
const fullTipBox = document.querySelector('.full-tip-box');
const tipText = document.getElementById('tipText');
const confBtns = document.querySelector('.conf-btn');

del.onclick = function (ev) {
    if(t.naming) return;
    let selectArr = t.selectedData();
    if(selectArr){  //确定删除框出现，点击事件可以操作
        tanbox.style.display = 'block';
    }else{  //弹出提示框，过一会自动收回
        t.tipAppear('您还没选文件哦');
    }
}

//给弹框加点击事件，点击确定时删除
tanbox.onclick = function (ev) {
    let selectArr = t.selectedData();
    if(ev.target.innerHTML == 'X' || ev.target.innerHTML == '取消'){
        this.style.display = 'none';
    }
    if(ev.target.innerHTML == '确定'){  //走删除
        this.style.display = 'none';
        let deleteArr = [];  //通过当前选中的数据，找到整个数据链，删除的时候删除整个数据链
        selectArr.forEach(e=>{
            deleteArr = deleteArr.concat(e,t.getChilds(e.id));
        })

        deleteArr.forEach(e=>{
            delete data[e.id];  //删除数据中的选中数据集合
        });

        let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);


        let arr = t.getChild(num);
        data[num].newFolderArr = [];  //刷新现在的新建文件夹数组
        arr.forEach(e=>{
            if(typeof(e.newIndex)==='number'&& !isNaN(e.newIndex)){
                data[num].newFolderArr.push(e.newIndex);
                data[num].newFolderArr.sort();
                // console.log(data[num].newFolderArr);
            }
        })
        console.log(data[num].newFolderArr);

        render(num);  //渲染文件夹
        renderTree();
    }
}
