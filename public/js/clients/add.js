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

function applyMask() {
    $("#phone").mask("(99) 9999-9999");
    $("#cell").mask("(99) 9 9999-9999");
    $("#cep").mask("99999-999");
}

window.onload = startPage;

function startPage() {
    applyMask();
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