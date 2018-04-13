console.log('form js starts here....');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBuBsnwOAxUCi9bIBGVebvN2pa7h3qL8eA",
  authDomain: "database-for-form.firebaseapp.com",
  databaseURL: "https://database-for-form.firebaseio.com",
  projectId: "database-for-form",
  storageBucket: "",
  messagingSenderId: "400196821334"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var password = getInputVal('password');
  var email = getInputVal('email');
  var phone = getInputVal('Phone');
  var message = getInputVal('message');
  var radio = isBtnChecked('radio', 'gridRadios');
  var checked = getInputVal('inlineCheckbox1');
  var file = getInputVal('file');

  // Save message
  saveMessage(name, password, email, phone, message, radio, checked, file);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

function isBtnChecked(type, name) {
  var target = $("input:" + type + "[name=" + name + "]:checked").val();
  return target;
}
// Save message to firebase
function saveMessage(name, company, email, phone, message, radio, checked, file) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message,
    radio: radio,
    checkbox: checked,
    file: file
  });
}

