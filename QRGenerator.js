var qrcode = new QRCode("qrcode");

function makeCode () {
    var elText = document.getElementById("text");

if ((elText.value.length != 7) && (elText.value.length != 0)) {
        alert("Wrong Student ID")
        console.log("hey");
        elText.focus();
        elText.value = "";
    }

    qrcode.makeCode(elText.value);
}

makeCode();

$("#text").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
      // if the keyCode is Enter, execute
        if (e.keyCode == 13) {
            makeCode();
        }
    });
