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

  , startTime = 0
  , endTime = 0

  , instructionMenuOpen = false
  , settingsMenuOpen = false
