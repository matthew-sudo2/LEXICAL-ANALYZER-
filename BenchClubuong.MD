Token Types

Token Type	                        Examples
Keyword          	if, else, while, for, def, return, int, float
Identifier	               age, name, total_1
Number	                        10, 25, 3.14
Operator	             +, -, *, /, =, ==, !=, >, <, >=, <=
Delimiter	                 (, ), [, ], {, }, ,, :, ;
String	                       "Hello", "World"
Comment	                       This is a comment

2. Lexical Rules

Keywords: A word is classified as a keyword if it belongs to the predefined list of reserved words.

Identifiers: Must begin with a letter or underscore (_) and may be followed by letters, digits, or underscores.

Numbers: Consist of one or more digits. Decimal numbers may contain a decimal point followed by digits.

Operators: Symbols used for arithmetic, assignment, comparison, and other operations.

Delimiters: Symbols used to separate or group parts of the source code.

Strings: Text enclosed within matching single (' ') or double (" ") quotation marks.

Comments: Begin with # and continue until the end of the line.

3. Sample Input
age = 20

if age >= 18:
    print("Adult")

4. Expected Token Identification
age       → IDENTIFIER
=         → OPERATOR
20        → NUMBER

if        → KEYWORD
age       → IDENTIFIER
>=        → OPERATOR
18        → NUMBER
:         → DELIMITER

print     → IDENTIFIER
(         → DELIMITER
"Adult"   → STRING
)         → DELIMITER
