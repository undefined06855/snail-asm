function startInterpret()
{
    canvas.style.display = "none"
    variables = {}
    pointer = 0
    stack = []
    loadedVar = ""

    interpreting = true

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
        console.time("PRGM")
    }
    requestAnimationFrame(cycle)
}

function cycle()
{
    if (pointer == instructions.length)
    {
        console.error("UNEXPECTED EOF WHILE RUNNING")
        interpreting = false
        runType = "stop"
        canvas.style.display = "none"
        document.getElementById("runbtn").disabled = false
        document.getElementById("stopbtn").disabled = true
    }
    else
    {
        let instructionFull = instructions[pointer].split(" ")
        let instruction = instructionFull[0]
        let params = instructionFull.splice(1)
    
        if (!(instruction.startsWith(".") || INSTRUCTION_LIST[instruction] === undefined))
        {
            INSTRUCTION_LIST[instruction]
            .run(params, pointer)
            .then(ret => {
                pointer++
                if (runType == "stop" || ret == "END")
                {
                    interpreting = false
                    document.getElementById("runbtn").disabled = false
                    document.getElementById("stopbtn").disabled = true
                    canvas.style.display = "none"
                    console.timeEnd("PRGM")
                }
                else if (runType == "normal") requestAnimationFrame(cycle)
            })
        }
        else
        {
            pointer++
            requestAnimationFrame(cycle) // ignore stepping and go to next instruction
        }
    }
}
