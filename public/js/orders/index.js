var ordersDates = document.getElementsByClassName('orderDate');

for(var i = 0; i < ordersDates.length; i++) {
    let date = new Date(ordersDates[i].innerText);

    var fullDate = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '/' + (date.getMonth() < 10 ? "0" +  date.getMonth() : date.getMonth()) + '/' + date.getFullYear() + 
    " às " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

   ordersDates[i].innerText = fullDate;

}

function confirmDelete(id) {
    var answer = confirm('Deseja realmente remover o registro ' + id + '?');

    if(answer) {
        window.location.href = "/admin/orders/delete/" + id;
    }
}