# Category exercise 
We keep categories (Semiconductors, Resistors, ...) in database table, so it's
flat structure (with parent id information). We need to make it nested!

## Objective
Modify **category-tree.service.ts**

From flat tree

    [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 2 }
    ]

You should build nested tree

    [
        {
            id: 1,
            parentId: null,
            children: [
                {
                    id: 2,
                    parentId: 1,
                    children: [
                        {
                            id: 3
                            parentId: 2,
                            children: []
                        }
                    ]
                }
            ]
        }
    ]

See structure in **category-tree.service.spec.ts**
