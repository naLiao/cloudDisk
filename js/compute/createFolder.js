const create = document.getElementById('create');

//点击创建时先创建DOM元素，可以修改名字，失焦的时候再放进数据里

create.onclick = function (ev) {
    if(t.naming) return;

    let createId = +new Date;
    let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
    if(!t.getChild(num)){
        fEmpty.style.display = 'none';
    }

    //创建一个虚拟的DOM元素，让用户操作文件夹名，先不写进数据里
    let div = document.createElement('div');
    div.className = `${t.modeLine? 'file-tr':'file-item'}`;
    let img = document.createElement('img');
    img.src = "img/folder-b.png";
    let input = document.createElement('input');
    input.className = 'editor';
    input.style.display = 'block';
    input.value = '新建文件夹';


    let i = document.createElement('i');
    div.appendChild(img);
    div.appendChild(input);
    div.appendChild(i);
    folders.appendChild(div);
    t.naming = true;  //命名中不让点击新建文件夹
    console.log(t.naming);

    input.select();
    input.onblur = function (ev) {
        /*给文件夹命名：
            不能与兄弟文件夹同名
            为空默认新建文件夹
            如果多个新建文件夹就给加后缀 */

        let val = input.value;
        if(!val.trim()) val = '新建文件夹';  //文件名为空或空格，默认为新建文件夹

        if(val==='新建文件夹'){  //如果是新建文件夹，要走新建文件夹命名流程
            let newFolderArr = data[num].newFolderArr;  //当前的新建文件夹数组
            let newIndex;
            //看数组中有没有空隙
            function getIndex() {
                if(!newFolderArr.length || newFolderArr[0] !== 0){
                    return 0;
                }
                for(let i=0;i<newFolderArr.length;i++){
                    if(newFolderArr[i+1]){
                        if(  (newFolderArr[i]+1) != newFolderArr[i+1]   ){  //有空隙
                            return newFolderArr[i]+1;
                        }else{  //没有空隙，加到数组最后
                            return newFolderArr.length;
                        }
                    }else{  //如果没有下一个，加到数组最后
                        return newFolderArr.length;
                    }
                }
            }
            newIndex = getIndex();
            console.log(newIndex);
            if(newIndex===0){
                val = '新建文件夹';
            }else{
                val = '新建文件夹(' + newIndex + ')';
            }
            //将当前文件夹数据添加到数据
            data[createId] = {
                "id": createId,
                "pid": num,
                "title": val,
                newIndex,
                "newFolderArr":[],
                "checked":false
            };

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

            render(num);
            renderTree();
            t.naming = false;
            t.tipAppear('创建成功');
        }else{  //文件夹名字不是新建文件夹，走正常流程
            let arr = t.getChild(num);
            if(arr && arr.some(e=>e.title===val)){
                t.tipAppear('不能重名哦');
                input.select();
                input.focus();
            }else{  //将当前文件夹数据添加到数据
                data[createId] = {
                    "id": createId,
                    "pid": num,
                    "title": val,
                    "checked":false
                };
                render(num);
                renderTree();
                t.naming = false;
                t.tipAppear('创建成功');
            }
        }
    }
}