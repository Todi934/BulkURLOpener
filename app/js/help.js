/**
 * help.js
 *
 * Code for the help.html page.
 */

/* Event Listeners */

document.getElementById('openFAQ').addEventListener('click', () => {
    openFAQ();
});
document.getElementById('openGithubBug').addEventListener('click', () => {
    openGithubIssues();
});
document.getElementById('openGithubFeature').addEventListener('click', () => {
    openGithubIssues();
});
document.getElementById('openSourceCode').addEventListener('click', () => {
    openGithub();
});
document.getElementById('openChangelog').addEventListener('click', () => {
    openChangelog();
});
document.getElementById('checkForUpdates').addEventListener('click', () => {
    checkForUpdates();
});

/* End Of Event Listeners */

function openFAQ() {
    if (checkHostType() === "firefox") {
        browser.tabs.create({
            active: true,
            'url': browser.extension.getURL('faq.html')
        });
    } else if (checkHostType() === "chrome") {
        chrome.tabs.create({
            'url': chrome.extension.getURL('faq.html')
        });
    } else if (checkHostType() === "electron") {
        window.location.replace('faq.html');
    }
}

function openChangelog() {
    if (checkHostType() === "firefox") {
        browser.tabs.create({
            active: true,
            'url': browser.extension.getURL('changelog.html')
        });
    } else if (checkHostType() === "chrome") {
        chrome.tabs.create({
            'url': chrome.extension.getURL('changelog.html')
        });
    } else if (checkHostType() === "electron") {
        window.location.replace('changelog.html');
    }
}

function openGithub() {
    const githubURL = "https://euan.link/buo-github";
    if (checkHostType() === "electron") {
        const {
            shell
        } = require('electron');
        shell.openExternal(githubURL);
    } else if (checkHostType() === "firefox") {
        browser.tabs.create({
            active: true,
            'url': githubURL
        });
    } else if (checkHostType() === "chrome") {
        chrome.tabs.create({
            'url': githubURL
        });
    }
}

function openGithubIssues() {
    const githubURL = "https://euan.link/buo-issues";
    if (checkHostType() === "electron") {
        const {
            shell
        } = require('electron');
        shell.openExternal(githubURL);
    } else if (checkHostType() === "firefox") {
        browser.tabs.create({
            active: true,
            'url': githubURL
        });
    } else if (checkHostType() === "chrome") {
        chrome.tabs.create({
            'url': githubURL
        });
    }
}

function checkForUpdates() {
    // Setting the version API endpoint
    const versionURL = 'https://version.bulkurlopener.com/';
    // Fetching the JSON from endpoint
    fetch(versionURL)
        .then(res => res.json())
        .then((out) => {
            // Checking if the users version is equal to the version number from API.
            if (out.version === getCurrentVersion()) {
                // User is on latest version
                alert("You're using the newest version!")
            } else {
                // User is not on latest version
                alert(
                    "You're not on the latest version. Please update to: " + out.version + ". Visit the Github " +
                    "(https://github.com/EuanRiggans/BulkURLOpener) or visit the location where you installed the app" +
                    " to find out how to update."
                );
            }
        })
        .catch(err => {
            throw err
        });
}
