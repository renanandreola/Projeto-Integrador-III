function confirmDelete(id, name) {
    var answer = confirm('Deseja realmente remover o cliente ' + name + '?');

    if(answer) {
        window.location.href = "/admin/clients/delete/" + id;
    }
}