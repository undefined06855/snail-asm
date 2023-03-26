textarea.addEventListener("keydown", event => {
    if (!event.repeat)
    {
        if (event.code == "Enter")
        {
            if (event.ctrlKey && !event.shiftKey)
            {
                runType = "normal"
                startInterpret()
                event.preventDefault()
            }
            else if (event.ctrlKey && event.shiftKey)
            {
                if (runType == "step")
                {
                    requestAnimationFrame(cycle)
                }
                else
                {
                    runType = "step"
                    startInterpret()
                    event.preventDefault()
                }
            }
            // newline: do stuf:
            else if (getLastLineUserWasOn().charAt(0) == ".")
            {
                // just typed a subroutine char or something
                autoType("\n")
                autoType(" ".repeat(tabSize))
                console.log("typed subr")
    
                event.preventDefault()
            }
            else if (getLastLineUserWasOn().substring(0, tabSize + 3) == " ".repeat(tabSize) + "rts" || getLastLineUserWasOn().substring(0, tabSize + 3) == " ".repeat(tabSize) + "jmp")
            {
                // exited from subroutine - dont type the spaces!
                console.log("exited subr")
            }
            else if (getLastLineUserWasOn().substring(0, tabSize) == " ".repeat(tabSize))
            {
                // currently typing in a subroutine or something
                autoType("\n")
                autoType(" ".repeat(tabSize))
                console.log("typed in subr")
    
                event.preventDefault()
            }
        }
        else if (event.code == "KeyS" && event.ctrlKey && event.shiftKey)
        {
            downloadFile()
            event.preventDefault()
        }
        else if (event.code == "KeyO" && event.ctrlKey && event.shiftKey)
        {
            importFile()
            event.preventDefault()
        }
    }
})
