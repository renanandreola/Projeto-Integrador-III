var ordersDates = document.getElementsByClassName('orderDate');

for(var i = 0; i < ordersDates.length; i++) {
    let date = new Date(ordersDates[i].innerText);

    var fullDate = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '/' + (date.getMonth() < 10 ? "0" +  date.getMonth() : date.getMonth()) + '/' + date.getFullYear() + 
    " às " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

ordersDates[i].innerText = fullDate;

}

let infos = document.getElementsByClassName('ocult');

for(var i = 0; i < infos.length; i++) {
    infos[i].style.display = 'none';
}

function activateClientInfo() {
    let infos = document.getElementsByClassName('ocult');
    var button = document.getElementById('switch');

    if(infos[0].style.display == 'none') {
        
        button.innerText = '- Informações';

        for(var i = 0; i < infos.length; i++) {
            infos[i].style.display = 'block';
        }
    } else {

        button.innerText = '+ Informações';

        for(var i = 0; i < infos.length; i++) {
            infos[i].style.display = 'none';
        }
    }
}