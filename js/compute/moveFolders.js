const remove = document.getElementById('remove');
const modelTree = document.querySelector('.modal-tree');
const content = modelTree.querySelector('.content');
const Cspans = content.getElementsByTagName('span');
let pId;

remove.onclick = function (ev) {
    let selectArr = t.selectedData();
    if(!selectArr){  //弹出提示框，过一会自动收回
        t.tipAppear('您还没选文件哦');
    }else{  //移动框出现，并填充移动框中内容
        modelTree.style.display = 'block';
        content.innerHTML = t.treeHtml(-1,-1);
        for(let i=0;i<Cspans.length;i++){
            Cspans[i].onclick = function (ev) {
                for(let i=0;i<Cspans.length;i++){
                    Cspans[i].style.backgroundColor = '';
                }
                this.style.backgroundColor = 'rgba(204,204,204,1)';
                pId = this.dataset.id;  //获取要移动到的目录id
            }
        }
    }
}

modelTree.onclick = function (ev) {  //给移动框中加点击事件
    if(ev.target.value === '取消' || ev.target.className === 'icon_close'){
        this.style.display = 'none';
    }
    if(ev.target.value === '确定'){  //要移动了
        this.style.display = 'none';
        //获取要移动的所有数据集合，修改数据的pid，重新渲染文件夹
        let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);  //获取当前num
        let selectArr = t.selectedData();  //这里肯定不是空的，否则不会出现移动框
        let moveToArr = t.getChild(pId);
        let moveLine = [];
        selectArr.forEach(e=>{
            moveLine = moveLine.concat(e,t.getChilds(e.id));
        })

        //修改数据的pid
        console.log(moveToArr);
        console.log(selectArr);
        selectArr.forEach(ee=>{
            if(moveToArr.every(e=>e.title !== ee.title)){
                if(moveLine.every(e=>e.id != pId)){
                    selectArr.forEach(e=>e.checked=false);
                    data[ee.id].pid = pId;
                    render(num);
                    renderTree();
                    t.tipAppear('移动成功');
                }else{
                    t.tipAppear('不能移这里哦');
                    return;
                }
            }else{
                t.tipAppear('文件名冲突');
                return;
            }
        })

    }
}