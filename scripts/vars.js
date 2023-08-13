const textarea = document.querySelector("textarea")
    , aside = document.querySelector("aside")

    , tabSize = 4

let lineCount = 1

let variables = {}
  , pointer = 0
  , stack = []
  , instructions = textarea.value.split("\n")
  , loadedVar = ""
  , currentPauseId = -1

  , stoppedTimer = false

  , runType = "normal"
  , fast = false
  , interpreting = false

  , canvas = document.querySelector("canvas")
  , ctx = canvas.getContext("2d")

  , builtInVariables = {
      key: null,
      time: null,
      pointer: null,
      stacklen: null,
      variablesLength: null
  }
  , builtInVariableDescriptions = {
    key: "The last key that was pressed on the keyboard, as a keycode.",
    time: "The current millisecond of program execution",
    pointer: "The program "
  }

  , startTime = 0
  , endTime = 0

  , instructionMenuOpen = false
  , errorCodes = {
    ERR_EOF: "UNEXPECTED EOF WHILE RUNNING",
    ERR_STACK: "STACK EMPTY WHEN RTS INSTRUCTION CALLED"
  }
