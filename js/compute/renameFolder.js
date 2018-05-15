const rename = document.getElementById('rename');

rename.onclick = function (ev) {
    if(t.naming) return;
    let selectArr = t.selectedData();
    if(!selectArr || selectArr.length !== 1){
        t.tipAppear('请选择一个文件');
    }else{  //开始重命名流程
        const selectDiv = folders.getElementsByClassName('hov')[0];
        const span = selectDiv.getElementsByTagName('span')[0];
        const input = selectDiv.getElementsByTagName('input')[0];
        let nameInit = span.innerHTML;  //修改前的文件名

        span.style.display = 'none';  //输入框出现，内容为初始文件名
        input.style.display = 'block';
        input.value = span.innerHTML;
        input.focus();
        input.select();
        t.naming = true;

        input.onblur = function (ev) {  //输入框失焦时，开始判断修改后的文件名
            let val = input.value;  //修改后的文件名

            let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
            let arr = t.getChild(num);

            if(val === nameInit){  //名字没有修改，取消选中,直接返回
                data[selectArr[0].id].checked = false;
                render(num);
                t.naming = false;
                return;  //----------------------------------------------------流程结束1
            }

            if(arr.some(e=>e.title==val)){  //重名了,此处arr应该不会为空？？
                t.naming = true;
                t.tipAppear('文件名有冲突哦');
                input.select();
                input.focus();
            }else{  //开始重命名
                delete data[selectDiv.id].newIndex;  //先清空当前元素的序号
                let number=null;  //重命名成新建文件夹(数字)格式，修改数组

                if(val==='新建文件夹'){
                    data[selectDiv.id].newIndex = 0;
                }

                if(   val.indexOf('新建文件夹(')===0  ){
                    if( val[val.length-1]===')' ){
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
                    }
                })

                data[selectDiv.id].title = input.value;
                data[selectDiv.id].checked = false;
                render(num);
                renderTree();
                t.tipAppear('重命名成功');  //------------------------------------------流程结束2
                t.naming = false;
                console.log(t.naming);
            }
        }




    }
}