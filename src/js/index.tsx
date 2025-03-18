import { h, render } from 'preact';
import { AbicrunchCalc } from './calc';
import EventEmitter from 'eventemitter3';

const base = document.querySelector('#base');
if (!base) throw new Error(`No base?!`);

export type CalcPreferences = {
    isSidebarVisible: boolean,
    isKeypadVisible: boolean,
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
        isSidebarVisible: true,
        isKeypadVisible: true,
        isDegrees: false,
        shouldCleanTrigonometry: true,
        precision: 50,
        expLimit: 15,
        outputMode: 'decimal'
    },
    scope: {}
};

const baseUrl = new URL(window.location.href);
const baseParams = baseUrl.searchParams;
if (baseParams.has('view') && baseParams.get('view') == 'standalone') {
    document.body.classList.add('standalone');
}

render(<AbicrunchCalc state={GLOBAL_STATE}/>, base);
