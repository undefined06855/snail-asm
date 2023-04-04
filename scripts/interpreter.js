function startInterpret()
{
    canvas.style.display = "none"
    canvas.style.width = ""
    canvas.style.aspectRatio = ""
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
        logTop("UNEXPECTED EOF WHILE RUNNING")
        startTime = 0
        endTime = 0
        interpreting = false
        runType = "stop"
        canvas.style.display = "none"
        canvas.classList.remove("square")
        document.getElementById("runbtn").disabled = false
        document.getElementById("stopbtn").disabled = true
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
                builtInVariables.pointer ? variables[builtInVariables.pointer] = pointer : ""
                builtInVariables.time ? variables[builtInVariables.time] = Date.now() - startTime : ""
                builtInVariables.stacklen ? variables[builtInVariables.stacklen] = stack.length : ""
                builtInVariables.variablesLength ? variables[builtInVariables.variablesLength] = variables.length : ""

                if (runType == "stop" || ret == "END" || ret == "ENDTIME")
                {
                    if (ret == "END" || runType == "stop")
                    {
                        interpreting = false
                        document.getElementById("runbtn").disabled = false
                        document.getElementById("stopbtn").disabled = true
                        canvas.style.display = "none"
                    }

                    endTime = Date.now()
                    logTop(`Time taken: ${endTime - startTime}ms`)

                    // carry onto next instruction if only time ended
                    if (ret == "ENDTIME") requestAnimationFrame(cycle)
                }
                else if (runType == "normal") requestAnimationFrame(cycle)
            })
        }
        else if (INSTRUCTION_LIST[instruction] === undefined && !(instruction.startsWith(".") || instruction.startsWith(";")))
        {
            logTop(`UNKNOWN INSTRUCTION: ${instruction}`)
            pointer++ // ignore instruction
            builtInVariables.pointer ? variables[builtInVariables.pointer] = pointer : ""
            requestAnimationFrame(cycle)
        }
        else
        {
            pointer++ // ignore instruction
            builtInVariables.pointer ? variables[builtInVariables.pointer] = pointer : ""
            requestAnimationFrame(cycle)
        }
    }
}

document.addEventListener("keydown", event => {
    builtInVariables.key ? variables[builtInVariables.key] = event.which : ""
})
