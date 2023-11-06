function searchAndDisplay() {
    var searchText = document.getElementById("searchInput").value;
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    // Check if searchText is empty
    if (searchText.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please enter a search term',
        });
        return; // Do nothing if there's no input
    }

    var textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var idCounter = 1;
    var foundMatchingText = false; // Initialize a flag for found text

    while (textNodes.nextNode()) {
        var textNode = textNodes.currentNode;
        var textContent = textNode.textContent;

        if (textContent.includes(searchText)) {
            var resultId = "result" + idCounter;
            var resultElement = document.createElement("p");
            resultElement.innerHTML = `<a href="#${resultId}">${textContent}</a>`;
            resultsContainer.appendChild(resultElement);
            resultElement.id = resultId;
            idCounter++;
            foundMatchingText = true; // Set the flag to true if matching text is found
        }
    }

    if (!foundMatchingText) {
        // If no matching text was found, show an error SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Text Not Found',
        });
    } else {
        // If matching text was found, show a success SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Found Text Matching',
        });
    }
}