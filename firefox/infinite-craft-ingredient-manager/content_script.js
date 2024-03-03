// Handle the dynamic file input and responding to file selection
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "openFileInput") {
        let fileInput = document.createElement('input'); // Dynamically create an input tag and put it in the DOM
        fileInput.type = 'file';                         // Set the input to be a file selector
        fileInput.accept = '.json'                       // Only accept JSON files
        fileInput.style.display = 'none';                // Hide the input element once it's created

        // Handle file selection
        fileInput.addEventListener('change', function () {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];

                const reader = new FileReader();
                reader.onload = (e) => {
                    const jsonData = e.target.result;

                    try {
                        // Parse the JSON data and then stringify it for local storage
                        const data = JSON.parse(jsonData);
                        localStorage.setItem('infinite-craft-data', JSON.stringify(data));

                        // Reload the page so the new data is loaded in the ingredients window
                        browser.runtime.sendMessage({ action: "reloadTab" });
                        sendResponse({ status: 'success', data: 'Data imported successfully.' });
                    } catch (error) {
                        console.error('Error in content script:', error);
                        sendResponse({ status: 'error', error: error.toString() });
                    }
                };
                reader.onerror = (e) => {
                    console.error('Error reading file:', e);
                };
                reader.readAsText(file);
            }
        });

        // Append to the DOM
        document.body.appendChild(fileInput);

        // Programmatically click the file input
        fileInput.click();
    }
});