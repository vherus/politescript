package token

type TokenType string

type Token struct {
	Type    TokenType
	Literal string
}

const (
	ILLEGAL  = "ILLEGAL"
	EOF      = "EOF"
	IDENT    = "IDENT"
	INT      = "INT"
	ASSIGN   = "="
	PLUS     = "+"
	COMMA    = ","
	LPAREN   = "("
	RPAREN   = ")"
	LBRACE   = "{"
	RBRACE   = "}"
	FUNCTION = "FUNCTION"
	LET      = "LET"
	CONST    = "CONST"
	IF       = "IF"
)

var keywords = map[string]TokenType{
	"wouldyoumind": FUNCTION,
	"permit":       LET,
	"insist":       CONST,
	"mayhap":       IF,
}

func LookupIdent(ident string) TokenType {
	if token, exists := keywords[ident]; exists {
		return token
	}

	return IDENT
}
