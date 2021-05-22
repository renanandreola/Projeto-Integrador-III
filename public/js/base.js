toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

//Menu Push
function wrap()
{
  if(document.getElementById("menu").style.left == "0px")
  {
    document.getElementById("menu").style.left = "-1000px";
    document.getElementById("content").style.marginLeft = "0";
    document.getElementById("footer").style.marginLeft = "0";
  }
  else
  {
    document.getElementById("menu").style.left = "0px";
    document.getElementById("content").style.marginLeft = "15%";
    document.getElementById("footer").style.marginLeft = "15%";
  } 
}

//
console.log("base.js");
