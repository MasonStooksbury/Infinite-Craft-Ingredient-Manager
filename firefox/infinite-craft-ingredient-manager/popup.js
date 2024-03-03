// Grab the data from local storage and send it to the background script for processing
document.getElementById('export').addEventListener('click', () => {
    // You must execute the script in the context of the page for which you want to access local storage.
    browser.tabs.executeScript({
        code: `(${inPageContext.toString()})();`
    });

    function inPageContext() {
        // Access the local storage directly because we're now in the page context
        let data = localStorage.getItem('infinite-craft-data');

        // Communicate the data to the extension's background script
        browser.runtime.sendMessage({ type: 'export', data });
    }
});



// Call the background script for processing
document.getElementById('import').addEventListener('click', function () {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { action: "openFileInput"});
    });
});