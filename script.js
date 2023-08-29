const userDataArray = []; // Array to store user data objects

function validateForm(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input');

  clearError();

  const userData = {}; // Object to store current user's data

  inputs.forEach(input => {
    const value = input.value.trim();
    const errorMessages = [];
///validate
    switch (input.id) {
      case 'name':
        if (value === '') {
          errorMessages.push('Name cannot be empty.');
        } else {
          userData.name = value;
        }
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
          errorMessages.push('Email cannot be empty.');
        } else if (!emailPattern.test(value)) {
          errorMessages.push('Invalid email format.');
        } else {
          userData.email = value;
        }
        break;

      case 'password':
        if (value === '') {
          errorMessages.push('Password cannot be empty.');
        } else if (value.length < 6) {
          errorMessages.push('Password must be at least 6 characters long.');
        } else {
          userData.password = value;
        }
        break;
    }

    if (errorMessages.length > 0) {
      showError(input, errorMessages);
    } else {
      showSuccess(input);
    }
  });

  if (Object.keys(userData).length === 3) {
    userDataArray.push(userData); // Push the current user's data into the array
    console.log(userDataArray); // Display the array 
  //  console.log('User data stored in the array.');
  }
}
//error msg
function showError(input, messages) {
  input.classList.remove('success');
  input.classList.add('error');

  const errorMessage = document.getElementById(`${input.id}Error`);
  errorMessage.innerHTML = messages.join('<br>');
}
//add class name

function showSuccess(input) {
  input.classList.remove('error');
  input.classList.add('success');
}

function clearError() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.innerHTML = '';
  });
}

function clearFieldStyles(event) {
  const input = event.target;
  input.classList.remove('error');
  input.classList.remove('success');

  const errorElement = document.getElementById(`${input.id}Error`);
  errorElement.innerHTML = '';
}
function toggleSections() {
  const registrationFields = document.getElementById('registrationFields');
  const loginFields = document.getElementById('loginFields');

  registrationFields.style.display = 'none';
  loginFields.style.display = 'block';
}
//it check the userobj with the login field
function performLogin() {
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;

  const user = userDataArray.find(user => user.email === loginEmail && user.password === loginPassword);

  const loginMessage = document.getElementById('loginMessage');

  if (user) {
    loginMessage.textContent = 'Login successful!';
    loginMessage.style.color = 'green';
  } else {
    loginMessage.textContent = 'Login failed. Please check your credentials.';
    loginMessage.style.color = 'red';
  }
}

