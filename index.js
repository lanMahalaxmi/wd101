document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#usersTable tbody');
    
    // Load data from localStorage on page load
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const data = JSON.parse(storedData);
      data.forEach(entry => appendRowToTable(entry));
    }
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const acceptTerms = document.getElementById('acceptTerms').checked;
      
      // Additional validation for date of birth (between 18 and 55)
      const currentDate = new Date();
      const dobDate = new Date(dob);
      const age = currentDate.getFullYear() - dobDate.getFullYear();
      
      if (age < 18 || age > 55) {
        alert('Please enter a valid date of birth (between ages 18 and 55).');
        return;
      }
      
      const newRowData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptTerms: acceptTerms
      };
      
      // Save data to localStorage
      let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
      data.push(newRowData);
      localStorage.setItem('userData', JSON.stringify(data));
      
      appendRowToTable(newRowData);
      
      // Reset the form
      form.reset();
    });
    
    function appendRowToTable(entry) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
      `;
      tableBody.appendChild(newRow);
    }
  });
  
  
