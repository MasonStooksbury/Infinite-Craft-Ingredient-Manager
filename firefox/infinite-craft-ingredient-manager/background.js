browser.runtime.onMessage.addListener((message) => {
    // Take the data from local storage and download it
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

    // Reload page (after import)
    if (message.action === "reloadTab") {
        browser.tabs.reload(sender.tab.id);
    }
});