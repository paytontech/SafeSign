const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

function sendSignInAlert() {
    const msg = {
        to: localStorage.getItem("email"),
        from: 'SafeSign@paytondev.me',
        subject: 'We detected a sign in on your computer',
        text: 'You signed in on your computer at ' + new Date().toLocaleString(),
        html: '<strong>Hello!<br>We detected a sign in on your computer at ' + new Date().toLocaleString() + ' on ' + localStorage['deviceName'] + '</strong>',
    }
    console.log(msg);
    sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
}