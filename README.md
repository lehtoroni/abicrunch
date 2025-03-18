<p align="center" width="100%">
<img src="src/assets/icon.png" width="150">
<h1 style="text-align: center;">AbiCrunch</h1>
</p>

**Abicrunch is a browser-based high-precision scientific calculator similar to [SpeedCrunch](https://heldercorreia.bitbucket.io/speedcrunch/).**

The main goal of developing AbiCrunch at the moment is attempting to provide a proof-of-concept scientific calculator for the digital Finnish matriculation examination system. It should provide a familiar enough interface and UX to students who have learned to use SpeedCrunch during math lessons.

## Technology used
- 🚀 React + TypeScript
- 🔢 Parsing based on a built-in fork of [expr-eval](https://github.com/silentmatt/expr-eval) patched with [Decimal.js](https://github.com/MikeMcl/decimal.js)

## ⚠️ Disclaimer ⚠️
**This software is still in a fragile beta testing phase.**
Do not expect it to work properly. Do not trust it for doing important calculations.

## Current state

### Implemented and working
- ✅ All basic calculations of expr-eval with Decimal.js
- ✅ Supports both dot `.` and `,` comma as decimal separator
- ✅ Angle degree/radian modes for trigonometry
- ✅ User-defined functions and variables
- ✅ Configurable precision (decimals and exponent notation)
- ✅ Command palette
- ✅ Variable palette
- ✅ On-screen keypad

### To-Do list
- ⏳️ Thoroughly test all built-in functions
- ⏳️ Add multilang support & changeable language
- ⏳️ More built-in functions
    - ⏳️ More statistical function
    - ⏳️ More distribution functions 
    - ⏳️ Complex number support?
- ⏳️ Help & hints for command palette
- ⏳️ User guide and help pages
- ⏳️ "Value of selection"?
- ⏳️ Move parsing and evaluation to a web worker (+ calculation timeout)
- ⏳️ Create an actual fork of expr-eval instead of current approach

### "Maybe in the future" (list of non-essential ideas)
- ❓️ Support parsing TeX expressions (e.g. `\frac{1}{2}` => `1/2`)

### Not going to be implemented
- 🚫 Any CAS-like features (e.g. derivatives, integrals, smart simplification, etc.)
- 🚫 Built-in book of formulas (as Abitti®️ has multible tables built in)


## Screenshots

<img src="https://lehtodigital.fi/f/uqBCh" height="150"> 
<img src="https://lehtodigital.fi/f/5FpIs" height="150">
<img src="https://lehtodigital.fi/f/v2UEt" height="150">

-----

## Contributing
Contributions are welcome. Feel free to fork this repository and to suggest changes with pull requests. Please stay in line with the code style and 

## License
MIT
