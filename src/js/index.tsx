import { h, render } from 'preact';
import { AbicrunchCalc } from './calc';
import EventEmitter from 'eventemitter3';

const base = document.querySelector('#base');
if (!base) throw new Error(`No base?!`);

export type CalcPreferences = {
    isDegrees: boolean,
    shouldCleanTrigonometry: boolean,
    precision: number,
    expLimit: number,
    outputMode: 'decimal' | 'hex' | 'binary' | 'octal'
};

export type GlobalState = {
    events: EventEmitter,
    prefs: CalcPreferences,
    scope: Record<string, any>
};

const GLOBAL_STATE: GlobalState = {
    events: new EventEmitter(),
    prefs: {
        isDegrees: false,
        shouldCleanTrigonometry: true,
        precision: 50,
        expLimit: 15,
        outputMode: 'decimal'
    },
    scope: {}
};

render(<AbicrunchCalc state={GLOBAL_STATE}/>, base);
