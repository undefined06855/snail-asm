function startInterpret()
{
    resetVars()

    logTop("Running...")

    instructions = textarea.value.split("\n")
    for (var id = 0; id < instructions.length; id++)
    {
        let instruction = instructions[id]
        instructions[id] = lowerInstruction(instruction.trim())
        if (instructions[id] == "" || instructions[id].startsWith(";"))
        {
            instructions.splice(id, 1)
            id -= 1 // bad practice butttttt
        }
    }

    if (runType == "normal")
    {
        document.getElementById("runbtn").disabled = true
        document.getElementById("stopbtn").disabled = false
        startTime = Date.now()
    }

    requestAnimationFrame(cycle)
}

function cycle()
{
    if (pointer == instructions.length)
    {
        interpretError("ERR_EOF")
    }
    else
    {
        let instructionFull = instructions[pointer].split(" ")
        let instruction = instructionFull[0]
        let params = instructionFull.splice(1)
    
        if (!(instruction.startsWith(".") || instruction.startsWith(";") || INSTRUCTION_LIST[instruction] === undefined))
        {
            INSTRUCTION_LIST[instruction]
            .run(params, pointer)
            .then(ret => {
                pointer++

                builtInVariables.pointer ? variables[builtInVariables.pointer] = pointer                          : ""
                builtInVariables.time ? variables[builtInVariables.time] = Date.now() - startTime                 : ""
                builtInVariables.stacklen ? variables[builtInVariables.stacklen] = stack.length                   : ""
                builtInVariables.variablesLength ? variables[builtInVariables.variablesLength] = variables.length : ""

                // error handling is done by the instruction, only the EOF error is handled by the cycle function

                if (runType == "stop" || ret == "END" || ret == "ENDTIME")
                {
                    if (ret == "END" || runType == "stop")
                    {
                        interpreting = false
                        document.getElementById("runbtn").disabled = false
                        document.getElementById("stopbtn").disabled = true
                        canvas.style.display = "none"
                    }

                    if (!stoppedTimer)
                    {
                        endTime = Date.now()
                        logTop(`Time taken: ${endTime - startTime}ms`)
                    }

                    if (ret == "ENDTIME") stoppedTimer = true

                    // carry onto next instruction if only time ended
                    if (ret == "ENDTIME") requestAnimationFrame(cycle)
                }

                else if (runType == "normal" && fast) cycle()
                else if (runType == "normal" && !fast) requestAnimationFrame(cycle)
            })
        }
        else if (INSTRUCTION_LIST[instruction] === undefined && !(instruction.startsWith(".")))
        {
            logTop(`UNKNOWN INSTRUCTION: ${instruction}`)
            pointer++ // ignore instruction
            builtInVariables.pointer ? variables[builtInVariables.pointer] = pointer : ""

            if (fast) cycle()
            else requestAnimationFrame(cycle)
        }
        else
        {
            pointer++ // ignore instruction (it is a subroutine)
            builtInVariables.pointer ? variables[builtInVariables.pointer] = pointer : ""
            if (fast) cycle()
            else requestAnimationFrame(cycle)
        }
    }
}

// update builtInVariable "key"
document.addEventListener("keydown", event => {
    builtInVariables.key ? variables[builtInVariables.key] = event.which : ""
})


function interpretError(errorCode)
{
    logTop(errorCodes[errorCode])
    resetVars()
    document.getElementById("runbtn").disabled = false
    document.getElementById("stopbtn").disabled = true
}
