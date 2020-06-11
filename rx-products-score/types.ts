export interface ProductBasic {
  id: number;
  symbol: string;
}

/* I assume, that I can't edit existing interfaces*/
export interface ProductBasicWithScore {
  id: number;
  symbol: string;
  score: number;
}

export interface CustomerSymbol {
  productId: number;
  customerSymbol: string;
}

export interface DescriptionWords {
  productId: number;
  words: string[];
}
