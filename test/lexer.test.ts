import Lexer from '../src/lexer'

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
})