import Lexer from '../src/lexer'
import { ASSIGN, COMMA, CONST, EOF, FUNCTION, IDENT, INT, LBRACE, LET, LPAREN, PLUS, RBRACE, RPAREN, TokenType } from '../src/token'

describe('Lexer', () => {
  describe('readChar()', () => {
    it('should read the next character of an input', () => {
      const input = 'wouldyoumind'
      const l = new Lexer(input)

      expect(l.char).toBe('w')

      for (let i = 1; i < input.length; i++) {
        l.readChar()
        expect(l.char).toBe(input[i])
      }
    })
  })

  describe('nextToken', () => {
    it('should map literals to tokens', () => {
      const input = `
        wouldyoumind summing(x, y) {
          x + y
        }

        permit five = 5
        insist ten = 10
        insist result = summing(five, ten)
      `

      const tests: { expectedType: TokenType, expectedLiteral: string }[] = [
        { expectedType: FUNCTION, expectedLiteral: 'wouldyoumind' },
        { expectedType: IDENT, expectedLiteral: 'summing' },
        { expectedType: LPAREN, expectedLiteral: '(' },
        { expectedType: IDENT, expectedLiteral: 'x' },
        { expectedType: COMMA, expectedLiteral: ',' },
        { expectedType: IDENT, expectedLiteral: 'y' },
        { expectedType: RPAREN, expectedLiteral: ')' },
        { expectedType: LBRACE, expectedLiteral: '{' },
        { expectedType: IDENT, expectedLiteral: 'x' },
        { expectedType: PLUS, expectedLiteral: '+' },
        { expectedType: IDENT, expectedLiteral: 'y' },
        { expectedType: RBRACE, expectedLiteral: '}' },
        { expectedType: LET, expectedLiteral: 'permit' },
        { expectedType: IDENT, expectedLiteral: 'five' },
        { expectedType: ASSIGN, expectedLiteral: '=' },
        { expectedType: INT, expectedLiteral: '5' },
        { expectedType: CONST, expectedLiteral: 'insist' },
        { expectedType: IDENT, expectedLiteral: 'ten' },
        { expectedType: ASSIGN, expectedLiteral: '=' },
        { expectedType: INT, expectedLiteral: '10' },
        { expectedType: CONST, expectedLiteral: 'insist' },
        { expectedType: IDENT, expectedLiteral: 'result' },
        { expectedType: ASSIGN, expectedLiteral: '=' },
        { expectedType: IDENT, expectedLiteral: 'summing' },
        { expectedType: LPAREN, expectedLiteral: '(' },
        { expectedType: IDENT, expectedLiteral: 'five' },
        { expectedType: COMMA, expectedLiteral: ',' },
        { expectedType: IDENT, expectedLiteral: 'ten' },
        { expectedType: RPAREN, expectedLiteral: ')' },
        { expectedType: EOF, expectedLiteral: '' }
      ]

      const l = new Lexer(input)

      for (const test of tests) {
        const token = l.nextToken()
        expect(token.type).toBe(test.expectedType)
        expect(token.literal).toBe(test.expectedLiteral)
      }
    })
  })
})