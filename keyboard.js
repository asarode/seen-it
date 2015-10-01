//var skipsToggled = false;

//window.addEventListener("keydown", handleKeyDown, false);
window.addEventListener('keydown', handleHotKey, false);

function handleHotKey(e){
  if (e.keyCode == "90" && e.altKey) { // Pressed z key
    chrome.extension.sendMessage({
      action: 'ToggleSkips'
    });
  } else if (e.keyCode == "88" && e.altKey) { // Pressed x key
    chrome.extension.sendMessage({
      action: 'ToggleStoring'
    });
  }
}

// function handleKeyDown(e) {
//   if ((e.keyCode == "37" || e.keyCode == "39") && e.shiftKey && !skipsToggled){ //Skips haven't been toggled yet
//     chrome.extension.sendMessage({
//       action: 'ToggleSkips'
//     });
//     skipsToggled = true; //Need to add this or any keypress will toggle skips
//   } else if ((e.keyCode == "37" || e.keyCode == "39") && !e.shiftKey && skipsToggled) { //Skips have been toggled and shift is no longer being held down.
//     chrome.extension.sendMessage({
//       action: 'ToggleSkips'
//     });
//     skipsToggled = false;
//   }
// }
