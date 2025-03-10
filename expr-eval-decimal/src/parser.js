import { TEOF } from './token';
import { TokenStream } from './token-stream';
import { ParserState } from './parser-state';
import { Expression } from './expression';
import {
  add,
  sub,
  mul,
  div,
  mod,
  concat,
  equal,
  notEqual,
  greaterThan,
  lessThan,
  greaterThanEqual,
  lessThanEqual,
  andOperator,
  orOperator,
  inOperator,
  sinh,
  cosh,
  tanh,
  asinh,
  acosh,
  atanh,
  log10,
  neg,
  not,
  trunc,
  pow,
  random,
  factorial,
  gamma,
  stringOrArrayLength,
  hypot,
  condition,
  roundTo,
  setVar,
  arrayIndex,
  max,
  min,
  arrayMap,
  arrayFold,
  arrayFilter,
  stringOrArrayIndexOf,
  arrayJoin,
  sign,
  cbrt,
  expm1,
  log1p,
  log2,
  sum
} from './functions';
import Decimal from 'decimal.js';
import { nCr, nPr } from './extra';

export const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170';
export const E =  '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664';

export function Parser(options, prefsRaw) {
  
  this.options = options || {};
  
  const prefs = prefsRaw ?? {
      isDegrees: false,
      shouldCleanTrigonometry: true,
      precision: 50,
      expLimit: 15,
      outputMode: 'decimal'
  };
  const { isDegrees } = prefs;
  
  Decimal.set({
    precision: prefs.precision,
    minE: -100,
    maxE: 9e15,
    toExpNeg: -prefs.expLimit,
    toExpPos: prefs.expLimit
  });
  
  const toRadians = degrees => new Decimal(degrees).mul(new Decimal(PI).div(new Decimal('180')));
  const toDegrees = radians => new Decimal(radians).mul(new Decimal('180').div(new Decimal(PI)));
  
  const ZERO_THRESHOLD = new Decimal('0.0000000000000000000000000000000000000001');
  const clean = value => prefs.shouldCleanTrigonometry
    ? (value.abs().lt(ZERO_THRESHOLD) ? new Decimal(0) : value)
    : value;
  
  this.unaryOps = {
    sin: a => clean(new Decimal(isDegrees ? toRadians(a) : a).sin()),
    cos: a => clean(new Decimal(isDegrees ? toRadians(a) : a).cos()),
    tan: a => clean(new Decimal(isDegrees ? toRadians(a) : a).tan()),
    asin: a => isDegrees ? toDegrees(clean(new Decimal(a).asin())) : clean(new Decimal(a).asin()),
    acos: a => isDegrees ? toDegrees(clean(new Decimal(a).acos())) : clean(new Decimal(a).acos()),
    atan: a => isDegrees ? toDegrees(clean(new Decimal(a).atan())) : clean(new Decimal(a).atan()),
    arcsin: a => isDegrees ? toDegrees(clean(new Decimal(a).asin())) : clean(new Decimal(a).asin()),
    arccos: a => isDegrees ? toDegrees(clean(new Decimal(a).acos())) : clean(new Decimal(a).acos()),
    arctan: a => isDegrees ? toDegrees(clean(new Decimal(a).atan())) : clean(new Decimal(a).atan()),
    sinh: a => clean(new Decimal(isDegrees ? toRadians(a) : a).sinh()),
    cosh: a => clean(new Decimal(isDegrees ? toRadians(a) : a).cosh()),
    tanh: a => clean(new Decimal(isDegrees ? toRadians(a) : a).tanh()),
    asinh: a => isDegrees ? toDegrees(clean(new Decimal(a).asinh())) : clean(new Decimal(a).asinh()),
    acosh: a => isDegrees ? toDegrees(clean(new Decimal(a).acosh())) : clean(new Decimal(a).acosh()),
    atanh: a => isDegrees ? toDegrees(clean(new Decimal(a).atanh())) : clean(new Decimal(a).atanh()),
    arcsinh: a => isDegrees ? toDegrees(clean(new Decimal(a).asinh())) : clean(new Decimal(a).asinh()),
    arccosh: a => isDegrees ? toDegrees(clean(new Decimal(a).acosh())) : clean(new Decimal(a).acosh()),
    arctanh: a => isDegrees ? toDegrees(clean(new Decimal(a).atanh())) : clean(new Decimal(a).atanh()),
    sqrt: a => new Decimal(a).sqrt(),
    cbrt: a => new Decimal(a).cbrt(),
    log: a => new Decimal(a).log(),
    log2: a => new Decimal(a).logarithm(2),
    ln: a => new Decimal(a).ln(),
    lg: a => new Decimal(a).log(10),
    log10: a => new Decimal(a).log(10),
    expm1: expm1,
    log1p: log1p,
    abs: a => new Decimal(a).abs(),
    ceil: a => new Decimal(a).ceil(),
    floor: a => new Decimal(a).floor(),
    round: a => new Decimal(a).round(),
    trunc: a => new Decimal(a).trunc(),
    '-': a => new Decimal(a).mul(-1),
    '+': Decimal,
    exp: a => new Decimal(a).exp,
    not: not,
    length: stringOrArrayLength,
    '!': factorial,
    sign: sign
  };

  this.binaryOps = {
    '+': add,
    '-': sub,
    '*': mul,
    '/': div,
    '%': mod,
    '^': pow,
    '||': concat,
    '==': equal,
    '!=': notEqual,
    '>': greaterThan,
    '<': lessThan,
    '>=': greaterThanEqual,
    '<=': lessThanEqual,
    and: andOperator,
    or: orOperator,
    'in': inOperator,
    '=': setVar,
    '[': arrayIndex
  };

  this.ternaryOps = {
    '?': condition
  };

  this.functions = {
    random: random,
    fac: factorial,
    min: min,
    max: max,
    hypot: hypot,
    pyt: hypot, // backward compat
    pow: pow,
    atan2: Decimal.atan2, 
    'if': condition,
    gamma: gamma,
    roundTo: roundTo,
    map: arrayMap,
    fold: arrayFold,
    filter: arrayFilter,
    indexOf: stringOrArrayIndexOf,
    join: arrayJoin,
    sum: sum,
    
    nCr: nCr,
    ncr: nCr,
    nPr: nPr,
    npr: nPr
  };

  this.consts = {
    E: E,
    PI: PI,
    e: E,
    pi: PI,
    Infinity: Infinity,
    infinity: Infinity,
    Infty: Infinity,
    infty: Infinity,
    Inf: Infinity,
    inf: Infinity,
    'true': true,
    'false': false
  };
}

Parser.prototype.parse = function (expr) {
  var instr = [];
  var parserState = new ParserState(
    this,
    new TokenStream(this, expr),
    { allowMemberAccess: this.options.allowMemberAccess }
  );

  parserState.parseExpression(instr);
  parserState.expect(TEOF, 'EOF');

  return new Expression(instr, this);
};

Parser.prototype.evaluate = function (expr, variables) {
  return this.parse(expr).evaluate(variables);
};

var sharedParser = new Parser();

Parser.parse = function (expr) {
  return sharedParser.parse(expr);
};

Parser.evaluate = function (expr, variables) {
  return sharedParser.parse(expr).evaluate(variables);
};

var optionNameMap = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
  '^': 'power',
  '!': 'factorial',
  '<': 'comparison',
  '>': 'comparison',
  '<=': 'comparison',
  '>=': 'comparison',
  '==': 'comparison',
  '!=': 'comparison',
  '||': 'concatenate',
  'and': 'logical',
  'or': 'logical',
  'not': 'logical',
  '?': 'conditional',
  ':': 'conditional',
  '=': 'assignment',
  '[': 'array',
  '()=': 'fndef'
};

function getOptionName(op) {
  return optionNameMap.hasOwnProperty(op) ? optionNameMap[op] : op;
}

Parser.prototype.isOperatorEnabled = function (op) {
  var optionName = getOptionName(op);
  var operators = this.options.operators || {};

  return !(optionName in operators) || !!operators[optionName];
};
