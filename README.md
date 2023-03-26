# c-asm
A custom version of assembly, that I made in a couple days. Very slow, and not very useful.


## Instructions:

### jmp
#### Syntax: `jmp <subroutine>`
Jump to another part of the code.

### ldv
#### Syntax: `ldv <variable>`
Load a variable to be modified.

### log
#### Syntax: `log <string>`
Logs a string.

### logv
#### Syntax: `logv`
Logs the currently loaded variable.

### logn
#### Syntax: `logn`
Logs the currently loaded variable's name.

### set
#### Syntax: `set <number>`
Sets the loaded variable to a number.

### setv
#### Syntax: `setv <variable>`
Sets the loaded variable to another variable.

### add
#### Syntax: `add <number>`
Adds the loaded variable to a value.

### sub
#### Syntax: `sub <number>`
Subtracts the loaded variable by a value.

### mul
#### Syntax: `mul <number>`
Multiplies the loaded variable by a value.

### div
#### Syntax: `div <number>`
Divides the loaded variable by a value.

### addv
#### Syntax: `addv <variable> <variable>`
Adds two variables and puts the result in the loaded variable

### subv
#### Syntax: `subv <variable> <variable>`
Subtracts two variables and puts the result in the loaded variable

### mulv
#### Syntax: `mulv <variable> <variable>`
Multiplies two variables and puts the result in the loaded variable

### divv
#### Syntax: `divv <variable> <variable>`
Divides two variables and puts the result in the loaded variable

### jeq
#### Syntax: `jeq <subroutine> <number>`
Jumps if the loaded variable equals a value.

### jls
#### Syntax: `jls <subroutine> <number>`
Jumps if the loaded variable is less than a value.

### jgr
#### Syntax: `jgr <subroutine> <number>`
Jumps if the loaded variable is greater than a value.

### jsr
#### Syntax: `jsr <subroutine>`
Jumps to a subroutine, and can jump back later with an rts instruction.

### rts
#### Syntax: `rts`
Returns from a subroutine.

### end
#### Syntax: `end`
Ends the program.
