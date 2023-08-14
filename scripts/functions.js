// chatGPT
function getCurrentLineContents() {
    let lines = textarea.value.split("\n");
    return lines[getCursorLine()];
}

function removeLine(line)
{
    let lines = textarea.value.split("\n")
    lines.splice(line, 1)
    textarea.value = lines.join("\n")
}

function getCursorLine()
{
    return (textarea.value.substring(0, textarea.selectionStart).split("\n").length) - 1
}

function getCursorPosition()
{
    return textarea.selectionStart
}

function setCursor(line)
{
    textarea.setSelectionRange(line, line, "none")
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

// lzw lossless text compression algorithm
// https://gist.github.com/JavaScript-Packer/bbf68a4dc0e1fd102221

// encode
function en(c){var x="charCodeAt",b,e={},f=c.split(""),d=[],a=f[0],g=256;for(b=1;b<f.length;b++)c=f[b],null!=e[a+c]?a+=c:(d.push(1<a.length?e[a]:a[x](0)),e[a+c]=g,g++,a=c);d.push(1<a.length?e[a]:a[x](0));for(b=0;b<d.length;b++)d[b]=String.fromCharCode(d[b]);return d.join("")}

// decode
function de(b){var a,e={},d=b.split(""),c=f=d[0],g=[c],h=o=256;for(b=1;b<d.length;b++)a=d[b].charCodeAt(0),a=h>a?d[b]:e[a]?e[a]:f+c,g.push(a),c=a.charAt(0),e[o]=f+c,o++,f=a;return g.join("")}

function downloadFile()
{
    const initialName = prompt("Filename:")
    if (initialName !== null)
    {
        const fileName = initialName + ".snail";

        window.URL = window.URL || window.webkitURL;
        const dlBtn = document.createElement("a");
    
        dlBtn.setAttribute("href", window.URL.createObjectURL(new Blob([(
              VERSION
            + "\n"
            + en(textarea.value)
        )], {type: 'text/plain'})));
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
            let [version, ...content] = reader.result.split("\n")
            let loadOld = true

            if (Number(version) < Number(VERSION)) loadOld = confirm("This script was made for an older version of snail. Load anyway?")
            
            if (loadOld) textarea.value = de(content.join("\n"));
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
function el(...args) {let a=String.template(...args),t=a.replace(/[#\.][^#\.]+/gm,"").trimEnd().trimStart(),i=a.match(/[#][^#\.]+/gm),c=a.match(/[\.][^#\.]+/gm),l=document.createElement(t);if(i)l.i=i.join(" ").replaceAll("#","");if(c)l.className=c.join(" ").replaceAll(".","");l.$=function(p){for(const[k,v]of Object.entries(p)){l[k]=v}return l};return function(...e){l.append(...e);return l}}
String.template = (...args) => {
    let ret = ""
    for (const part of args) { ret += part }
    return ret
}

function resetVars()
{
    canvas.style.display = "none"
    canvas.classList.remove("square")
    variables = {}
    
    // resets some values of builtInVariables
    Object.assign(builtInVariables, {
        key: null,
        time: null,
        pointer: null,
        stacklen: null,
        variableslen: null
    })

    pointer = 0
    stack = []
    loadedVar = ""
    currentPauseId = -1

    interpreting = true
    fast = false

    timerStopped = false
}
