export default class Lexer {
  #input: string
  #position: number
  #readPosition: number
  #char: string

  constructor(input: string) {
    this.#input = input
    this.#position = -1
    this.#readPosition = 0
    this.#char = ''
    this.readChar()
  }

  get char() {
    console.log(this.#position)
    return this.#char
  }

  public readChar() {
    if (this.#readPosition >= this.#input.length) {
      this.#char = ''
    } else {
      this.#char = this.#input[this.#readPosition]
    }

    this.#position = this.#readPosition
    this.#readPosition += 1
  }
}