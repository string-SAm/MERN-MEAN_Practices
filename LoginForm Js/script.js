document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault();

        // Get form inputs
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="pswrd"]').value;

        // Perform form validation (you can add more validation as needed)
        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password.");
        } else {
            alert(`Login successful!\nUsername: ${username}\nPassword: ${password}`);
            // Here you can add logic to send the data to the server or navigate to another page
        }
    }

    // Attach the form submission handler to the form
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', handleFormSubmission);

    
          
});

