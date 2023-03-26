function startInterpret()
{
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
        document.getElementById("stepbtn").disabled = true
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
        document.getElementById("stepbtn").disabled = false
    }
    else
    {
        let instructionFull = instructions[pointer].split(" ")
        let instruction = instructionFull[0]
        let params = instructionFull.splice(1)
    
        if (!instruction.startsWith("."))
        {
            INSTRUCTION_LIST[instruction].run(params, pointer).then(ret => {
                if (ret != "END")
                {
                    pointer++
                    if (runType == "stop")
                    {
                        interpreting = false
                        document.getElementById("stepbtn").disabled = false
                        console.timeEnd("PRGM")
                    }
                    if (runType == "normal") requestAnimationFrame(cycle)
                }
                else
                {
                    console.timeEnd("PRGM")
                }
            })
        }
        else
        {
            pointer++
            requestAnimationFrame(cycle) // ignore stepping and go to next instruction
        }
    }
}
