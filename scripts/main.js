textarea.addEventListener("keydown", event => {
    if (!event.repeat)
    {
        if (event.code == "Enter")
        {
            const exitKeywords = ["rts", "jmp"]

            if (getLastLineUserWasOn().charAt(0) == ".")
            {
                // just typed a subroutine char or something
                autoType("\n")
                autoType(" ".repeat(tabSize))
    
                event.preventDefault()
            }
            else if (startsWithAnyElement(getLastLineUserWasOn(), exitKeywords))
            {
                // exited from subroutine - dont type the spaces!

                // i might use this later so ill keep it just in case
            }
            else if (getLastLineUserWasOn().substring(0, tabSize) == " ".repeat(tabSize))
            {
                // currently typing in a subroutine or something
                autoType("\n")
                autoType(" ".repeat(tabSize))
    
                event.preventDefault()
            }
        }

        else if (event.code == "Tab" && !event.shiftKey)
        {
            event.preventDefault()
            autoType(" ".repeat(tabSize))
        }
    }
})

document.addEventListener("keydown", event => {
    if (event.code == "Escape")
    {
        event.preventDefault()
        if (settingsMenuOpen) openSettings()
        if (instructionMenuOpen) openList()
    }
})

let list = document.getElementById("instructionList")

let currentGroupId = 0
for (const name of Object.keys(INSTRUCTION_LIST))
{
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

    list.appendChild(el`p`(instr.desc))

    list.appendChild(el`div.spacer`())
}
