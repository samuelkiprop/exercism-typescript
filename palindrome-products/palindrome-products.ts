interface Input {
    maxFactor: number;
    minFactor?: number;
}

interface Palindromes {
    smallest: {
        value: number | null;
        factors: number[][];
    };
    largest: {
        value: number | null;
        factors: number[][];
    };
}

function createRange(max: number, min: number): number[] {
    const range: number[] = [];
    if (max < min) {
        throw new Error('min must be <= max');
    }
    for (let i = min; i <= max; i++) {
        range.push(i);
    }
    return range;
}

function createrange(max: number, min: number): number[] {
    const range: number[] = [];
    if (max < min) {
        throw new Error('min must be <= max');
    }
    for (let i = min; i <= max; i++) {
        range.push(i);
    }
    return range;
}

function createProducts(range: number[]): number[] {
    const productList: number[] = [];
    for (let i = range[0]; i <= range[range.length - 1]; i++) {
        for (let j = i; j <= range[range.length - 1]; j++) {
            let product = i * j;
            if (isPalindrome(product)) {
                productList.push(product);
            }
        }
    }
    return productList;
}

function isPalindrome(num: number): boolean {
    let numString = num.toString();
    let numStringReverse = numString.split('').reverse().join('');
    return numString === numStringReverse;
}

function minMaxPalindromes(products: number[]): Palindromes {
    let minPalindrome: number | null;
    let maxPalindrome: number | null;
    if (products.length > 0) {
        minPalindrome = Math.min(...products);
        maxPalindrome = Math.max(...products);
    } else {
        minPalindrome = null;
        maxPalindrome = null;
    }
    return {
        smallest: { value: minPalindrome, factors: [] },
        largest: { value: maxPalindrome, factors: [] },
    };
}

function generateFactors(num: number, range: number[]): number[][] {
    let factors: number[][] = [];

    for (let x of range) {
        if (num % x === 0 && x <= Math.sqrt(num)) {
            if (range.includes(num / x)) {
                let pair = [x, num / x];
                factors.push(pair);
            }
        }
    }
    return factors;
}

export function generate({ maxFactor, minFactor = 0 }: Input): Palindromes {
    let range = createRange(maxFactor, minFactor);
    let products = createProducts(range);
    let minMaxPalindrome: Palindromes = minMaxPalindromes(products);

    if (
        typeof minMaxPalindrome.smallest.value == 'number' &&
        typeof minMaxPalindrome.largest.value == 'number'
    ) {
        minMaxPalindrome.largest.factors = generateFactors(
            minMaxPalindrome.largest.value,
            range
        );
        minMaxPalindrome.smallest.factors = generateFactors(
            minMaxPalindrome.smallest.value,
            range
        );
    } else {
        minMaxPalindrome.largest.factors = [];
        minMaxPalindrome.smallest.factors = [];
    }
    return minMaxPalindrome;
}

let palindromes = generate({
    maxFactor: 9,
});

console.log(palindromes);
console.log(palindromes.smallest.factors);
console.log(palindromes.largest.factors);
