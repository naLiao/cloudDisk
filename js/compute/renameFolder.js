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

        if(t.naming){
            input.focus();
            input.select();
            return;
        };

        t.naming = true;
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
                t.naming = false;
                return;
            }else if(arr && arr.some(e=>e.title==val)){  //重名了
                input.select();
                input.focus();
            }else{  //开始重命名
                delete data[selectDiv.id].newIndex;  //先清空当前元素的序号
                let number=null;  //重命名成新建文件夹(数字)格式，修改数组
                let v = input.value;

                if(v==='新建文件夹'){
                    data[num].newFolderArr.push(number);
                }

                if(   v.indexOf('新建文件夹(')===0  ){
                    if( v[v.length-1]===')' ){
                        number = parseFloat(input.value.split('新建文件夹(')[1].split(')')[0]);
                    }
                }
                if(number && typeof(number)==='number' && !isNaN(number)){
                    data[selectDiv.id].newIndex = number;
                }

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


                data[selectDiv.id].title = input.value;
                data[selectDiv.id].checked = false;
                render(num);
                renderTree();
                t.naming = false;
                t.tipAppear('重命名成功');
            }
        }
    }
}