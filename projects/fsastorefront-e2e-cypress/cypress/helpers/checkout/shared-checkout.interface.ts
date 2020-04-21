export interface ComparisonTable {
  mainProducts: MainProductItem[];
}

export interface MainProductItem {
  name: string;
  price: string;
}

export interface MiniCart {
  price: string;
  products: ProductItem[];
}

export interface ProductItem {
  title: string;
  value: string;
}

export interface AddOptionItem {
  name: string;
  available?: boolean;
  shouldAdd?: boolean;
}

export interface AddOptions {
  title: string;
  items: AddOptionItem[];
}
