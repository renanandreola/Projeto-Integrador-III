// document.ready(function(){
//     console.log("registered-orders loaded");
//     var formatDate = $("#orderDate").val();
//     console.log(formatDate);
// })

console.log("registered-orders loaded");
var formatDate = document.getElementById('orderDate').innerHTML;
console.log(formatDate);

var a = formatDate.split(" ");
var day = a[2];
var month = a[1];
var year = a[3];

switch (month) {
    case 'Jan':
        month = '01';
        break;

    case 'Feb':
        month = '02';
        break;

    case 'Mar':
        month = '03';
        break;

    case 'Apr':
        month = '04';
        break;

    case 'May':
        month = '05';
        break;

    case 'Jun':
        month = '06';
        break;

    case 'Jul':
        month = '07';
        break;
    
    case 'Aug':
        month = '08';
        break;

    case 'Sep':
        month = '09';
        break;

    case 'Oct':
        month = '10';
        break;

    case 'Nov':
        month = '11';
        break;

    case 'Dec':
        month = '12';
        break;

    default:
        month = '00';
        break;
}

var orderDate = (day+"/"+month+"/"+year);