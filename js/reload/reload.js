const reload = document.getElementById('refresh');

reload.onclick = function (ev) {
    if(t.naming) return;
    location.reload();
}