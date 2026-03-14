import { createContext, h, render } from 'preact';
import { AbicrunchCalc } from './calc';
import EventEmitter from 'eventemitter3';

const base = document.querySelector('#base');
if (!base) throw new Error(`No base?!`);

export type CalcPreferences = {
    lang: 'fi' | 'se' | 'en',
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
        lang: 'fi',
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

if (localStorage.getItem('__crunch_prefs')) {
    try {
        
        const rawPrefs = JSON.parse(localStorage.getItem('__crunch_prefs') || '');
        if (typeof rawPrefs !== 'object') {
            throw new Error(`Incorrect prefs parse type in URL`);
        }
        
        for (const key in GLOBAL_STATE.prefs) {
            
            // this is as much "validation" as we currently do...
            if (!(key in rawPrefs)) {
                continue;
            }
            
            (GLOBAL_STATE.prefs as any)[key] = rawPrefs[key];
            
        }
        
    } catch (err) {
        console.log(`__crunch_prefs corrupted in localStorage?`);
        console.error(err);
    }
}

if (baseParams.has('prefs')) {
    try {
        
        const rawPrefs = JSON.parse(baseParams.get('prefs') || '');
        if (typeof rawPrefs !== 'object') {
            throw new Error(`Incorrect prefs parse type in URL`);
        }
        
        for (const key in rawPrefs) {
            (GLOBAL_STATE.prefs as any)[key] = rawPrefs[key];
        }
        
    } catch (err) {
        console.error(err);
    }
}

if (baseParams.has('view') && baseParams.get('view') == 'standalone') {
    document.body.classList.add('standalone');
}

let calcMode: 'simple' | 'full' | 'exam' = 'full';
if (baseParams.has('mode')) {
    
    const mode = baseParams.get('mode');
    
    if (mode == 'simple') {
        
        calcMode = 'simple';
        document.body.classList.add('mode-simple');
        
        GLOBAL_STATE.prefs.precision = 20;
        GLOBAL_STATE.prefs.isKeypadVisible = true;
        GLOBAL_STATE.prefs.isSidebarVisible = false;
        
    } else if (mode == 'exam') {
        
        calcMode = 'exam';
        document.body.classList.add('mode-exam');
        
        GLOBAL_STATE.prefs.precision = 12;
        GLOBAL_STATE.prefs.isKeypadVisible = true;
        GLOBAL_STATE.prefs.isSidebarVisible = false;
        
    }
    
}

export const CrunchContext = createContext<GlobalState>(GLOBAL_STATE);

render(<AbicrunchCalc state={GLOBAL_STATE} mode={calcMode}/>, base);
