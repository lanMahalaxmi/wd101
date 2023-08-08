document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#usersTable tbody');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Retrieve form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const acceptTerms = document.getElementById('acceptTerms').checked;
      
      // Additional validation for date of birth
      const currentDate = new Date();
      const dobDate = new Date(dob);
      const age = currentDate.getFullYear() - dobDate.getFullYear();
      
      if (age < 18 || age > 55) {
        alert('Please enter a valid date of birth (between ages 18 and 55).');
        return;
      }
      const dobYear = dobDate.getFullYear();
      if (dobYear < 1967 || dobYear > 2004) {
        alert('Please enter a valid date of birth (between years 1967 and 2004).');
        return;
      }
      
      // Create a new table row
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td class="border px-4 py-2">${name}</td>
        <td class="border px-4 py-2">${email}</td>
        <td class="border px-4 py-2">${password}</td>
        <td class="border px-4 py-2">${dob}</td>
        <td class="border px-4 py-2">${acceptTerms ? 'Yes' : 'No'}</td>
      `;

      // Save data to localStorage
      const userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptTerms: acceptTerms
      };
      
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const data = JSON.parse(storedData);
        data.push(userData);
        localStorage.setItem('userData', JSON.stringify(data));
      } else {
        localStorage.setItem('userData', JSON.stringify([userData]));
      }

      
      // Reset the form
      form.reset();
    });
  });
  
