const tanbox = document.getElementById('tanbox');
const del = document.getElementById('del');
const fullTipBox = document.querySelector('.full-tip-box');
const tipText = document.getElementById('tipText');
const confBtns = document.querySelector('.conf-btn');
let selectArr = [];

del.onclick = function (ev) {
    let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);  //获取当前num
    let arr = t.getChild(num);
    selectArr = arr.filter(e=>e.checked==true);  //当前选中的文件夹对应的数据集合

    if(selectArr.length){
        tanbox.style.display = 'block';
    }else{  //弹出提示框，过一会自动收回
        tipText.innerHTML = '您还没选文件哦';
        fullTipBox.style.top = '0px';
        setTimeout(function (args) {
            fullTipBox.style.top = '-40px';
        },500)
    }
}

//给弹框加点击事件，点击确定时删除
tanbox.onclick = function (ev) {
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

        let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);  //获取当前num
        render(num);  //渲染文件夹

        // console.log(data);
    }
}
