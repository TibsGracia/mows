// basic functionalities

var subTopic = "mytest";
$(document).ready(function () {
  $("#btnConnect").click(function (e) {
    e.preventDefault();
    client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")//broker address
  
    client.on("connect", function () {
      $('#status').val("Successfully Connected!").css("color","green");
    });

    client.on("message", function (topic, payload) {
      $("#tblMessage tbody").append("<tr>" +
        "<td>" + topic + "</td>" +
        "<td>" + payload + "</td>" +
        "<td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td>");
    });

    $("#btnPublish").click(function (e) {
      e.preventDefault();
      client.publish($('#topic').val(), $('#payload').val());
    });
  
    $("#btnSubscribe").click(function (e) {
      e.preventDefault();
      subTopic = $('#Stopic').val();
      client.subscribe(subTopic);
    });

    $("#btnDConnect").click(function (e) {
      e.preventDefault();
      $('#status').val("You are disconnected!").css("color","red");
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
