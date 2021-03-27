console.log("orders.js loaded");

var orderNumber = $("#order-number");
var orderHour = $("#order-hour");
var clientName = $("#client-name");
var serviceType = $("#service-type");
var machineType = $("#machine-type");
var orderDescription = $("#order-description");

orderHour.mask("99:99");

function sendData() {

    if(orderNumber.val() == "") {
        orderNumber.addClass("error-input");
        toastr["error"]("Número do pedido obrigatório");
        return;
    }

    if(orderHour.val() == "") {
        orderHour.addClass("error-input");
        toastr["error"]("Hora do pedido obrigatória");
        return;
    }

    if(clientName.val() == "") {
        clientName.addClass("error-input");
        toastr["error"]("Nome do cliente obrigatório");
        return;
    }

    if(serviceType.val() == "") {
        serviceType.addClass("error-input");
        toastr["error"]("Tipo do serviço obrigatório");
        return;
    }

    if(machineType.val() == "") {
        machineType.addClass("error-input");
        toastr["error"]("Tipo da máquina obrigatório");
        return;
    }

    if(orderDescription.val() == "") {
        orderDescription.addClass("error-input");
        toastr["error"]("Descrição do serviço obrigatória");
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