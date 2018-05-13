const create = document.getElementById('create');

//点击创建时先创建DOM元素，可以修改名字，失焦的时候再放进数据里

create.onclick = function (ev) {
    let createId = +new Date;
    let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);  //获取当前num
    if(!t.getChild(num)){
        fEmpty.style.display = 'none';
    }

    //创建一个虚拟的DOM元素，让用户操作文件夹名，先不进数据
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

    input.select();
    input.onblur = function (ev) {
        /*给文件夹命名：
            不能与兄弟文件夹同名
            为空默认新建文件夹
            如果多个新建文件夹就给加后缀 */
        let val = input.value;
        let arr = t.getChild(num);
        if(arr && arr.some(e=>e.title==val)){
            //******************************重名情况可能要更改
            input.select();
            input.focus();
        }else{
            //将当前文件夹数据添加到数据
            data[createId] = {
                "id": createId,
                "pid": num,
                "title": input.value,
                "checked":false
            };
            render(num);
            renderTree();
            t.tipAppear('创建成功');
        }
    }
}