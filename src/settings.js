window.api.receive('settingsInfo', function(data) {
    console.log(data);
    setTimeout(function() {
    var emailBox = document.getElementById("email-input");
    var nameBox = document.getElementById("name-input");
    var sgBox = document.getElementById("sendgrid-api");
    emailBox.setAttribute('value' , data.email);
    nameBox.setAttribute('value' , data.deviceName);
    sgBox.setAttribute('value' , data.key);
    }, 200);
})
window.onload = function() {
    
}


function setEmail() {
    var emailVal = document.getElementById("email-input").value;
    var data = {
        email: emailVal,
    }
    window.api.send('setEmail', data);
}
function setName() {
    var nameVal = document.getElementById("name-input").value;
    var data = {
        name: nameVal,
    }
    window.api.send('setName', data);
}
function testEmail() {
    
}
function validateSGKey() {
    var keyVal = document.getElementById("sendgrid-api").value;
    var data = {
        key: keyVal,
    }
    console.log(data);
    window.api.send('validateSGKey', data);
}