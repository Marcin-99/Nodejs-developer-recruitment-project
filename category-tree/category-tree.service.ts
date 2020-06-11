import { FlatCategory, Category } from "./category.interface";


class CategoryTreeService {
    flatTree: FlatCategory[];
    nestedTree: Category[];

    constructor(flatTree: FlatCategory[]) {
        this.flatTree = flatTree;
        this.nestedTree = [];
    }

    _dataToCategory(item: FlatCategory): Category {
        let output = {
            id: item.id,
            name: item.name,
            parentId: item.parentId,
            productsCount: item.productsCount,
            children: []
        }

        return output;
    }

    _getRoots(): void {
        let roots: Category[] = [];

        for (let i = 0; i < this.flatTree.length; i++) {
            if (this.flatTree[i].parentId == null) {
                let dataToAppend = this._dataToCategory(this.flatTree[i]);
                this.nestedTree.push(dataToAppend);
                this.flatTree.splice(i, 1);
                i -= 1;
            }
        }
    }

    _developRoots(roots: Category[]): void {
        for (let root of roots) {
            for (let item of this.flatTree) {
                if (item.parentId == root.id) {
                    let data = this._dataToCategory(item);
                    root.children.push(data);
                }
            }
            this._developRoots(root.children);
        }
    }

    buildNestedTree(): Category[] {
        this._getRoots();
        this._developRoots(this.nestedTree);

        return this.nestedTree;
    }
}


/*Example input.*/
let data = [
      {
        id: 1,
        name: "Schottky diodes",
        parentId: null,
        productsCount: 3687
      },
      {
        id: 5,
        name: "Schottky diodes",
        parentId: 1,
        productsCount: 3687
      },
      {
        id: 6,
        name: "Schottky diodes",
        parentId: 5,
        productsCount: 3687
      },
      {
        id: 12,
        name: "Schottky diodes",
        parentId: 4,
        productsCount: 3687
      },
      {
        id: 13,
        name: "Schottky diodes",
        parentId: 4,
        productsCount: 3687
      },
      {
        id: 7,
        name: "Schottky diodes",
        parentId: 6,
        productsCount: 3687
      },
      {
        id: 8,
        name: "Schottky diodes",
        parentId: 6,
        productsCount: 3687
      },
      {
        id: 9,
        name: "Schottky diodes",
        parentId: 3,
        productsCount: 3687
      },
      {
        id: 10,
        name: "Schottky diodes",
        parentId: 3,
        productsCount: 3687
      },
      {
        id: 11,
        name: "Schottky diodes",
        parentId: 9,
        productsCount: 3687
      },
      {
        id: 2,
        name: "Schottky diodes",
        parentId: null,
        productsCount: 3687
      },
      {
        id: 3,
        name: "Schottky diodes",
        parentId: null,
        productsCount: 3687
      },
      {
        id: 4,
        name: "Schottky diodes",
        parentId: 1,
        productsCount: 3687
      }
    ];


/*Example output.*/
let tree: CategoryTreeService = new CategoryTreeService(data);
/*JSON.stringify() for better visualisation.*/
let dataToDisplay = JSON.stringify(tree.buildNestedTree(), null, "\t");
console.log(dataToDisplay);
