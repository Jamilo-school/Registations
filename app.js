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
        const searchResults = document.getElementById("searchResults");
        let matches = []; // Store matching indexes in the array.

        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value;
            searchResults.innerHTML = "";
            matches = []; // Reset the matches array.

            if (searchTerm) {
                findMatchingIndexes(searchTerm);
                highlightMatches(searchTerm);
            }
        });

        function findMatchingIndexes(searchTerm) {
            const pageText = document.body.innerText;
            const regExp = new RegExp(searchTerm, "g");
            let match;
            while ((match = regExp.exec(pageText)) !== null) {
                matches.push({ start: match.index, end: match.index + searchTerm.length });
            }
        }

        function highlightMatches(searchTerm) {
            const pageText = document.body.innerText;
            let highlightedText = '';

            let currentIndex = 0;
            for (const match of matches) {
                const beforeMatch = pageText.substring(currentIndex, match.start);
                const matchedText = pageText.substring(match.start, match.end);
                currentIndex = match.end;

                highlightedText += beforeMatch + `<span class="highlight">${matchedText}</span>`;
            }

            // Append any remaining text after the last match.
            highlightedText += pageText.substring(currentIndex);

            searchResults.innerHTML = highlightedText;
        }