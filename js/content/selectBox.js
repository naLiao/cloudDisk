//框选
const folderContent = document.querySelector('.folder-content');
const section1 = document.getElementById('section');
folders.onmousedown = function (ev) {
    if(ev.target.className !== 'folders') return;
    let bX = ev.pageX;
    let bY = ev.pageY;

    let div = document.createElement('div');  //创建框
    div.className = 'kuang';
    folderContent.appendChild(div);

    const divs = folders.getElementsByClassName('file-item');
    let len = divs.length;
    let arr = t.getChild(0);
    let selectedArr = [];
    for(let i=0;i<len;i++){
        selectedArr.push(data[divs[i].id]);
    }

    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);

    function move(ev) {
        let nowX = ev.pageX;
        let nowY = ev.pageY;
        let kuangX = Math.min(nowX,bX);
        let kuangY = Math.min(nowY,bY);
        div.style.width = Math.abs(nowX-bX) + 'px';  //设置框的宽高和位置
        div.style.height = Math.abs(nowY-bY) + 'px';
        div.style.left = kuangX + 'px';
        div.style.top = kuangY - section1.offsetTop + 'px';

        for(let i=0;i<len;i++){  //不停地循环所有当前文件夹，与框碰到的就加样式
            let onOff;
            onOff = t.collision(div,divs[i]);
            data[divs[i].id].checked = onOff;

            divs[i].className = 'file-item';
            divs[i].className += onOff? ' hov':'';
            divs[i].getElementsByTagName('i')[0].className = onOff?'checked':'';
            checkAll.className = selectedArr.every(e=>e.checked) ? 'checked':'';
        }

        ev.preventDefault();  //阻止选中的默认行为
    }
    function up(ev) {
        div.remove();
        document.removeEventListener('mousemove',move);
        document.removeEventListener('mouseup',up);
    }
    ev.preventDefault();
}