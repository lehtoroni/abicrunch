
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
