console.log("orders.js loaded");

var orderNumber = $("#order-number");
var orderHour = $("#order-hour");
var clientName = $("#client-name");
var serviceType = $("#service-type");
var machineType = $("#machine-type");
var orderDescription = $("#order-description");

orderHour.mask("99:99");

function sendData() {
    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;

    if(orderNumber.val() == "") {
        orderNumber.addClass("error-input");
        toastr["error"]("Número do pedido inválido");
        return;
    }

    if(orderHour.val() == "") {
        orderHour.addClass("error-input");
        toastr["error"]("Hora do pedido inválido");
        return;
    }

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

    else {
        var data = {
            orderNumber: orderNumber.val(),
            orderHour: orderHour.val(),
            clientName: clientName.val(),
            serviceType: serviceType.val(),
            machineType: machineType.val(),
            orderDescription: orderDescription.val()
        }

        console.log("data: ", data);
        
        clearInput();
        
        toastr["success"]("Pedido cadastrado com sucesso");
    }
}

function removeInputError() {
    orderNumber.removeClass("error-input");
    orderHour.removeClass("error-input");
    clientName.removeClass("error-input");
    serviceType.removeClass("error-input");
    machineType.removeClass("error-input");
    orderDescription.removeClass("error-input");
}

function clearInput() {
    orderNumber.val('');
    orderHour.val('');
    clientName.val('');
    serviceType.val('');
    machineType.val('');
    orderDescription.val('');
}