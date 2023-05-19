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

// chatGPT
function startsWithAnyElement(str, lst) {
    for (let i = 0; i < lst.length; i++) {
        const trimmedElem = lst[i].trim(); // remove whitespace before the element
        if (str.trim().startsWith(trimmedElem)) {
            return true;
        }
    }
    return false;
}

function downloadFile()
{
    const startFileName = prompt("Filename:")
    if (startFileName !== null)
    {
        const fileName = startFileName + ".snail";

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
    fileInput.accept = '.snail';

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
    console.log(`[LOG]: ${text}`)
}

function logTop(text)
{
    document.getElementById("logtop").innerText = text
    console.log(`[LOGTOP]: ${text}`)
}

function openList()
{
    instructionMenuOpen = !instructionMenuOpen
    let list = document.getElementById("instructionList")
    let exitBtn = document.getElementById("instructionExitBtn")

    list.classList.toggle("hidden")
    exitBtn.classList.toggle("hidden")
}

function openSettings()
{
    settingsMenuOpen = !settingsMenuOpen
    let list = document.getElementById("settings")
    let exitBtn = document.getElementById("settingsExitBtn")

    list.classList.toggle("hidden")
    exitBtn.classList.toggle("hidden")
}


// this function was made by DT on discord - thanks!
// it converts a template string to an html element
// like so:
/*

el`div#id.class1.class2`(
    el`p`("Hello world!")
).$({ tabIndex: 1, style: "background: red" })

makes

<div id=​"id" class=​"class1 class2" tabindex=​"1" style=​"background:​ red;​">​<p>​Hello world!​</p>​</div>​
*/
function el(...args) {
    let a = String.template(...args)
    let tag = a.replace(/[#\.][^#\.]+/gm, "").trimEnd().trimStart()
    let id = a.match(/[#][^#\.]+/gm)
    let classes = a.match(/[\.][^#\.]+/gm)
    let elem = document.createElement(tag)
    if (id) elem.id = id.join(" ").replaceAll("#","")
    if (classes) elem.className = classes.join(" ").replaceAll(".","")
    elem.$ = function(props) {
        for (const [k,v] of Object.entries(props) ) {
            elem[k]=v
        }
        return elem
    }
    return function(...e) {
        elem.append(...e)
        return elem
    }
}
String.template = (...args) => {
    let ret = ``
    for (const part of args) { ret += part }
    return ret
}

function resetVars()
{
    canvas.style.display = "none"
    canvas.classList.remove("square")
    variables = {}
    builtInVariables = {
        key: null,
        time: null,
        pointer: null,
        stacklen: null,
        variableslength: null
    }

    pointer = 0
    stack = []
    loadedVar = ""
    currentPauseId = -1

    interpreting = true
    fast = false

    stoppedTimer = false
}
