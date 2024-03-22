export type KeyboardKey = ' ' | ',' | '.' | ';' | '<' | '>' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'alt' | 'arrowdown' | 'arrowleft' | 'arrowright' | 'arrowup' | 'b' | 'backspace' | 'c' | 'ctrl' | 'd' | 'delete' | 'e' | 'enter' | 'escape' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'meta' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 'shift' | 't' | 'tab' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

export type CommandType = 'combination' | 'sequence'

export type CommandScope = 'controlled' | 'global'

export interface KeyboardCommand {
  keys: KeyboardKey[]
  onPressed: () => void
  type: CommandType
}
