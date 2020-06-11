# Detect sequence exercise 

## Objective
Modify **detect-sequence.service.ts**

Detect start of sequence. If you find more than one sequence you should
return index of last detected. When array doesn't contain sequence return -1.

Example:

Input array

    [1, 0, 3, 1, 9, 7, 9, 7, 4, 5];

Sequence to find

    [9, 7];

Result

    6

Because

    keys:   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    values: [1, 0, 3, 1, 9, 7, 9, 7, 4, 5]
                               ↑ result key is 6

## Test
Command to run category test only:

    node_modules/.bin/mocha --require node_modules/ts-node/register src/exercises/detect-sequence/detect-sequence.service.spec.ts
