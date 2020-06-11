import { Observable, of } from "rxjs";
import {} from "rxjs/operators";
import { ProductBasic, CustomerSymbol, DescriptionWords, ProductBasicWithScore } from "./types";


export class ProductsScoreService {
    productsBasic$: Observable<ProductBasic>;
    customerSymbols$: Observable<CustomerSymbol>;
    descriptions$: Observable<DescriptionWords>;
    inputPhrase: string;
    productsLimit: number;
    arrayWithProducts: ProductBasicWithScore[];

    constructor (
        productsBasic$: Observable<ProductBasic>,
        customerSymbols$: Observable<CustomerSymbol>,
        descriptions$: Observable<DescriptionWords>,
        inputPhrase: string,
        productsLimit: number
    ) {
        this.productsBasic$ = productsBasic$;
        this.customerSymbols$ = customerSymbols$;
        this.descriptions$ = descriptions$;
        this.inputPhrase = inputPhrase;
        this.productsLimit = productsLimit;
        this.arrayWithProducts = [];
    }

    _addScoreKey(product: ProductBasic): ProductBasicWithScore {
        let output: ProductBasicWithScore = {
            id: product.id,
            symbol: product.symbol,
            score: 0
        }

        return output;
    }

    _computeScoreForSymbol(symbol:CustomerSymbol) {
        for (let product of this.arrayWithProducts)
            if (symbol.productId == product.id && symbol.customerSymbol == this.inputPhrase) product.score += 1000;
    }

    _computeScoreForDescription(description:DescriptionWords) {
        for (let product of this.arrayWithProducts)
            if (description.productId == product.id && description.words.includes(this.inputPhrase))
                /* I am not using array.indexOf() method since there could be multiple words equal to inputPhrase*/
                for (let i = 0; i < description.words.length; i++)
                    if (description.words[i] == this.inputPhrase) product.score += 1000 - i;
                        /* There is a mistake in a example in README.md.
                        foo (1) -> (0) + (1000 - 0) -> 1000: here we assume, that when foo is first we do (1000 - 0)
                        bar (2) -> (1000) + (1000 - 3) -> 1997 here when foo is third, we do (1000 - 3). Due to previous example
                        this should be: (1000 - 2).
                        I will assume, that I should subtract position - 1, just how computer sees tables.
                        */
    }

    computeScore(): Observable<string[]> {
        productsBasic$.subscribe(
            (product:ProductBasic) => this.arrayWithProducts.push(this._addScoreKey(product))
        );

        customerSymbols$.subscribe(
            (symbol:CustomerSymbol) => this._computeScoreForSymbol(symbol)
        );

        descriptions$.subscribe(
            (description:DescriptionWords) => this._computeScoreForDescription(description)
        );

        this.arrayWithProducts.sort(function (a, b) {return b.score - a.score});
        this.arrayWithProducts = this.arrayWithProducts.slice(0, productsLimit);

        let output: string[] = [];
        for (let product of this.arrayWithProducts) output.push(product.symbol);
        const symbolsSortedByScoreDesc = of(output);

        return symbolsSortedByScoreDesc;
    }
}


/*Example input*/
const productsBasic$: Observable<ProductBasic> = of(
      { id: 2, symbol: "1N4007" },
      { id: 5, symbol: "74HC14" },
      { id: 3, symbol: "AX-176" },
      { id: 1, symbol: "1N4005" },
      { id: 6, symbol: "OP-AMP" },
      { id: 4, symbol: "74HC595" }
    );

const customerSymbols$: Observable<CustomerSymbol> = of(
      { productId: 4, customerSymbol: "foo" },
      { productId: 3, customerSymbol: "diode" },
    );

const descriptions$: Observable<DescriptionWords> = of(
      { productId: 3, words: ["multimeter", "230V", "LCD", "diode"] },
      { productId: 5, words: ["Schmitt", "trigger"] },
      { productId: 6, words: ["operational", "amplifier", "2kHz"] },
      { productId: 4, words: ["shif", "register"] },
      { productId: 1, words: ["universla", "diode", "1000V"] },
      { productId: 2, words: ["diode", "100V", "fast"] }
    );

const inputPhrase = "diode";
const productsLimit = 2;

/*Example output.*/
let service: ProductsScoreService = new ProductsScoreService(productsBasic$,
    customerSymbols$,
    descriptions$,
    inputPhrase,
    productsLimit);

service.computeScore();
