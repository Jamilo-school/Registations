const scriptURL = 'https://script.google.com/macros/s/AKfycbyefqfqskFC2lfy8cm-TCqAYf1BHoeb91nyuGKqn29B5YzhGmZbsN78W4qqTG3UgnFv9A/exec';
const form = document.forms['submit-to-google-sheet'];
const userNameDisplay = document.getElementById('userNameDisplay'); // Get the element for displaying the user's name
let submittedData = JSON.parse(localStorage.getItem('submittedData')) || []; // Retrieve data from local storage

// Function to update local storage with submitted data
function updateLocalStorage() {
  localStorage.setItem('submittedData', JSON.stringify(submittedData));
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameInput = form.querySelector('input[name="Official name"]').value;
  const gradeInput = form.querySelector('select[name="Grade"]').value;
  const idNumberInput = form.querySelector('input[name="idNumber"]').value; // Get the ID number input value

  // Check if the same name, class, and ID number combination already exists
  const exists = submittedData.some(entry => entry.name === nameInput && entry.grade === gradeInput && entry.idNumber === idNumberInput);

  if (exists) {
    Swal.fire({
      title: 'Duplicate Entry',
      text: 'A duplicate entry for the same name, class, and ID number has been detected. Do you want to proceed?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel',
      footer: 'Powered by Mr. Oduor Macro' // Add the footer here
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with the submission
        Swal.fire({
          title: '🧑‍⚕️Submitting...',
          text: 'Please wait',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
            Swal.close();
            if (response.status === 200) {
              // Display the user's name, ID number on a new line, and in uppercase in the success popup
              Swal.fire({
                title: 'Success!',
                html: `Submission Successful!<br><span style="text-transform: uppercase;">Name: ${nameInput}</span><br><span style="text-transform: uppercase;">ID Number: ${idNumberInput}</span>`,
                icon: 'success',
                footer: 'Powered by Mr. Oduor Macro' // Add the footer here
              });
              form.reset();
              // Add the submitted data to the array
              submittedData.push({ name: nameInput, grade: gradeInput, idNumber: idNumberInput });
              updateLocalStorage(); // Update local storage
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Submission Failed',
                icon: 'error',
                footer: 'Powered by Mr. Oduor Macro' // Add the footer here
              });
            }
          })
          .catch(error => {
            console.error('Error!', error.message);
            Swal.close();
            Swal.fire({
              title: 'Error!',
              text: 'Submission Failed',
              icon: 'error',
              footer: 'Powered by Mr. Oduor Macro' // Add the footer here
            });
          });
      }
    });
  } else {
    Swal.fire({
      title: '🧑‍⚕️Submitting...',
      text: 'Please wait',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        Swal.close();
        if (response.status === 200) {
          // Display the user's name, ID number on a new line, and in uppercase in the success popup
          Swal.fire({
            title: 'Success!',
            html: `Submission Successful!<br><span style="text-transform: uppercase;">Name: ${nameInput}</span><br><span style="text-transform: uppercase;">ID Number: ${idNumberInput}</span>`,
            icon: 'success',
            footer: 'Powered by Mr. Oduor Macro' // Add the footer here
          });
          form.reset();
          // Add the submitted data to the array
          submittedData.push({ name: nameInput, grade: gradeInput, idNumber: idNumberInput });
          updateLocalStorage(); // Update local storage
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Submission Failed',
            icon: 'error',
            footer: 'Powered by Mr. Oduor Macro' // Add the footer here
          });
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        Swal.close();
        Swal.fire({
          title: 'Error!',
          text: 'Submission Failed. Please check your internet Connection',
          icon: 'error',
          footer: 'Powered by Mr. Oduor Macro' // Add the footer here
        });
      });
  }
});










const searchInput = document.getElementById("searchInput");
const content = document.getElementById("content");
const showDetailsButton = document.getElementById("showDetailsButton");
let currentMatch = null;

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const pageText = content.textContent.toLowerCase();

    if (searchTerm) {
        const regExp = new RegExp(searchTerm, "g");
        const markedText = pageText.replace(regExp, (match) => {
            // Create an anchor link with SweetAlert popup for matched word
            const anchorLink = `<a href="#" onclick="showPopup('${match}');">${match}</a>`;
            currentMatch = match;
            showDetailsButton.style.display = "block";
            return `<mark>${anchorLink}</mark>`;
        });
        content.innerHTML = markedText;
    } else {
        // If the search input is empty, reset the content to its original state.
        content.innerHTML = pageText;
        currentMatch = null;
        showDetailsButton.style.display = "none";
    }
});

showDetailsButton.addEventListener("click", function () {
    if (currentMatch) {
        showPopup(currentMatch);
    }
});

function showPopup(word) {
    const fullDetails = getFullDetails(word); // Replace this with your own function to retrieve details for the word.
    Swal.fire({
        title: 'Matched Word Details',
        html: fullDetails,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            navigateToWord(word);
            window.location.reload(); // Reload the page after clicking "OK"
        }
    });
}

function getFullDetails(word) {
    // Replace this with your own function to retrieve details for the word.
    return `Full details for the word "${word}" go here.`;
}

function navigateToWord(word) {
    // Implement navigation to the selected word, e.g., by scrolling to it.
    const element = document.querySelector(`[name="${word}"]`);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}