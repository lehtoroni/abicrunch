import { useEffect, useState } from 'preact/hooks';
import { CalcPreferences, GlobalState } from '..';
import { CalcEvent } from '../event';

export function useCalcScope(state: GlobalState): [Record<string, any>, (setter: (a: Record<string, any>) => Record<string, any>) => any] {
    
    const [currentScope, setCurrentScope] = useState<Record<string, any>>(state.scope);
    
    useEffect(() => {
        
        function onScopeUpdate() {
            setCurrentScope({ ...state.scope });
        }
        
        state.events.addListener(CalcEvent.SCOPE_UPDATE, onScopeUpdate);
        
        return () => {
            state.events.removeListener(CalcEvent.SCOPE_UPDATE, onScopeUpdate);
        }
        
    });
    
    return [currentScope, (setScope: ( (scope: Record<string, any>) => Record<string, any> )) => {
        state.scope = { ...(setScope(currentScope)) };
        state.events.emit(CalcEvent.SCOPE_UPDATE, state.prefs);
    }];
    
}

export function useCalcPrefs(state: GlobalState): [CalcPreferences, (setter: (a: CalcPreferences) => CalcPreferences) => any] { 
     
    const [currentPrefs, setCurrentPrefs] = useState<CalcPreferences>({ ...state.prefs });
    
    useEffect(() => {
        
        function onPrefsChange(prefs: CalcPreferences) {
            setCurrentPrefs({ ...prefs });
        }
        
        state.events.addListener(CalcEvent.UPDATED_CALC_PREFS, onPrefsChange);
        
        return () => {
            state.events.removeListener(CalcEvent.UPDATED_CALC_PREFS, onPrefsChange);
        }
        
    }, []);
    
    return [currentPrefs, (setPrefs: ( (prefs: CalcPreferences) => CalcPreferences )) => {
        state.prefs = { ...(setPrefs(currentPrefs)) };
        state.events.emit(CalcEvent.UPDATED_CALC_PREFS, state.prefs);
    }];
    
}


export function convertUnicodeExponents(str: string) {
    
    const superscriptMap: Record<string, string> = {
        '⁰': '0',
        '¹': '1',
        '²': '2',
        '³': '3',
        '⁴': '4',
        '⁵': '5',
        '⁶': '6',
        '⁷': '7',
        '⁸': '8',
        '⁹': '9'
    };
    
    return str.replace(/([0-9A-Za-z])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (match, base, exp) => {
        const normalExp = exp.split('').map((char: string) => superscriptMap[char] || char).join('');
        return base + '^' + normalExp;
    });
    
}