const rename = document.getElementById('rename');

rename.onclick = function (ev) {
    let selectArr = t.selectedData();
    if(!selectArr || selectArr.length !== 1){
        t.tipAppear('请选择一个文件');
    }else{  //走重命名了
        const selectDiv = folders.getElementsByClassName('hov')[0];
        const span = selectDiv.getElementsByTagName('span')[0];
        const input = selectDiv.getElementsByTagName('input')[0];
        let nameInit = span.innerHTML;

        span.style.display = 'none';
        input.style.display = 'block';
        input.value = span.innerHTML;
        input.focus();
        input.select();

        input.onblur = function (ev) {
            let val = input.value;
            let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
            let arr = t.getChild(num);
            if(input.value === nameInit){  //名字没有修改，直接返回
                data[selectArr[0].id].checked = false;
                render(num);
                return;
            }else if(arr && arr.some(e=>e.title==val)){
                input.select();
                input.focus();
            }else{  //修改数据中的文件夹名
                data[selectDiv.id].title = input.value;
                data[selectDiv.id].checked = false;
                render(num);
                renderTree();
                t.tipAppear('重命名成功');
            }
        }
    }
}