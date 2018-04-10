$('.img-hover').hover(function() {
	$(this).addClass('hover').find('.search-img').show();
	},
	function () {
		$(this).removeClass('hover').find('.search-img').hide();;
	});


$(document).ready(function () {
  $('.js-header-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
  });
});

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
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

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

// Save message to firebase
function saveMessage(name, company, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });
}
alert('changed');
