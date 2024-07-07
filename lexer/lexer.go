package lexer

import "github.com/vherus/politescript/token"

type Lexer struct {
	input           string
	currentPosition int
	nextPosition    int
	character       byte
}

func New(input string) *Lexer {
	l := &Lexer{input: input}
	l.readChar()
	return l
}

func (l *Lexer) NextToken() token.Token {
	var tok token.Token

	l.eatWhitespace()

	switch l.character {
	case '=':
		tok = newToken(token.ASSIGN, l.character)
	case '(':
		tok = newToken(token.LPAREN, l.character)
	case ')':
		tok = newToken(token.RPAREN, l.character)
	case ',':
		tok = newToken(token.COMMA, l.character)
	case '+':
		tok = newToken(token.PLUS, l.character)
	case '{':
		tok = newToken(token.LBRACE, l.character)
	case '}':
		tok = newToken(token.RBRACE, l.character)
	case 0:
		tok.Literal = ""
		tok.Type = token.EOF
	default:
		if l.isLetter(l.character) {
			tok.Literal = l.readIdentifier()
			tok.Type = token.LookupIdent(tok.Literal)
			return tok
		} else if l.isDigit(l.character) {
			tok.Type = token.INT
			tok.Literal = l.readNumber()
			return tok
		} else {
			tok = newToken(token.ILLEGAL, l.character)
		}
	}

	l.readChar()

	return tok
}

func (l *Lexer) readChar() {
	if l.nextPosition >= len(l.input) {
		l.character = 0
	} else {
		l.character = l.input[l.nextPosition]
	}

	l.currentPosition = l.nextPosition
	l.nextPosition += 1
}

func (l *Lexer) readIdentifier() string {
	startPosition := l.currentPosition

	for l.isLetter(l.character) {
		l.readChar()
	}

	return l.input[startPosition:l.currentPosition]
}

func (l *Lexer) readNumber() string {
	startPosition := l.currentPosition

	for l.isDigit(l.character) {
		l.readChar()
	}

	return l.input[startPosition:l.currentPosition]
}

func (l *Lexer) eatWhitespace() {
	for l.character == ' ' || l.character == '\t' || l.character == '\n' || l.character == '\r' {
		l.readChar()
	}
}

func (l *Lexer) isLetter(ch byte) bool {
	return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_'
}

func (l *Lexer) isDigit(ch byte) bool {
	return '0' <= ch && ch <= '9'
}

func newToken(tokenType token.TokenType, character byte) token.Token {
	return token.Token{Type: tokenType, Literal: string(character)}
}
