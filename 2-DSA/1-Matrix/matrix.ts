// Matrix Traversal 

// 1. Row traversal 
// Print every matrix element row by row
function printRowByRow(matrix: number[][]): void {
    for(let row = 0; row < matrix.length; row++){
        for(let col = 0; col < matrix[row]!.length; col++){
            console.log(matrix[row]![col]);
        }
    }
}

// 2. Print every element column by column.
function printColByCol(matrix: number[][]):void {
    for(let col = 0; col < matrix[0]!.length; col++){
        for(let row = 0; row < matrix.length; row ++){
            console.log(matrix[row]![col]);
        }
    }
}

// 3. Find the sum of all values.
function printSumOfAllValOfMatrix(matrix: number[][]): void{
    let sum = 0;
    for(let row = 0; row < matrix.length; row ++){
        for(let col = 0; col < matrix[row]!.length; col ++){
            sum += matrix[row]![col]!;
        }
    }
    console.log('Sum : ', sum)
}

// 4. Find Maximum Value 
function printMaxVal(matrix: number[][]):void {
    let max = -Infinity;
    for(let row = 0; row < matrix.length; row ++){
        for(let col = 0; col < matrix[row]!.length; col ++){
            max = Math.max(max, matrix[row]![col]!);
        }
    }

    console.log(`Maximum value in matrix : ${max}`)
}
// 5. Calculate every row sum.
function printSumOfEveryRowValOfMatrix(matrix: number[][]): void {
    for(let row = 0; row < matrix.length; row ++){
        let sum = 0;
        for(let col = 0; col < matrix[row]!.length; col ++){
            sum += matrix[row]![col]!;
        }
        console.log(`sum of row ${row + 1} = ${sum}`)
    }
}


// 6. Calculate every Column sum.
function printSumOfEveryColValOfMatrix(matrix: number [][]): void {
    for(let col = 0; col < matrix[0]!.length; col ++){
        let sum = 0;
        for(let row = 0; row < matrix.length; row ++){
            sum += matrix[row]![col]!;
        }
        console.log(`Sum of Column: ${col + 1} = ${sum}`);
    }
}

// 7. Print main Diagonal 
function printDiagonalOfMatrix(amtrix : number [][]): void {
    for(let i = 0; i < matrix.length; i ++){
        console.log(matrix [i]![i]);
    }
}





















const matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Matrix elements row by row:");
printRowByRow(matrix);

console.log('##########################')

console.log("Matrix elements column by column:");
printColByCol(matrix);

console.log("###########################")

console.log('Sum Of All Values');
printSumOfAllValOfMatrix(matrix);

console.log("###########################")

console.log('Find Maximum value in matrix');
printMaxVal(matrix);

console.log("###########################")

console.log('Every row sum.');
printSumOfEveryRowValOfMatrix(matrix);

console.log("###########################")

console.log('Every col sum.');
printSumOfEveryColValOfMatrix(matrix);

console.log("###########################")

console.log('Print Diagonal Of Matrix');
printDiagonalOfMatrix(matrix);
