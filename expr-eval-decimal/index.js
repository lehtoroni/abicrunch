/*!
 Based on ndef.parser, by Raphael Graf(r@undefined.ch)
 http://www.undefined.ch/mparser/index.html

 Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

 You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
 to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
 but don't feel like you have to let me know or ask permission.
*/

import { Expression } from './src/expression';
import { Parser } from './src/parser';
import Decimal from 'decimal.js';

// default Decimal.js options
Decimal.set({
  precision: 50,
  minE: -100,
  maxE: 100,
  toExpNeg: -10,
  toExpPos: 10
});

export function getDecimalInstance() {
  return Decimal;
}

export {
  Expression,
  Parser
};

// Backwards compatibility
export default{
  Parser: Parser,
  Expression: Expression,
  getDecimalInstance: getDecimalInstance
};
