console.log("orders.js loaded");

var clientName = $("#client-name");
var serviceType = $("#service-type");
var machineType = $("#machine-type");
var orderDescription = $("#order-description");
var conservationStatus = $("#conservationstatus")

function removeInputError() {
    clientName.removeClass("error-input");
    serviceType.removeClass("error-input");
    machineType.removeClass("error-input");
    orderDescription.removeClass("error-input");
    conservationStatus.removeClass("error-input");
}