const treeMenu = document.querySelector('.tree-menu');
renderTree();

function renderTree() {
    treeMenu.innerHTML = t.treeHtml(-1,-1);
    //给所有的span加点击事件，点击选中***************************************************
    const spans = treeMenu.getElementsByTagName('span');
    for(let i=0;i<spans.length;i++){
        spans[i].onclick = function (ev) {
            if(t.naming) return;
            for(let i=0;i<spans.length;i++){
                spans[i].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'rgba(204,204,204,1)';

            for(let attr in data){
                data[attr].checked = false;
            }
            render(this.dataset.id);
            renderNav(this.dataset.id);
        }
    }

    //给小箭头加点击事件点击收起，再点击打开
    const clickIs = treeMenu.querySelectorAll('.tree-title i');
    for(let i=0;i<clickIs.length;i++){
        clickIs[i].onclick = function (ev) {
            if(this.classList.contains('open')){
                this.classList.add('close');
                this.classList.remove('open');
                let v = this.parentNode.parentNode.nextElementSibling;
                if(v) v.style.display = 'none';
            }else if(this.classList.contains('close')){
                this.classList.add('open');
                this.classList.remove('close');
                let v = this.parentNode.parentNode.nextElementSibling;
                if(v) v.style.display = 'block';
            }
            ev.stopPropagation();
        }
    }
}

