const treeMenu = document.querySelector('.tree-menu');

let html = '';
renderTree(0,-1);

function renderTree(num,paddings) {
    let child = t.getChild(num);
    if(!child) return '';
    paddings++;
    html += `<ul style="padding-left:${(paddings*5)}px">`;
    html += `<div class="tree-title tree-ico close">
            <span><i></i>${data[num].title}</span>
        </div>`;

    if(t.getChild(num)){
        t.getChild(num).forEach(e=>{
            renderTree(e.id,paddings);
        })
    }else{
        return;
    }
    html += '</ul>';
}

treeMenu.innerHTML = html;