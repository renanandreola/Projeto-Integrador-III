console.log("orders.js loaded");

var clientName = $("#client-name");
var serviceType = $("#service-type");
var machineType = $("#machine-type");
var orderDescription = $("#order-description");


function sendData() {
    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;

    if(clientName.val() == "" || validateInput.test(clientName.val()) == true) {
        clientName.addClass("error-input");
        toastr["error"]("Nome do cliente inválido");
        return;
    }

    if(serviceType.val() == "" || validateInput.test(serviceType.val()) == true) {
        serviceType.addClass("error-input");
        toastr["error"]("Tipo do serviço inválido");
        return;
    }

    if(machineType.val() == "" || validateInput.test(machineType.val()) == true) {
        machineType.addClass("error-input");
        toastr["error"]("Tipo da máquina inválido");
        return;
    }

    if(orderDescription.val() == "" || validateInput.test(orderDescription.val()) == true) {
        orderDescription.addClass("error-input");
        toastr["error"]("Descrição do serviço inválida");
        return;
    }
}

function removeInputError() {
    clientName.removeClass("error-input");
    serviceType.removeClass("error-input");
    machineType.removeClass("error-input");
    orderDescription.removeClass("error-input");
}

function success() {
    toastr["success"]("Pedido cadastrado com sucesso");
}