const TOKEN_TYPE = {
    L_brack: "{",
    R_brack: "}",
    STR: "str",
    IDENT: "ident",
    SEMI: ";",
    COLON: ":",
    EOF: "end",
}
class Lexer {
    token(val, type) {
        return { value: val, type: type, grp: "TOKEN" };
    }
    is_char(string) {
        return /^[A-Za-z0-9_-]+$/.test(string);
    }
    isskippable(str) {
        return str == " " || str == "\n" || str == "\t" || str == '\r';
    }
    error(str, word) {
        this.err = true
        this.err_txt = `${str} on\n word: ${word}`
        console.error(this.err_txt)
    }
    constructor(code) {
        this.err = false
        this.err_txt = ""
        this.code = code
    }
    tokenizer() {
        let tokens = []
        const str = this.code.split("");
        const length = str.length
        console.log(str)
        while (str.length > 0) {
            if (this.isskippable(str[0])) {
                str.shift()
            } else if (str[0] == ';') {
                tokens.push(this.token(str.shift(), TOKEN_TYPE.SEMI))
            } else if (str[0] == ':') {
                tokens.push(this.token(str.shift(), TOKEN_TYPE.COLON))
            } else if (str[0] == '{') {
                tokens.push(this.token(str.shift(), TOKEN_TYPE.L_brack))
            } else if (str[0] == '}') {
                tokens.push(this.token(str.shift(), TOKEN_TYPE.R_brack))
            } else if (str[0] == "/") {
                str.shift()
                if (str[0] == "*") {
                    str.shift()
                    while (str.length > 0 && str[0] !== '*') {
                        str.shift()
                    }
                    str.shift()
                    str.shift()
                }else{
                    this.error("Invalid character", length - str.length, str[0])
                    str.shift()
                }
            } else if (str[0] == '"') {
                str.shift()
                let string = ""
                while (str.length > 0 && str[0] !== '"') {
                    if (str[0] == "\\") {
                        str.shift();
                        str += str.shift();
                    }
                    string += str.shift()
                }
                str.shift()
                tokens.push(this.token(string, TOKEN_TYPE.STR))
            } else if (this.is_char(str[0])) {
                let string = ""
                while (str.length > 0 && this.is_char(str[0])) {
                    string += str.shift()
                }
                tokens.push(this.token(string, TOKEN_TYPE.IDENT))
            } else {
                this.error("Invalid character", length - str.length, str[0])
                str.shift()
            }
        }
        tokens.push(this.token("EOF", TOKEN_TYPE.EOF))
        return tokens
    }
}
class Parser {
    end_of_file() {
        return this.tokens[0].type != TOKEN_TYPE.EOF;
    }
    at() {
        return this.tokens[0];
    }
    eat() {
        const prev = this.tokens.shift();
        return prev;
    }
    expect(type) {
        const prev = this.tokens.shift();
        if (!prev || prev.type != type) {
            this.err = true;
            this.err_txt = "Expecting: " + type + " BRO"
            console.error(this.err_txt)
            throw "Expecting: " + type + " BRO"
        }
        return prev;
    }
    unexpect(type) {
        const prev = this.tokens[0];
        if (prev && prev.type == type) {
            return this.eat();
        }
        return prev;
    }
    constructor(tokens) {
        this.tokens = tokens
        this.err = false;
    }
    parse_utils() {
        let utils = {}
        let name = this.expect(TOKEN_TYPE.IDENT).value;
        if (this.eat().type == TOKEN_TYPE.COLON) {
            let value = this.eat().value;
            utils.type = "PROP"
            utils.name = name
            utils.value = value;
            this.unexpect(TOKEN_TYPE.SEMI);
        } else {
            utils = this.parse_child()
            utils.name = name;
        }
        return utils
    }
    parse_child() {
        let parent = { type: "ELEMENT", name: "", utils: [], grp: "AST" };
        while (this.at().type != TOKEN_TYPE.R_brack && this.end_of_file()) {
            let val = this.parse_utils()
            parent.utils.push(val);
        }
        this.expect(TOKEN_TYPE.R_brack);
        return parent;
    }
    parse_parent() {
        let parent = { type: "ELEMENT", name: "", utils: [], grp: "AST" };
        parent.name = this.expect(TOKEN_TYPE.IDENT).value;
        this.expect(TOKEN_TYPE.L_brack);
        while (this.at().type != TOKEN_TYPE.R_brack && this.end_of_file()) {
            let val = this.parse_utils()
            parent.utils.push(val);
        }
        this.expect(TOKEN_TYPE.R_brack);
        // this.eat()
        return parent;
    }
    parse_token() {
        return this.parse_parent()
    }
    AST() {
        let body = { type: "BODY", value: [], grp: "AST" };
        while (this.end_of_file() && !this.err) {
            let val = this.parse_token()
            body.value.push(val);
        }
        if (this.err) {
            console.error(this.err_txt)
            return 0
        }
        return body;
    }
}
class Eval {
    eval_element(parent, ast) {
        if (ast.type != "ELEMENT") return 0
        let elm = document.createElement(ast.name)
        while (ast.utils.length > 0) {
            if (ast.utils[0].type == "PROP") {
                try {
                    if (ast.utils[0].name.startsWith("attr-")) {
                        elm.setAttribute(ast.utils[0].name.replace("attr-",""), ast.utils[0].value)
                    }else{
                        elm[ast.utils[0].name] = ast.utils[0].value
                    }
                } catch (error) {
                    this.err = true
                    this.err_txt = error
                }
            } else if (ast.utils[0].type == "ELEMENT") {
                this.eval_element(elm, ast.utils[0])
            }
            ast.utils.shift()
        }
        parent.appendChild(elm)
    }
    eval_body(ast) {
        while (ast.value.length > 0) {
            this.eval_element(this.main, ast.value.shift())
        }
        return this.main
    }
    constructor(ast, main) {
        this.ast = ast
        this.err = false
        this.err_txt = ""
        this.main = main || document.createElement("main")
        this.hasParent = main ? true : false
        if (!(main instanceof HTMLElement) && this.hasParent) { this.err = true; this.err_txt = JSON.stringify(main) + " is not a valid dom element" }
    }
    interpret() {
        if (this.hasParent) {
            this.eval_body(this.ast)
        } else {
            document.body.appendChild(this.eval_body(this.ast))
        }
    }
}
export class HTSS {
    err(err, title) {
        let d = document.createElement("dialog")
        d.open = "true"
        d.setAttribute("style","background-color:black;color:red;translate: 0px -50%;font-family:monospace;top:50%;")
        d.innerHTML = `
        <h1>${title}: </h1>
        <h3>${err}</h3>
        <form method="dialog">
          <button>OK</button>
        </form>
      `
        document.body.appendChild(d)
    }
    constructor(code, element) {
        try {
            let lex = new Lexer(code)
            let token = lex.tokenizer()
            console.log(token)
            if (lex.err) {
                this.err(lex.err_txt, "SYNTAX ERROR")
                return 0
            }
            let parse = new Parser(token)
            let ast = parse.AST()
            console.log(ast)
            if (parse.err) {
                this.err(parse.err_txt, "AST ERROR")
                return 0
            }
            let runtime = new Eval(ast, element)
            if (runtime.err) {
                this.err(runtime.err_txt, "RUNTIME ERROR")
                return 0
            }
            let evals = runtime.interpret()
            console.log(evals)
        } catch (error) {
            this.err(error, "ERROR")
        }
    }

}