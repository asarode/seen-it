var skipsToggled = false;

window.addEventListener("keydown", handleKeyUpDown, false);
window.addEventListener("keypress", handleKeyPress, false);
window.addEventListener("keyup", handleKeyUpDown, false);

function handleKeyPress(e){
  if (e.keyCode == "122") {//Pressed z key 
    chrome.extension.sendMessage({
      action: 'ToggleSkips'
    });
  } else if (e.keyCode == "120") {//Pressed x key
    chrome.extension.sendMessage({
      action: 'ToggleStoring'
    });
  }
}

function handleKeyUpDown(e) {
  if (e.shiftKey && !skipsToggled){ //Skips haven't been toggled yet
    chrome.extension.sendMessage({
      action: 'ToggleSkips'
    });
    skipsToggled = true; //Need to add this or any keypress will toggle skips
  } else if (!e.shiftKey && skipsToggled) { //Skips have been toggled and shift is no longer being held down.
    chrome.extension.sendMessage({
      action: 'ToggleSkips'
    });
    skipsToggled = false;
  }
}