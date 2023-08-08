document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const userTableBody = document.querySelector("#userTable tbody");
  
    registrationForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const terms = document.getElementById("terms").checked;
  
      if (!name || !email || !password || !dob || !terms) {
        alert("Please fill in all fields and accept the terms.");
        return;
      }
  
      const dobDate = new Date(dob);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - dobDate.getFullYear();
  
      if (age < 18 || age > 55) {
        alert("Date of birth must be between 18 and 55 years.");
        return;
      }
  
      const newRow = userTableBody.insertRow();
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${terms ? "Yes" : "No"}</td>
      `;
  
      registrationForm.reset();
    });
  
    // Load data from localStorage and populate the table
    const savedData = JSON.parse(localStorage.getItem("userData")) || [];
    savedData.forEach((user) => {
      const newRow = userTableBody.insertRow();
      newRow.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.terms ? "Yes" : "No"}</td>
      `;
    });
  
    // Save new data to localStorage when form is submitted
    registrationForm.addEventListener("submit", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const terms = document.getElementById("terms").checked;
  
      const userData = {
        name,
        email,
        password,
        dob,
        terms,
      };
  
      const existingData = JSON.parse(localStorage.getItem("userData")) || [];
      existingData.push(userData);
      localStorage.setItem("userData", JSON.stringify(existingData));
    });
  });
  