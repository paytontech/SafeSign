window.api.receive('settingsInfo', function(data) {
    console.log(data);
    setTimeout(function() {var emailBox = document.getElementById("email-input");
    var nameBox = document.getElementById("name-input");
    emailBox.setAttribute('value' , data.email);
    nameBox.setAttribute('value' , data.deviceName);
    }, 1000);
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