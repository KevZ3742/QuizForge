var contextMenuItem = {
    "id": "quizForge",
    "title": "QuizForge",
    "contexts": ["selection"]
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
    console.log("here")
    if (clickData.menuItemId === "quizForge" && clickData.selectionText) {
        // Do stuff
    }
});