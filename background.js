console.log('omnibox extension version 1');
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  console.log('the user typed "' + text + '"');

  suggest([
    { content: 'p red', description: 'highlight all the ps in red' },
    { content: 'div orange', description: 'highlight all the divs in orange' },
    { content: 'img hotpink', description: 'highlight all the imgs in hotpink' }
  ]);
});

chrome.omnibox.setDefaultSuggestion({
  description: "type tag name and color name, seperated by a space"
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  console.log('the user entered: "' + text + '"');
    chrome.tabs.executeScript({
      code: `
      var str = "${text}";
      var res = str.split(" ", 2);
      var eles = document.getElementsByTagName(res[0]);
      for (var ele of eles) {
        ele.style.border = "1px solid " + res[1];
      }
      `
    });
});
