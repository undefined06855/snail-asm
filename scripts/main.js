textarea.addEventListener("keydown", event => {
    // typing helper

    // ctrl+x and user isnt selecting anything, delete current line
    if (event.code == "KeyX" && event.ctrlKey && document.getSelection().toString() == "")
    {
        navigator.clipboard.writeText(getCurrentLineContents() + "\n")
        let position = getCursorPosition()
        removeLine(getCursorLine())
        setCursor(position)

        event.preventDefault()
    }

    if (event.code == "Tab" && !event.shiftKey)
    {
        autoType(" ".repeat(user.tabSize))

        event.preventDefault()
    }

    if (event.repeat) return // if statements after this line do not get triggered on repeat

    if (event.code == "Enter")
    {
        const exitKeywords = ["rts", "jmp", "end"]

        if (getCurrentLineContents().trim().charAt(0) == ".")
        {
            let currentTabSize = getCurrentLineContents().search(/\S/)
            // just typed a subroutine char or something
            autoType("\n")
            autoType(" ".repeat(currentTabSize + user.tabSize))

            event.preventDefault()
        }
        else if (startsWithAnyElement(getCurrentLineContents(), exitKeywords))
        {
            // exited from subroutine - type spaces but like dont at the same time idk
            let prevLineTabSize = getCurrentLineContents(-1).search(/\S/)
            let thisLineTabSize;
            if (prevLineTabSize - user.tabSize < 0) thisLineTabSize = 0
            else                                    thisLineTabSize = prevLineTabSize - user.tabSize
            
            autoType("\n")
            autoType(" ".repeat())
        }
        else if (getCurrentLineContents().match(/^ +/i)) // match any amount of whitespace before the string
        {
            let currentTabSize = getCurrentLineContents().search(/\S/)
            // currently typing in a subroutine or something
            autoType("\n")
            autoType(" ".repeat(currentTabSize))

            event.preventDefault()
        }
    }
})

document.addEventListener("keydown", event => {
    if (event.repeat) return // trying to implement things like this more often so there isn't a million nested ifs
        
    if (event.code == "Escape")
    {
        event.preventDefault()
        // close any open menus
        if (instructionMenuOpen) openList()
    }

    // start interpret
    if (event.code == "F5" || event.code == "F6")
    {
        event.preventDefault()
        runType = "normal"
        startInterpret()
    }
})

let tabSizeInput = document.getElementById("tabSizeInput")
tabSizeInput.addEventListener("keydown", event => {
    let allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    if (allowedKeys.includes(event.key))
    {
        // yeah you can type that
        tabSizeInput.value = event.key
        user.tabSize = Number(tabSizeInput.value)
    }

    event.preventDefault()
})



let list = document.getElementById("instructionList")

// add instruction list
let currentGroupId = 0
for (const name of Object.keys(INSTRUCTION_LIST))
{
    // add spacer and new title if needed
    if (name == INSTRUCTION_GROUPS[currentGroupId].from)
    {
        list.appendChild(el`div.spacer`())

        if (currentGroupId != 0)
        {
            list.appendChild(el`div.spacer`())
            list.appendChild(el`div.spacer`())
        }


        list.appendChild(el`div.sectionTitle`(
            el`h1`(
                INSTRUCTION_GROUPS[currentGroupId].name
            ).$({style: "font-weight: bold"})
        ))

        if (currentGroupId + 1 != INSTRUCTION_GROUPS.length) currentGroupId++
    }

    const instr = INSTRUCTION_LIST[name]

    const nameel = el`h2`(name + " ")
    list.appendChild(nameel)

    if (instr.params != "") nameel.appendChild(el`p.code`(instr.params))

    if (instr.desc.indexOf("[warn]") == -1) list.appendChild(el`p`(instr.desc))
    else
    {
        let description = instr.desc
        description = description.replace("[warn]", "")
        list.appendChild(el`p.warning`(description))
    }

    if (name == "setc")
    {
        // add descriptions of values setc can be
        let descriptionsWrapper = el`ul`()

        for (let [descriptionName, description] of Object.entries(builtInVariableDescriptions))
        {
            descriptionsWrapper.appendChild(el`li`(
                el`p.code`(descriptionName),
                el`p.inline.font`(": " + description)
            ))
        }

        list.appendChild(descriptionsWrapper)
        
    }

    list.appendChild(el`div.spacer`())
}
