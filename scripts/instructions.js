const INSTRUCTION_LIST = {
    jmp: {
        desc: "Jump to another part of the code.",
        params: "<subroutine>",
        run: (params, line) => {
            return new Promise(resolve => {

                pointer = jump(params[0])

                resolve("CHANGELINE")
            })
        }
    },
    ldv: {
        desc: "Load a variable to be modified.",
        params: "<variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                loadedVar = params[0]
                resolve("NONE")
            })
        }
    },
    log: {
        desc: "Logs a string.",
        params: "<string>",
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
    set: {
        desc: "Sets the loaded variable to a number.",
        params: "<number>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = Number(params[0])
                resolve("VARCHANGE")
            })
        }
    },
    setv: {
        desc: "Sets the loaded variable to another variable.",
        params: "<variable>",
        run: (params, line) => {
            return new Promise(resolve => {
                variables[loadedVar] = variables[params[0]]
                resolve("VARCHANGE")
            })
        }
    },
    add: {
        desc: "Adds the loaded variable to a value.",
        params: "<number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] += Number(params[0]); resolve("VARCHANGE")})}
    },
    sub: {
        desc: "Subtracts the loaded variable by a value.",
        params: "<number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] -= Number(params[0]); resolve("VARCHANGE")})}
    },
    mul: {
        desc: "Multiplies the loaded variable by a value.",
        params: "<number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] *= Number(params[0]); resolve("VARCHANGE")})}
    },
    div: {
        desc: "Divides the loaded variable by a value.",
        params: "<number>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] /= Number(params[0]); resolve("VARCHANGE")})}
    },
    addv: {
        desc: "Adds two variables and puts the result in the loaded variable",
        params: "<variable> <variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] = variables[params[0]] + variables[params[1]]; resolve("VARCHANGE")})}
    },
    subv: {
        desc: "Subtracts two variables and puts the result in the loaded variable",
        params: "<variable> <variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] = variables[params[0]] - variables[params[1]]; resolve("VARCHANGE")})}
    },
    mulv: {
        desc: "Multiplies two variables and puts the result in the loaded variable",
        params: "<variable> <variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] = variables[params[0]] * variables[params[1]]; resolve("VARCHANGE")})}
    },
    divv: {
        desc: "Divides two variables and puts the result in the loaded variable",
        params: "<variable> <variable>",
        run: (params, line) => {return new Promise(resolve => {variables[loadedVar] = variables[params[0]] * variables[params[1]]; resolve("VARCHANGE")})}
    },
    jeq: {
        desc: "Jumps if the loaded variable equals a value.",
        params: "<subroutine> <number>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] == params[1])
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
        params: "<subroutine> <number>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] < params[1])
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
        params: "<subroutine> <number>",
        run: (params, line) => {
            return new Promise(resolve => {
                if (variables[loadedVar] > params[1])
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
        params: "<subroutine>",
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
                pointer = stack[stack.length - 1]
                stack.pop()
                resolve("CHANGELINE")
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
    }
}

function jump(name)
{
    let lineNum = 0
    for (const line of instructions)
    {
        if (line.startsWith("." + name))
        {
            return lineNum
        }

        lineNum++
    }
}
