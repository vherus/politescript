import { ASSIGN, COMMA, LBRACE, LPAREN, PLUS, RBRACE, RPAREN, EOF, Token, lookupIdent, INT, ILLEGAL } from './token'

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

  public nextToken() {
    let token: Token

    this.eatWhitespace()

    const ch = this.#char
    switch (ch) {
      case '=':
        token = { type: ASSIGN, literal: ch }
        break
      case '(':
        token = { type: LPAREN, literal: ch }
        break
      case ')':
        token = { type: RPAREN, literal: ch }
        break
      case ',':
        token = { type: COMMA, literal: ch }
        break
      case '+':
        token = { type: PLUS, literal: ch }
        break
      case '{':
        token = { type: LBRACE, literal: ch }
        break
      case '}':
        token = { type: RBRACE, literal: ch }
        break
      case '':
        token = { type: EOF, literal: '' }
        break
      default:
        if (this.isLetter(ch)) {
          const literal = this.readIdentifier()
          token = { literal, type: lookupIdent(literal) }
          return token
        } else if (this.isNumber(ch)) {
          const literal = this.readNumber()
          token = { literal: literal.trim(), type: INT }
          return token
        } else {
          token = { type: ILLEGAL, literal: ch }
        }
    }

    this.readChar()
    return token
  }

  private readIdentifier(): string {
    const startPosition = this.#position

    while (this.isLetter(this.#char)) {
      this.readChar()
    }

    return this.#input.substring(startPosition, this.#position)
  }

  private readNumber(): string {
    const startPosition = this.#position

    while (this.isNumber(this.#char)) {
      this.readChar()
    }

    return this.#input.substring(startPosition, this.#position) 
  }

  private eatWhitespace() {
    while (this.#char === ' ' || this.#char === '\t' || this.#char === '\n' || this.#char === '\r') {
      this.readChar()
    }
  }

  private isLetter(ch: string): boolean {
    return ch === '_' || ch.toLowerCase() != ch.toUpperCase()
  }
  
  private isNumber(ch: string): boolean {
    return !isNaN(Number(ch))
  }
}