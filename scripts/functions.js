// chatGPT
function getLastLineUserWasOn() {
    var lines = textarea.value.split('\n');
    return lines[textarea.value.substring(0, textarea.selectionStart).split("\n").length - 1];
}

// chatGPT
function autoType(text) {
    const pos = textarea.selectionStart;
    const val = textarea.value;
    textarea.value = val.slice(0, pos) + text + val.slice(pos);
    textarea.selectionStart = textarea.selectionEnd = pos + text.length;
}

// chatGPT
function lowerInstruction(str) {
    let words = str.split(" ");
    words[0] = words[0].toLowerCase();
    return words.join(" ");
}

function downloadFile()
{
    const startFileName = prompt("Filename:")
    if (startFileName !== null)
    {
        const fileName = startFileName + ".casm";

        window.URL = window.URL || window.webkitURL;
        const dlBtn = document.createElement("a");
    
        dlBtn.setAttribute("href", window.URL.createObjectURL(new Blob([textarea.value], {type: 'text/plain'})));
        dlBtn.setAttribute("download", fileName);
    
        document.body.appendChild(dlBtn)
        dlBtn.click()
        dlBtn.remove()
    }
}

function importFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.casm';
  
    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.addEventListener('load', function() {
        textarea.value = reader.result;
      });
  
      reader.readAsText(file);
    });
  
    fileInput.click();
}

function log(text)
{
    document.getElementById("log").innerText += "\n" + text
}
