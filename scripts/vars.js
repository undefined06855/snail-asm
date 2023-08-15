const textarea = document.querySelector("textarea")
    , aside = document.querySelector("aside")

let user = {
  tabSize: 2
}

const VERSION = "1.7"
document.querySelector("title").innerText += " " + VERSION

let variables = {} // object with variables in
  , pointer = 0 // current line being executed
  , stack = [] // stack
  , instructions = textarea.value.split("\n") // array with all of the instructions in
  , loadedVar = "" // currently loaded var's name
  , currentPauseId = -1 // used by pse to put the timeout id in

  , timerStopped = false // has used endtimer yet?

  , runType = "normal" // run type (normal / stop)
  , fast = false // is fast mode on?
  , interpreting = false // is currently running?

  , canvas = document.querySelector("canvas") // canvas element
  , ctx = canvas.getContext("2d") // canvas context

  , builtInVariables = { // all built in variables (null gets changed to the variable name)
      key: null,
      time: null,
      pointer: null,
      stacklen: null,
      variableslen: null
  }
  , builtInVariableDescriptions = { // descriptions
    key: "The last key that was pressed on the keyboard, as a keycode.",
    time: "The current millisecond of program execution.",
    pointer: "The program pointer (the current line being executed).",
    stacklen: "The length of the stack.",
    variableslen: "How many variables have been set a value."
  }
  
  , startTime = 0 // program start time
  , endTime = 0 //   "     " end time
 
  , instructionMenuOpen = false // is instructions menu open?
  , errorCodes = { // error codes
    ERR_EOF: "UNEXPECTED EOF WHILE RUNNING",
    ERR_STACK: "STACK EMPTY WHEN TRYING TO RETURN OR POP",
    ERR_SUBROUTINE: "SUBROUTINE NOT FOUND",
    ERR_JAVASCRIPT: "ERROR WHEN PARSING JAVASCRIPT"
  }
