function confirmDelete(id, name) {
    var answer = confirm('Deseja realmente remover a máquina ' + name + '?');

    if(answer) {
        window.location.href = "/admin/machines/delete/" + id;
    }
}