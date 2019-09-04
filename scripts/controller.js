// basic functionalities

var subTopic;
function error() {
  Swal.fire({
    type: 'error',
    title: 'Oops...<br>INPUT IS REQUIRED!',
  });
}
$(document).ready(function () {
  $("#btnConnect").click(function (e) {
    var address = $("#address").val();
    e.preventDefault();
    $('#status').val("Connecting...").css("color", "black");
    client = mqtt.connect(address)//broker address

    client.on("connect", function () {
      $('#status').val("Successfully Connected!").css("color", "green");
    });

    client.on("message", function (topic, payload) {
      $("#tblMessage tbody").prepend("<tr>" +
        "<td>" + topic + "</td>" +
        "<td>" + payload + "</td>" +
        "<td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td>");
    });

    $("#btnPublish").click(function () {
      var topic = $("#topic").val();
      if (topic == "") {
        error();
      } else {
        $("#tblPublish tbody").prepend("<tr>" +
          "<td>" + topic + "</td>" +
          "<td>" + $('#payload').val() + "</td>" +
          "<td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td>");
          client.publish($('#topic').val(), $('#payload').val());
      }
      $("#payload").val("");
    });

    $("#btnSubscribe").click(function () {
      var sub = $("#Stopic").val();
      if (sub == "") {
        error();
      } else {
        subTopic = $('#Stopic').val();
        client.subscribe(subTopic);
        $("#tblSubscribe tbody").prepend("<tr>" +
          "<td>" + subTopic + "</td>" +
          "<td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td>");
          sub="";
      }
    });

    $("#btnDConnect").click(function (e) {
      e.preventDefault();
      $('#status').val("You are disconnected!").css("color", "red");
      client.end();
    });

    $("#btnUnsubscribe").click(function (er) {
      client.unsubscribe(subTopic)
      $("#Stopic").val("");
    });
  });
})


// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
