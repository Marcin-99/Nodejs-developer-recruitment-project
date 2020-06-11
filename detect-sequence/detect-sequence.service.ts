export class DetectSequenceService {
    public static detect(inputSeq: number[], searchedSeq: number[]): number {
        let stack: number[] = [];
        searchedSeq.reverse();

        for (let i = inputSeq.length - 1; i >= 0; i--) {
            if (inputSeq[i] == searchedSeq[stack.length]) stack.push(inputSeq[i]);
            else stack.splice(0, stack.length);
            if (stack.toString() == searchedSeq.toString()) return i;
        }

        return -1;
    }
}

/*Example input.*/
let exampleInput = [9, 1, 2, 5, 1, 2, 5, 2, 5, 1];
let sequence = [2, 5];

/*Example output.*/
console.log(DetectSequenceService.detect(exampleInput, sequence));
