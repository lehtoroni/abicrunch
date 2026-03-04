<p align="center" width="100%">
<img src="src/assets/icon.png" width="150">
<h1 style="text-align: center;">AbiCrunch</h1>
</p>

**Abicrunch is a browser-based high-precision scientific calculator similar to [SpeedCrunch](https://heldercorreia.bitbucket.io/speedcrunch/).**

The Finnish Matriculation Examination Board (YTL/MEB) decided to drop SpeedCrunch and similar calculators from the official examination system. Thus, the main goal of AbiCrunch is to develop a scientific calculator for online use and embedding in [L'Math](https://lehtodigital.fi/lmath/) for replacing the original legacy calculators.

## Technology used
- React + TypeScript
- Parsing based on a "monorepo-ish" fork of [expr-eval](https://github.com/silentmatt/expr-eval) patched with [Decimal.js](https://github.com/MikeMcl/decimal.js)

## ⚠️ Disclaimer ⚠️
**This software is still in a fragile beta testing phase.**
Do not expect it to work properly. Do not trust it for doing important calculations.

## Configuring with URL parameters
Following URL parameters are supported for changing the configuration:
- `view=standalone`, makes the calculator usable in a regular big browser window
- `mode=simple`, changes into "simple mode" for casual embedding purposes
- `prefs=...`, sets any preferences or options, such as following:
```json
{
    "lang": "fi",  // "fi" or "en"
    "isSidebarVisible": true,
    "isKeypadVisible": true,
    "isDegrees": false,
    "shouldCleanTrigonometry": true,
    "precision": 50,
    "expLimit": 15,
    "outputMode": "decimal"
}
```

## Current state

**👉️ [Live demo](https://crunch.lehtodigital.fi/?view=standalone)**

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
- ⏳️ Save settings in localStorage
- ⏳️ Thoroughly test all built-in functions
- ⏳️ More built-in functions
    - ⏳️ More statistical functions
    - ⏳️ More distribution functions 
    - ⏳️ Complex number support?
- ⏳️ Improve built-in guide
- ⏳️ "Value of selection"?
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
Contributions are welcome. Feel free to fork this repository and to suggest changes with pull requests. Please stay in line with the existing code style. Please also read the general goal(s) of this project higher above.

## License
MIT
