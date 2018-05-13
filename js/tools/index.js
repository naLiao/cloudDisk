//这里面集合了所有用到的工具函数
let t = {
    modeLine:false,
    getChild(num) {
        let newArr = [];
        for(let attr in data){
            if(data[attr].pid == num){  //data[attr]对象对应一个文件夹
                newArr.push(data[attr]);
            }
        }
        if(newArr.length){
            return newArr;
        }else{
            return false;
        }
    },
    getChilds(num){
        let newArr = [];
        add(num);
        function add(tt) {
            let childs = t.getChild(tt);
            if(childs){
                newArr = newArr.concat(childs);
                childs.forEach(e=>{
                    add(e.id);
                })
            }else{
                return;
            }
        }
        return newArr;
    },
    getParent(num){
        if(num==0){
            return null;
        }else{
            return data[data[num].pid];
        }
    },
    getParents(num){
        let newArr = [];
        let now = data[num];
        while(now){
            newArr.unshift(now);
            now = t.getParent(now.id);
        }
        return newArr;
    },
    collision(obj1,obj2) {
        let l1 = obj1.offsetLeft;
        let r1 = obj1.offsetLeft + obj1.offsetWidth;
        let t1 = obj1.offsetTop;
        let b1 = obj1.offsetTop + obj1.offsetHeight;

        let l2 = obj2.offsetLeft;
        let r2 = obj2.offsetLeft + obj2.offsetWidth;
        let t2 = obj2.offsetTop;
        let b2 = obj2.offsetTop + obj2.offsetHeight;

        if(r1<l2 || b1<t2 || l1>r2 || t1>b2){
            return false;
        }else{
            return true;
        }
    },
    selectedData(){
        let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);  //获取当前num
        let arr = t.getChild(num);
        if(!arr) return false;
        arr = arr.filter(e=>e.checked==true);  //当前选中的文件夹对应的数据集合
        if(arr.length) return arr;
        return false;
    },
    treeHtml(num,paddingNum) {
        let child = t.getChild(num);
        if(!child) return '';
        paddingNum++;
        let html = `<ul style="padding-left:${paddingNum*6}px">`;
        child.forEach(e=>{
            html += `<li>
             <div class="tree-title">
                  <span data-id="${e.id}" class="${t.getChild(e.id)? 'open' : ''}"><i class="${t.getChild(e.id)? 'open': 'noImg'}"></i>${e.title}</span>
             </div>
             ${t.treeHtml(e.id,paddingNum)}
             </li>`;
    })
        html += `</ul>`;
        return html;
    },
    tipAppear (str){
        tipText.innerHTML = str;
        fullTipBox.style.top = '0px';
        setTimeout(function (args) {
            fullTipBox.style.top = '-40px';
        },1000)
    }
}