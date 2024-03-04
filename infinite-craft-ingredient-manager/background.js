chrome.runtime.onMessage.addListener((message) => {
    // Take the data from local storage and download it
    if (message.type === 'export') {
        // Use the data from the page context to create a Blob and initiate a download
        const blob = new Blob([message.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: 'infinite-craft-data.json'
        }).catch((error) => {
            console.error('Download failed:', error);
        });
    }

    // Reload page (after import)
    if (message.action === "reloadTab") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
        
    }
});