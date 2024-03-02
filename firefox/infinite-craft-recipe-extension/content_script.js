browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'import') {
        console.log('woooooo')
    }
    return true; // keep the messaging channel open for sendResponse
});