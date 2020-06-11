# RxJS products score exercise 
Compute products scoring and take first n products with highest using RxJS library.

## Objective
Modify **products-score.service.ts**

Combine RxJS streams and compute products scoring, sort products descending by score and return only first **n** produts.

    inputPhrase = "foo"
    productsLimit = 2

    productsBasicInfo$ = [
      { id: 1, symbol: "foo" },
      { id: 2, symbol: "bar" },
      { id: 3, symbol: "baz" }
    ]

    customerSymbols$ = [
      { productId: 2, customerSymbol: "foo" }
    ]

    descriptions$ = [
      { productId: 1, words: ["foo"] },
      { productId: 2, words: ["qux", "bar", "foo"] },
      { productId: 3, words: ["baz", "qux", "bar"] }
    ]

Score formula:

    score = customerSymbolScore + descriptionScore
    customerSymbolScore = 1000 <- when inputPhrase is product customer symbol
    descriptionScore = 1000 - position in words array if exists

Example scoring compute procedure for products:

    symbol (id) -> (customerSymbolScore) + (1000 - position in words array)
    foo (1) -> (0) + (1000 - 0) -> 1000
    bar (2) -> (1000) + (1000 - 3) -> 1997
    baz (3) -> (0) + (0) -> 0

Result when productsLimit is 2:

    ["bar", "foo"]

## Test
Command to run category test only:

    node_modules/.bin/mocha --require node_modules/ts-node/register src/exercises/rx-products-score/products-score.service.spec.ts
