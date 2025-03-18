
import Decimal from 'decimal.js';
import contains from './contains';
import { PI, E } from './parser';
import { factorial } from './functions';

export function nCr(n, r) {
  return new Decimal(factorial(n)).div(new Decimal(factorial(r)).mul(factorial(new Decimal(n).minus(r))));
}

export function nPr(n, r) {
  return new Decimal(factorial(n)).div(factorial(new Decimal(n).minus(r)));
}

export function average(...numbers) {
    
    if (numbers.length == 0) {
        return new Decimal(NaN);
    }
    
    const numberCount = new Decimal(numbers.length);
    
    let val = new Decimal(0);
    for (const num of numbers) {
        val = val.plus(num);
    }
    
    return val.div(numberCount);
    
}

/*
 add:
geomean
median
product
variance

stddev
absdev

binomcdf
binompmf
binommean
binomvar

hyperpmf
hypercdf
hypermean
hypervar

poipmf
poicdf
poimean
poivar
*/

function mean(...args) {
    
    if (args.length === 0) return new Decimal(0);

    const n = new Decimal(args.length);
    const numbers = args.map(num => new Decimal(num));
    const mean = numbers.reduce((sum, num) => sum.plus(num), new Decimal(0)).div(n);
    
    return mean;
    
}

function variance(...args) {
    
    if (args.length === 0) return new Decimal(0);

    const n = new Decimal(args.length);
    const numbers = args.map(num => new Decimal(num));
    const meanValue = mean(...numbers);
    
    const varianceVal = numbers.reduce((sum, num) => {
        const diff = num.minus(meanValue);
        return sum.plus(diff.pow(2));
    }, new Decimal(0)).div(n);
    
    return varianceVal;
    
}

function standardDeviation(...args) {
    return variance(...args).sqrt();
}

function median(...args) {
    if (args.length === 0) return new Decimal(0);
    
    const numbers = args.map(num => new Decimal(num)).sort((a, b) => a.lt(b) ? -1 : 1);
    const mid = Math.floor(numbers.length / 2);
    
    if (numbers.length % 2 === 0) {
        return numbers[mid - 1].plus(numbers[mid]).div(2);
    } else {
        return numbers[mid];
    }
}

// Binomial PMF
function binompmf(x, N, p) {
    N = new Decimal(N);
    x = new Decimal(x);
    p = new Decimal(p);

    if (x.lt(0) || x.gt(N)) return new Decimal(0);

    let coeff = nCr(N, x);
    let px = p.pow(x);
    let qnx = Decimal.sub(1, p).pow(N.minus(x));

    return coeff.times(px).times(qnx);
}

// Binomial CDF (cumulative sum of PMF)
function binomcdf(x, N, p) {
    let sum = new Decimal(0);
    for (let k = new Decimal(0); k.lte(x); k = k.plus(1)) {
        sum = sum.plus(binompmf(k, N, p));
    }
    return sum;
}

// Binomial Mean
function binommean(N, p) {
    return new Decimal(N).times(new Decimal(p));
}

// Binomial Variance
function binomvar(N, p) {
    let P = new Decimal(p);
    return new Decimal(N).times(P).times(Decimal.sub(1, P));
}

// hyperetric PMF
function hyperpmf(x, N, K, n) {
    N = new Decimal(N);
    K = new Decimal(K);
    n = new Decimal(n);
    x = new Decimal(x);

    if (x.lt(0) || x.gt(K) || x.gt(n) || n.minus(x).gt(N.minus(K))) return new Decimal(0);

    let num = nCr(K, x).times(nCr(N.minus(K), n.minus(x)));
    let denom = nCr(N, n);

    return num.div(denom);
}

// hyperetric CDF (sum of PMFs)
function hypercdf(x, N, K, n) {
    let sum = new Decimal(0);
    for (let k = new Decimal(0); k.lte(x); k = k.plus(1)) {
        sum = sum.plus(hyperpmf(k, N, K, n));
    }
    return sum;
}

// hyperetric Mean
function hypermean(N, K, n) {
    return new Decimal(n).times(new Decimal(K).div(N));
}

// hyperetric Variance
function hypervar(N, K, n) {
    let NK = new Decimal(K).div(N);
    let oneMinusNK = new Decimal(1).minus(NK);
    let factor = new Decimal(N).minus(n).div(N.minus(1));
    return new Decimal(n).times(NK).times(oneMinusNK).times(factor);
}

export const EXTRA_ABICRUNCH_FUNCTIONS = {
    nCr: nCr,
    ncr: nCr,
    nPr: nPr,
    npr: nPr,
    
    average: average,
    avg: average,
    
    standardDeviation: standardDeviation,
    stddev: standardDeviation,
    stdDev: standardDeviation,
    
    mean: mean,
    variance: variance,
    median: median,
    
    binomvar,
    binommean,
    binomcdf,
    binompmf,
    
    hypervar,
    hypermean,
    hypercdf,
    hyperpmf
};