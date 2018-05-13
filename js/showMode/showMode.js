const show_mode = document.querySelector('.show_mode');
show_mode.onclick = function () {
    let num = parseFloat(breadNav.getElementsByTagName('span')[0].id);
    if(t.modeLine == false){
        this.classList.add('sel2');
        this.classList.remove('sel1');
        t.modeLine = true;
    }else{
        this.classList.add('sel1');
        this.classList.remove('sel2');
        t.modeLine = false;
    }
    render(num);
}