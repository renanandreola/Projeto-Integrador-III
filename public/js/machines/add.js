var machine_name = $("#machine_name");
var conservation_state = $("#conservation_state");

function removeInputError() {
    clientName.removeClass("error-input");
    serviceType.removeClass("error-input");
    machineType.removeClass("error-input");
    orderDescription.removeClass("error-input");
}