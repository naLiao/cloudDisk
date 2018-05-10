//这里面集合了所有用到的工具函数
let t = {
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
    }
}