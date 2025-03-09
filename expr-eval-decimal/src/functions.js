import Decimal from 'decimal.js';
import contains from './contains';
import { PI, E } from './parser';

export function add(a, b) {
  return new Decimal(a).add(new Decimal(b));
}

export function sub(a, b) {
  return new Decimal(a).sub(new Decimal(b));
}

export function mul(a, b) {
  return new Decimal(a).mul(new Decimal(b));
}

export function div(a, b) {
  return new Decimal(a).div(new Decimal(b));
}

export function mod(a, b) {
  return new Decimal(a).mod(new Decimal(b));
}

export function pow(a, b) {
  return new Decimal(a).pow(new Decimal(b));
}

export function concat(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
  return '' + a + b;
}

export function equal(a, b) {
  return a === b;
}

export function notEqual(a, b) {
  return a !== b;
}

export function greaterThan(a, b) {
  return new Decimal(a).greaterThan(new Decimal(b));
}

export function lessThan(a, b) {
  return new Decimal(a).lessThan(new Decimal(b));
}

export function greaterThanEqual(a, b) {
  return new Decimal(a).greaterThanOrEqualTo(new Decimal(b));
}

export function lessThanEqual(a, b) {
  return new Decimal(a).lessThanOrEqualTo(new Decimal(b));
}

export function andOperator(a, b) {
  return Boolean(a && b);
}

export function orOperator(a, b) {
  return Boolean(a || b);
}

export function inOperator(a, b) {
  return contains(b, a);
}

export function sinh(a) {
  return new Decimal(a).sinh();
}

export function cosh(a) {
  return new Decimal(a).cosh();
}

export function tanh(a) {
  if (a === Infinity) return 1;
  if (a === -Infinity) return -1;
  return new Decimal(a).tanh();
}

export function asinh(a) {
  if (a === -Infinity || (new Decimal(a).toNumber() === -Infinity)) return a;
  return new Decimal(a).asinh();
}

export function acosh(a) {
  return new Decimal(a).acosh();
}

export function atanh(a) {
  return new Decimal(a).atanh();
}

export function log10(a) {
  return new Decimal(a).log(10);
}

export function neg(a) {
  return new Decimal(a).mul(-1);
}

export function not(a) {
  return !a;
}

export function trunc(a) {
  return new Decimal(a).trunc();
}

export function random(a) {
  return new Decimal(Decimal.random().mul(new Decimal(a || 1).toNumber()));
}

export function factorial(a) { // a!
  return gamma(new Decimal(a).add(1));
}

function isInteger(value) {
  return (new Decimal(value)).isInteger();
}

var GAMMA_G = 4.7421875;
var GAMMA_P = [
  0.99999999999999709182,
  57.156235665862923517, -59.597960355475491248,
  14.136097974741747174, -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4, -0.98374475304879564677e-4,
  0.15808870322491248884e-3, -0.21026444172410488319e-3,
  0.21743961811521264320e-3, -0.16431810653676389022e-3,
  0.84418223983852743293e-4, -0.26190838401581408670e-4,
  0.36899182659531622704e-5
];

export function gamma(n) {
  
  const g = 7;
  const p = [
    '0.99999999999980993',
    '676.5203681218851',
    '-1259.1392167224028',
    '771.32342877765313',
    '-176.61502916214059',
    '12.507343278686905',
    '-0.13857109526572012',
    '9.9843695780195716e-6',
    '1.5056327351493116e-7'
  ];
  
  n = new Decimal(n);
  
  if (n.isInteger()) {
    
    if (n.lte(0)) {
      return n.isFinite() ? new Decimal(Infinity) : new Decimal(NaN);
    }
    
    let res = new Decimal(n.minus('1'));
    let value = new Decimal(n.minus('2'));
    while (value.gt(1)) {
      res = res.mul(value);
      value = value.minus(1);
    }
    
    if (res.eq(0)) {
      return new Decimal(1);
    }
    
    return res;
    
  }
  
  if (n.lt(new Decimal('0.5'))) {
    return (new Decimal(PI)).div( (new Decimal(new Decimal(PI).mul(n)).sin()) ).div( gamma(new Decimal('1').minus(n)) );
  }
  
  n = n.minus(1);
  let x = new Decimal(p[0]);
  for (let i = 1; i < g+2; i++) {
    x = x.plus(new Decimal(p[i]).div(new Decimal(n).plus(i)));
  }
  let t = n.plus(g).plus('0.5');
  
  return (new Decimal(PI).mul(2).sqrt()).mul( Decimal.pow(t, n.plus('0.5')) ).mul( Decimal.exp(t.mul(-1)) ).mul( x );
  
}



export function stringOrArrayLength(s) {
  if (Array.isArray(s)) {
    return s.length;
  }
  return String(s).length;
}

export function hypot(...args) {
  let sum = new Decimal(0);
  let larg = new Decimal(0);
  
  for (const arg of args) {
    const absArg = new Decimal(arg).abs();
    let div;
    
    if (larg.lt(absArg)) {
      div = larg.div(absArg);
      sum = sum.times(div.times(div)).plus(1);
      larg = absArg;
    } else if (!absArg.isZero()) {
      div = absArg.div(larg);
      sum = sum.plus(div.times(div));
    } else {
      sum = sum.plus(absArg);
    }
  }
  
  return larg.eq(Infinity) ? Infinity : larg.times(sum.sqrt());
}

export function condition(cond, yep, nope) {
  return cond ? yep : nope;
}

/**
* Decimal adjustment of a number.
* From @escopecz.
*
* @param {Number} value The number.
* @param {Integer} exp  The exponent (the 10 logarithm of the adjustment base).
* @return {Number} The adjusted value.
*/
export function roundTo(value, exp) {
  if (typeof exp === 'undefined' || new Decimal(exp).isZero()) {
    return new Decimal(value).toDecimalPlaces(0);
  }

  value = new Decimal(value);
  exp = new Decimal(exp).neg();

  if (!exp.isInteger()) {
    return NaN;
  }

  // Shift, round, and shift back
  const shift = new Decimal(10).pow(exp);
  return value.div(shift).toDecimalPlaces(0).times(shift);
}

export function setVar(name, value, variables) {
  if (variables) variables[name] = value;
  return value;
}

export function arrayIndex(array, index) {
  return array[index | 0];
}

export function max(array) {
  if (arguments.length === 1 && Array.isArray(array)) {
    return Decimal.max.apply(Decimal, array);
  } else {
    return Decimal.max.apply(Decimal, arguments);
  }
}

export function min(array) {
  if (arguments.length === 1 && Array.isArray(array)) {
    return Decimal.min.apply(Decimal, array);
  } else {
    return Decimal.min.apply(Decimal, arguments);
  }
}

export function arrayMap(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to map is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to map is not an array');
  }
  return a.map(function (x, i) {
    return f(x, i);
  });
}

export function arrayFold(f, init, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to fold is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to fold is not an array');
  }
  return a.reduce(function (acc, x, i) {
    return f(acc, x, i);
  }, init);
}

export function arrayFilter(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to filter is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to filter is not an array');
  }
  return a.filter(function (x, i) {
    return f(x, i);
  });
}

export function stringOrArrayIndexOf(target, s) {
  if (!(Array.isArray(s) || typeof s === 'string')) {
    throw new Error('Second argument to indexOf is not a string or array');
  }

  return s.indexOf(target);
}

export function arrayJoin(sep, a) {
  if (!Array.isArray(a)) {
    throw new Error('Second argument to join is not an array');
  }

  return a.join(sep);
}

export function sign(x) {
  return ((x > 0) - (x < 0)) || +x;
}

var ONE_THIRD = 1/3;
export function cbrt(x) {
  return new Decimal(x).cubeRoot();
}

export function expm1(x) {
  return new Decimal(x).exp().sub(1);
}

export function log1p(x) {
  return new Decimal(x).log(1+x);
}

export function log2(x) {
  return new Decimal(x).log().div(new Decimal(Math.LN2));
}

export function sum(array) {
  if (!Array.isArray(array)) {
    throw new Error('Sum argument is not an array');
  }

  return array.reduce(function (total, value) {
    return total + Number(value);
  }, 0);
}
