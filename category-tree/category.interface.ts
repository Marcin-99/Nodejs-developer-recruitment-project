/**
 * Category element of tree
 */
export interface FlatCategory {
  id: number;
  parentId: number | null;
  name: string;
  productsCount: number;
}

/**
 * Flat category with children
 */
export interface Category extends FlatCategory {
  children: Category[];
}
