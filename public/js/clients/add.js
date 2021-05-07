function applyMask() {
    $("#phone").mask("(99) 9999-9999");
    $("#cell").mask("(99) 9 9999-9999");
    $("#cep").mask("99999-999");
}

window.onload = startPage;

function startPage() {
    applyMask();
}

function sendClientData() {
    var name = $("#name");
    var lastname = $("#lastname");
    var email = $("#email");
    var phone = $("#phone");
    var cell = $("#cell");
    var cep = $("#cep");
    var state = $("#state");
    var city = $("#city");
    var district = $("#district");
    var address = $("#address");
    var number = $("#number");
    var complement = $("#complement");

    var validateInput = /[@!#$%^&*()='+_"?°~`<>{}123456789\\]/;
    var validateInput2 = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
    var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(name.val() == "" || validateInput.test(name.val()) == true) {
        name.addClass("error-input");
        toastr["error"]("Nome inválido");
        return;
    }

    if(lastname.val() == "" || validateInput.test(lastname.val()) == true) {
        lastname.addClass("error-input");
        toastr["error"]("Sobrenome inválido");
        return;
    }

    if(email.val() == "" || regexEmail.test(email.val()) == false) {
        email.addClass("error-input");
        toastr["error"]("E-mail inválido");
        return;
    }

    if(phone.val() == "" || phone[0].value.length != 14) {
        console.log(phone.length);
        phone.addClass("error-input");
        toastr["error"]("Telefone inválido");
        return;
    }

    
    if(cell.val() == "" || cell[0].value.length != 16) {
        cell.addClass("error-input");
        toastr["error"]("Celular inválido");
        return;
    }

    if(cep.val() == "" || cep[0].value.length != 9) {
        cep.addClass("error-input");
        toastr["error"]("CEP inválido");
        return;
    }

    if(city.val() == "" || validateInput.test(city.val()) == true) {
        city.addClass("error-input");
        toastr["error"]("Cidade inválido");
        return;
    }

    if(district.val() == "" || validateInput2.test(district.val()) == true) {
        district.addClass("error-input");
        toastr["error"]("Bairro inválido");
        return;
    }

    if(address.val() == "" || validateInput2.test(address.val()) == true) {
        address.addClass("error-input");
        toastr["error"]("Endereço inválido");
        return;
    }

    if(number.val() == "" || validateInput2.test(number.val()) == true) {
        number.addClass("error-input");
        toastr["error"]("Número inválido");
        return;
    }

    if(complement.val() == "" || validateInput2.test(complement.val()) == true) {
        complement.addClass("error-input");
        toastr["error"]("Complemento inválido");
        return;
    }

    else {
        success();
        return;
    }
}

function removeInputError() {
    $("#name").removeClass("error-input");
    $("#lastname").removeClass("error-input");
    $("#email").removeClass("error-input");
    $("#phone").removeClass("error-input");
    $("#cell").removeClass("error-input");
    $("#cep").removeClass("error-input");
    $("#state").removeClass("error-input");
    $("#city").removeClass("error-input");
    $("#district").removeClass("error-input");
    $("#address").removeClass("error-input");
    $("#address").removeClass("error-input");
    $("#number").removeClass("error-input");
    $("#complement").removeClass("error-input");
}

function success() {
    toastr["success"]("Cliente cadastrado com sucesso");
}

$(document).ready(function() {
    function limpa_formulário_cep() {
      $("#address").val("");
      $("#district").val("");
      $("#city").val("");
      $("#state").val("");
      $("#complement").val("");
    }
  
    $("#cep").keyup(function() {
      var cep = $(this).val().replace(/\D/g, '');
  
      if (cep.length>="8") {
        var validacep = /^[0-9]{8}$/;
  
        if(validacep.test(cep)) {
          $("#address").val("...");
          $("#district").val("...");
          $("#city").val("...");
          $("#state").val("...");
          $("#complement").val("...");
  
          $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
            if (!("erro" in dados)) {
              $("#address").val(dados.logradouro);
              $("#district").val(dados.bairro);
              $("#city").val(dados.localidade);
              $("#state").val(dados.uf);
              $("#complement").val(dados.complemento);
            } else {
                limpa_formulário_cep();
                toastr["error"]("CEP não encontrado.");
              }
          });
        }
        else {
          limpa_formulário_cep();
          toastr["error"]("Formato CEP é inválido");
        }
      } else {
          limpa_formulário_cep();
        }
    });
});