const INSTRUCTION_LIST = {
    ldv: {
        desc: "Load a variable to be modified.",
        params: "<variable:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                loadedVar = params[0]
                resolve("NONE")
            })
        }
    },
    nop: {
        desc: "This does nothing. Can be used to increase pointer or delay by a small amount.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                resolve("NONE") // immediately resolve
            })
        }
    },
    js: {
        desc: "[warn]Executes custom javascript code.",
        params: "...<code:string>",
        run: (params, line) => {
            return new Promise(resolve => {
                eval(params.join(" ")) // evaluate javascript
                resolve("NONE")
            })
        }
    },
    pse: {
        desc: "Pauses the program for some amount of milliseconds.",
        params: "<time:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                currentPauseId = setTimeout(() => {
                    resolve("NONE")
                }, Number(params[0]))
            })
        }
    },
    psev: {
        desc: "Pauses the program for a variable's amount of milliseconds.",
        params: "<time:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                currentPauseId = setTimeout(() => {
                    resolve("NONE")
                }, variables[params[0]])
            })
        }
    },
    log: {
        desc: "Logs a string.",
        params: "...<log:string>",
        run: (params, line) => {
            return new Promise(resolve => {
                log(params.join(" "))
                resolve("NONE")
            })
        }
    },
    logv: {
        desc: "Logs the currently loaded variable.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                log(variables[loadedVar])
                resolve("NONE")
            })
        }
    },
    logn: {
        desc: "Logs the currently loaded variable's name.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                log(loadedVar)
                resolve("NONE")
            })
        }
    },
    setc: {
        desc: "Sets the currently loaded variable to be a built in value which updates every instruction.\nThe possible values can be:",
        params: "<builtinvalue:string>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = -1
                builtInVariables[params[0]] = loadedVar
                resolve("VARCHANGE")
            })
        }
    },
    endtime: {
        desc: "Ends the program timer without stopping the program.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                resolve("ENDTIME")
            })
        }
    },
    clearlog: {
        desc: "Clears the log.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                document.getElementById("log").innerText = ""
                resolve("NONE")
            })
        }
    },
    fast: {
        desc: "Switches the program to fast mode, which runs every instruction without refreshing the screen. Make sure to include upd instructions, else your program may freeze!",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                fast = true
                resolve("NONE")
            })
        }
    },
    upd: {
        desc: "Refreshes the window. Only used in fast mode, see the fast instruction for more information.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                let nextInstruction = () => {
                    resolve("NONE")
                }

                requestAnimationFrame(nextInstruction)
            })
        }
    },
    end: {
        desc: "Ends the program.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                resolve("END")
            })
        }
    },


    set: {
        desc: "Sets the loaded variable to a value.",
        params: "<value:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Number(params[0])
                resolve("VARCHANGE")
            })
        }
    },
    setv: {
        desc: "Sets the loaded variable to another variable.",
        params: "<variable:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = variables[params[0]]
                resolve("VARCHANGE")
            })
        }
    },
    rand: {
        desc: "Sets the loaded variable to a random integer between 0 and the maximum.",
        params: "<max:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.floor(Math.random() * Number(params[0]))
                resolve("VARCHANGE")
            })
        }
    },
    randv: {
        desc: "Sets the loaded variable to a random integer between 0 and a variable.",
        params: "<max:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.floor(Math.random() * variables[params[0]])
                resolve("VARCHANGE")
            })
        }
    },
    add: {
        desc: "Adds the loaded variable to a value.",
        params: "<value:number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] += Number(params[0]); resolve("VARCHANGE")})}
    },
    sub: {
        desc: "Subtracts the loaded variable by a value.",
        params: "<value:number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] -= Number(params[0]); resolve("VARCHANGE")})}
    },
    mul: {
        desc: "Multiplies the loaded variable by a value.",
        params: "<value:number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] *= Number(params[0]); resolve("VARCHANGE")})}
    },
    div: {
        desc: "Divides the loaded variable by a value.",
        params: "<value:number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] /= Number(params[0]); resolve("VARCHANGE")})}
    },

    addv: {
        desc: "Adds the loaded variable to another variable.",
        params: "<variable:variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] += variables[params[0]]; resolve("VARCHANGE")})}
    },
    subv: {
        desc: "Subtracts the loaded variable by another variable.",
        params: "<variable:variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] -= variables[params[0]]; resolve("VARCHANGE")})}
    },
    mulv: {
        desc: "Multiplies the loaded variable by another variable.",
        params: "<variable:variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] *= variables[params[0]]; resolve("VARCHANGE")})}
    },
    divv: {
        desc: "Divides the loaded variable by another variable.",
        params: "<variable:variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] /= variables[params[0]]; resolve("VARCHANGE")})}
    },
    sin: {
        desc: "Gets the sine of a variable and puts the result in the loaded variable.",
        params: "<variable:variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] = Math.sin(variables[params[0]]); resolve("VARCHANGE")})}
    },
    cos: {
        desc: "Gets the cosine of a variable and puts the result in the loaded variable.",
        params: "<variable:variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] = Math.cos(variables[params[0]]); resolve("VARCHANGE")})}
    },
    pow: {
        desc: "Puts the currently loaded variable to the power of a value",
        params: "<power:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] **= Number(params[0])
                resolve("VARCHANGE")
            })
        }
    },
    powv: {
        desc: "Puts the currently loaded variable to the power of another variable",
        params: "<power:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] **= variables[params[0]]
                resolve("VARCHANGE")
            })
        }
    },
    round: {
        desc: "Rounds the currently loaded variable to the nearest whole number.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.round(variables[loadedVar])
                resolve("VARCHANGE")
            })
        }
    },
    floor: {
        desc: "Rounds down the currently loaded variable to the nearest whole number.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.floor(variables[loadedVar])
                resolve("VARCHANGE")
            })
        }
    },
    ceil: {
        desc: "Rounds up the currently loaded variable to the nearest whole number.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.floor(variables[loadedVar])
                resolve("VARCHANGE")
            })
        }
    },
    sqrt: {
        desc: "Gets the square root of the currently loaded variable",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.sqrt(variables[loadedVar])
                resolve("VARCHANGE")
            })
        }
    },
    abs: {
        desc: "Gets the absolute of the currently loaded variable",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Math.abs(variables[loadedVar])
                resolve("VARCHANGE")
            })
        }
    },


    jmp: {
        desc: "Jumps to another part of the code.",
        params: "<routine:subroutine>",
        run: (params, line) => {
            return new Promise(resolve => {
                pointer = jump(params[0])
                resolve("CHANGELINE")
            })
        }
    },
    jeq: {
        desc: "Jumps if the loaded variable equals a value.",
        params: "<routine:subroutine> <value:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] == Number(params[1]))
                {
                    pointer = jump(params[0])
                    resolve("CHANGELINE")
                }
                else resolve("NONE")
            })
        }
    },
    jeqv: {
        desc: "Jumps if the loaded variable equals a variable.",
        params: "<routine:subroutine> <value:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] == variables[params[1]])
                {
                    pointer = jump(params[0])
                    resolve("CHANGELINE")
                }
                else resolve("NONE")
            })
        }
    },
    jls: {
        desc: "Jumps if the loaded variable is less than a value.",
        params: "<routine:subroutine> <value:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] < Number(params[1]))
                {
                    pointer = jump(params[0])
                    resolve("CHANGELINE")
                }
                else resolve("NONE")
            })
        }
    },
    jlsv: {
        desc: "Jumps if the loaded variable is less than a variable.",
        params: "<routine:subroutine> <value:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] < variables[params[1]])
                {
                    pointer = jump(params[0])
                    resolve("CHANGELINE")
                }
                else resolve("NONE")
            })
        }
    },
    jgr: {
        desc: "Jumps if the loaded variable is greater than a value.",
        params: "<routine:subroutine> <value:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] > Number(params[1]))
                {
                    pointer = jump(params[0])
                    resolve("CHANGELINE")
                }
                else resolve("NONE")
            })
        }
    },
    jgrv: {
        desc: "Jumps if the loaded variable is greater than a variable.",
        params: "<routine:subroutine> <value:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] > variables[params[1]])
                {
                    pointer = jump(params[0])
                    resolve("CHANGELINE")
                }
                else resolve("NONE")
            })
        }
    },
    jsr: {
        desc: "Jumps to a subroutine, and can jump back later with an rts instruction.",
        params: "<routine:subroutine>",
        run: (params, line) => {
            return new Promise(resolve => {
                stack.push(line)
                pointer = jump(params[0])
                resolve("CHANGELINE")
            })
        }
    },
    rts: {
        desc: "Returns from a subroutine.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                if (stack.length == 0) 
                {
                    interpretError("ERR_STACK")
                    resolve("FORCEEND")
                }
                pointer = stack[stack.length - 1]
                stack.pop()
                resolve("CHANGELINE")
            })
        }
    },
    pop: {
        desc: "Pops the most recent address off of the stack.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                if (stack.length == 0) 
                {
                    interpretError("ERR_STACK")
                    resolve("FORCEEND")
                }
                stack.pop()
                resolve("NONE")
            })
        }
    },
    stk: {
        desc: "Adds a line number to the stack.",
        params: "<line:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                stack.push(Number(params[0]))
                resolve("NONE")
            })
        }
    },
    stkv: {
        desc: "Adds a variable line number to the stack.",
        params: "<line:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                stack.push(variables[params[0]])
                resolve("NONE")
            })
        }
    },


    canvas: {
        desc: "Enables the canvas.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                canvas.style.display = "block"
                resolve("SCREENUPDATE")
            })
        }
    },
    clr: {
        desc: "Clears the canvas.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                resolve("SCREENUPDATE")
            })
        }
    },
    setsquare: {
        desc: "Makes the canvas square.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                canvas.classList.add("square")
                resolve("NONE")
            })
        }
    },
    setsize: {
        desc: "Sets the size of the canvas.",
        params: "<width:number> <height:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                canvas.width = params[0]
                canvas.height = params[1]
                resolve("SCREENUPDATE")
            })
        }
    },
    setsizev: {
        desc: "Sets the size of the canvas to the values of two variables.",
        params: "<width:variable> <height:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                canvas.width = variables[params[0]]
                canvas.height = variables[params[1]]
                resolve("SCREENUPDATE")
            })
        }
    },
    setcolrgb: {
        desc: "Sets the current pixel color in RGB.",
        params: "<red:number> <green:number> <blue:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillStyle = "rgb(" + params[0] + ", " + params[1] + ", " + params[2] + ")"
                resolve("NONE")
            })
        }
    },
    setcolrgbv: {
        desc: "Sets the current pixel color to the values of three variables in RGB.",
        params: "<red:variable> <green:variable> <blue:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillStyle = "rgb(" + variables[params[0]] + ", " + variables[params[1]] + ", " + variables[params[2]] + ")"
                resolve("NONE")
            })
        }
    },
    setcolhsl: {
        desc: "Sets the current pixel color in HSL.",
        params: "<hue:number> <saturation:number> <lightness:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillStyle = "hsl(" + params[0] + ", " + params[1] + "%, " + params[2] + "%)"
                resolve("NONE")
            })
        }
    },
    setcolhslv: {
        desc: "Sets the current pixel color to the values of three variables in HSL.",
        params: "<hue:variable> <saturation:variable> <lightness:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillStyle = "hsl(" + variables[params[0]] + ", " + variables[params[1]] + "%, " + variables[params[2]] + "%)"
                resolve("NONE")
            })
        }
    },
    spx: {
        desc: "Sets a pixel on the screen.",
        params: "<x:number> <y:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillRect(Number(params[0]), Number(params[1]), 1, 1)
                resolve("SCREENUPDATE")
            })
        }
    },
    spxv: {
        desc: "Sets the coordinate of two variables' pixel on the screen.",
        params: "<x:variable> <y:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillRect(variables[params[0]], variables[params[1]], 1, 1)
                resolve("SCREENUPDATE")
            })
        }
    },
    fill: {
        desc: "Fills the canvas.",
        params: "",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                resolve("SCREENUPDATE")
            })
        }
    },
    rect: {
        desc: "Draws a rectangle (filled).",
        params: "<x:number> <y:number> <width:number> <height:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillRect(Number(params[0]), Number(params[1]), Number(params[2]), Number(params[3]))
                resolve("SCREENUPDATE")
            })
        }
    },
    orect: {
        desc: "Draws a rectangle (outline).",
        params: "<x:number> <y:number> <width:number> <height:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.strokeRect(Number(params[0]), Number(params[1]), Number(params[2]), Number(params[3]))
                resolve("SCREENUPDATE")
            })
        }
    },
    line: {
        desc: "Draws a line.",
        params: "<x1:number> <y1:number> <x2:number> <y2:number>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.beginPath()
                ctx.moveTo(Number(params[0]), Number(params[1]))
                ctx.lineTo(Number(params[2]), Number(params[3]))
                ctx.stroke()
                resolve("SCREENUPDATE")
            })
        }
    },
    rectv: {
        desc: "Draws a rectangle using variables.",
        params: "<x:variable> <y:variable> <width:variable> <height:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillRect(variables[params[0]], variables[params[1]], variables[params[2]], variables[params[3]])
                resolve("SCREENUPDATE")
            })
        }
    },
    fnt: {
        desc: "Defines a font to be used when drawing text.",
        params: "...<font:string>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.font = params.join(" ")
                resolve("NONE")
            })
        }
    },
    txt: {
        desc: "Draws text to the screen.",
        params: "<x:number> <y:number> ...<text:string>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillText(params.splice(2).join(" "), Number(params[0]), Number(params[1]))
                resolve("SCREENUPDATE")
            })
        }
    },
    txtv: {
        desc: "Draws text to the screen using variables as coordinates.",
        params: "<x:variable> <y:variable> ...<text:string>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillText(params.splice(2).join(" "), variables[params[0]], variables[params[1]])
                resolve("SCREENUPDATE")
            })
        }
    },
    ntxt: {
        desc: "Draws a variable's value to the screen.",
        params: "<x:number> <y:number> <value:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillText(variables[params[2]], Number(params[0]), Number(params[1]))
                resolve("SCREENUPDATE")
            })
        }
    },
    ntxtv: {
        desc: "Draws a variable's value to the screen using variables as coordinates.",
        params: "<x:variable> <y:variable> <value:variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                ctx.fillText(variables[params[2]], variables[params[0]], variables[params[1]])
                resolve("SCREENUPDATE")
            })
        }
    }
}

const INSTRUCTION_GROUPS = [
    {
        name: "Generic",
        from: "ldv"
    },
    {
        name: "Math",
        from: "set"
    },
    {
        name: "Jumps",
        from: "jmp"
    },
    {
        name: "Canvas",
        from: "canvas"
    }
]

function jump(name)
{
    let lineNum = 0
    for (const line of instructions) // search thru instructions until subroutine name is found
    {
        if (line == "." + name)
        {
            return lineNum - 1
        }

        lineNum++
    }

    interpretError("ERR_SUBROUTINE")
    runType = "stop" // stop execution
    return -1
}
