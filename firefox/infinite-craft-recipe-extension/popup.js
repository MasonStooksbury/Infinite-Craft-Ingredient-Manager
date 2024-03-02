// Export data
document.getElementById('export').addEventListener('click', () => {
    // You must execute the script in the context of the page for which you want to access local storage.
    browser.tabs.executeScript({
        code: `(${inPageContext.toString()})();`
    });

    function inPageContext() {
        // Access the local storage directly because we're now in the page context.
        const data = localStorage.getItem('infinite-craft-data');
        // Communicate the data to the extension's background script or popup script.
        browser.runtime.sendMessage({ type: 'export', data });
    }
});

// document.getElementById('import').addEventListener('click', () => {
//     browser.tabs.executeScript({
//         code: `(${inPageContext.toString()})();`
//     });

//     function inPageContext() {
//         // Communicate the data to the extension's background script or popup script.
//         browser.runtime.sendMessage({ type: 'import', data });
//     }
// });


document.getElementById('fileInput').addEventListener('change', () => {
    console.log('fuck')
});



// // Import data
// document.getElementById('import').addEventListener('click', () => {
//     const input = document.getElementById('fileInput');
//     input.onclick = () => {
//         //   const selectedFile = fileInput.files[0];
//         //   console.log(selectedFile);
//         console.log('it doddddd?')
//     }
//     input.click();
//     // this.value = null;
//     // input.onchange = () => {
//     //     console.log('changed')
//     //     const file = input.files[0];
//     //     if (file) {
//     //         console.log('in this bit')
//     //         const reader = new FileReader();
//     //         reader.onload = (e) => {
//     //             const jsonData = e.target.result;
//     //             browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     //                 browser.tabs.sendMessage(tabs[0].id, { type: 'import', data: jsonData });
//     //             });
//     //             // browser.runtime.sendMessage({ type: 'import', data: jsonData });
//     //         };
//     //         reader.readAsText(file);
//     //     }
//     // };
    
// });




// Export
browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'export') {
        // Use the data from the page context to create a Blob and initiate a download
        const blob = new Blob([message.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        browser.downloads.download({
            url: url,
            filename: 'infinite-craft-data.json'
        }).catch((error) => {
            console.error('Download failed:', error);
        });
    }

    if (message.type === 'import') {
        console.log('woooooo')
    }
});



// browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'import') {
//         console.log('Message received in content script:', message);
//         try {
//             const data = JSON.parse(message.data);
//             localStorage.setItem('infinite-craft-data', JSON.stringify(data));
//             sendResponse({ status: 'success', data: 'Data imported successfully.' });
//         } catch (error) {
//             console.error('Error in content script:', error);
//             sendResponse({ status: 'error', error: error.toString() });
//         }
//     }
//     return true; // keep the messaging channel open for sendResponse
// });
