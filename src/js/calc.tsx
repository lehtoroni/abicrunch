import { CalcPreferences, CrunchContext, GlobalState } from '.';

import { createContext, Fragment, h } from 'preact';
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'preact/hooks';

import { Parser } from '../../expr-eval-decimal';

// @ts-ignore
import { getDecimalInstance } from '../../expr-eval-decimal';
const DecimalInstance = getDecimalInstance();

import { lang, Lang } from './lang';
import { CalcEvent } from './event';
import { CalcAngleUnitSwitch } from './ui/angleUnitSwitch';
import { AbicrunchTopMenu } from './ui/topMenu';
import { RemixIcon } from './utils/remixicon';
import { CalcCommand, CalcCommandPalette } from './ui/palette';
import { CalcVariablePalette } from './ui/variables';
import { convertExamSyntax, convertUnicodeConstants, convertUnicodeExponents, getSymbolType } from './utils/utils';
import { CalcKeypad } from './ui/keypad';
import { CalcHelp } from './ui/help';

export type HistoryLine = {
    input: string,
    output: string,
    hasError?: boolean
};


export function AbicrunchCalc(props: {
    state: GlobalState,
    mode: 'simple' | 'full' | 'exam'
}) {
    
    const { state } = props;
    
    const [historyLines, setHistoryLines] = useState<HistoryLine[]>([]);
    const [historyBrowse, setHistoryBrowse] = useState<number>(0);
    
    const [memoryContent, setMemoryContent] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [selection, setSelection] = useState({ start: 0, end: 0, direction: 'forward' });
    const refHistory = useRef<HTMLDivElement>(null);
    const refInput = useRef<HTMLInputElement>(null);
    
    const [currentPrefs, setCurrentPrefs] = useState<CalcPreferences>({...state.prefs});
    const parser = useMemo(() => new Parser({}, currentPrefs), [currentPrefs]);
    
    function evalLine(line: string) {
        try {
            
            const historyLine = line;
            
            line = convertUnicodeExponents(line);
            line = convertUnicodeConstants(line);
            
            if (props.mode == 'exam') {
                try {
                    line = convertExamSyntax(line);
                } catch (err) {
                    console.error(err);
                }
            }
            
            const expr = parser.parse(line);
            const res = expr.evaluate(state.scope);
            
            let resDisplay = `${res}`;
            switch (typeof res) {
                case 'function': {
                    resDisplay = `${line}`;
                    state.scope[`____${res.name}`] = line.split('=').slice(1).join('=').trim();
                    break;
                }
            }
            
            state.scope[`ans`] = res;
            
            setHistoryLines(l => [...l, {
                input: historyLine,
                output: `${resDisplay}`
            }])
            
            console.log(res, state.scope);
            state.events.emit(CalcEvent.SCOPE_UPDATE);
            
        } catch (err) {
            setHistoryLines(l => [...l, {
                hasError: true,
                input: line,
                output: `${err}`
            }])
            console.error(err);
        }
    }
    
    useEffect(() => {
        
        function onPrefsChange(prefs: CalcPreferences) {
            setCurrentPrefs({ ...prefs });
            localStorage.setItem('__crunch_prefs', JSON.stringify(prefs));
        }
        
        state.events.addListener(CalcEvent.UPDATED_CALC_PREFS, onPrefsChange);
        
        return () => {
            state.events.removeListener(CalcEvent.UPDATED_CALC_PREFS, onPrefsChange);
        }
        
    }, []);
    
    useEffect(() => {
        
        if (!refHistory.current) {
            return;
        }
        
        refHistory.current.scrollTop = refHistory.current.scrollHeight;
        
    }, [historyLines]);
    
    useLayoutEffect(() => {
        refInput.current?.setSelectionRange(
            selection.start,
            selection.end,
            selection.direction as any
        );
    }, [selection]);
    
    useEffect(() => {
        
        function onCopyLast() {
            try {
                navigator.clipboard.writeText(historyLines.at(-1)?.output ?? '')
                    .catch(err => {
                        console.error(err);
                    })
            } catch (err) {
                console.error(err);
            }
        }
        
        function onSetExpression(toValue?: string) {
            setInputText(`${toValue ?? ''}`);
        }
        
        
        
        function onInsertExpression(addValue: string, commandInfo: CalcCommand) {
            
            if (props.mode == 'exam') {
                
                setHistoryLines([]);
                
                const lastSymbol = inputText.length > 0 ? inputText[inputText.length-1] : '';
                let lastType = getSymbolType(lastSymbol);
                let nextType = getSymbolType(addValue);
                
                const REGEX_IGNORE = /\)/gmi;
                const TIMES_SYMBOL = props.mode == 'exam' ? '×' : '*';
                
                if (!REGEX_IGNORE.test(addValue) && lastSymbol != '' && addValue != '') {
                    if ((lastType != nextType
                        && lastType != 'operator'
                        && lastType != 'open'
                        && nextType != 'operator')
                        || (lastType == 'literal' && nextType == 'literal')) {
                        addValue = TIMES_SYMBOL + addValue;
                    }
                }
                
                const cursorPos = selection.start;
                setInputText(t => t.substring(0, cursorPos) + addValue + t.substring(cursorPos));
                setSelection({
                    direction: 'forward',
                    start: cursorPos + addValue.length,
                    end: cursorPos + addValue.length
                });
                
            } else if (selection.start != selection.end) {
                if (commandInfo.brackets) {
                    setInputText(t => t.substring(0, selection.start) + addValue + '(' + t.substring(selection.start, selection.end) + ')' + t.substring(selection.end));
                    setSelection({
                        direction: 'forward',
                        start: selection.start + addValue.length + 1,
                        end: selection.end + addValue.length + 1
                    });
                } else {
                    setInputText(t => t.substring(0, selection.start) + addValue + '(' + t.substring(selection.start, selection.end) + ')' + t.substring(selection.end));
                    setSelection({
                        direction: 'forward',
                        start: selection.start + addValue.length + 1,
                        end: selection.end + addValue.length + 1
                    });
                }
            } else {
                const cursorPos = selection.start;
                if (commandInfo.brackets) {
                    setInputText(t => t.substring(0, cursorPos) + addValue + '()' + t.substring(cursorPos));
                    setSelection({
                        direction: 'forward',
                        start: cursorPos + addValue.length + 1,
                        end: cursorPos + addValue.length + 1
                    });
                } else {
                    setInputText(t => t.substring(0, cursorPos) + addValue + t.substring(cursorPos));
                    setSelection({
                        direction: 'forward',
                        start: cursorPos + addValue.length,
                        end: cursorPos + addValue.length
                    });
                }
            }
            
            setTimeout(() => {
                if (document.activeElement != refInput.current) {
                    refInput.current?.focus();
                }
            }, 1);
            
        }
        
        state.events.addListener(CalcEvent.COMMAND_COPY_LAST, onCopyLast);
        state.events.addListener(CalcEvent.COMMAND_SET_EXPRESSION, onSetExpression);
        state.events.addListener(CalcEvent.COMMAND_INSERT_EXPRESSION, onInsertExpression);
        
        return () => {
            state.events.removeListener(CalcEvent.COMMAND_COPY_LAST, onCopyLast);
            state.events.removeListener(CalcEvent.COMMAND_SET_EXPRESSION, onSetExpression);
            state.events.removeListener(CalcEvent.COMMAND_INSERT_EXPRESSION, onInsertExpression);
        };
        
    }, [historyLines, selection]);
    
    useEffect(() => {
        
        function onSelectExpression() {
            setTimeout(() => {
                refInput.current?.select()
            }, 1);
        }
        
        function onWrapExpression(wrapLeft: string, wrapRight: string) {
            
            if (!refInput.current) return;
                
            const selStart = refInput.current.selectionStart || 0;
            const selEnd = refInput.current.selectionEnd || 0;
            
            setInputText(text => {
                
                if (selStart == selEnd) return text;
                
                return text.substring(0, selStart)
                    + wrapLeft
                    + text.substring(selStart, selEnd)
                    + wrapRight
                    + text.substring(selEnd);
                
            })
            
            setSelection({
                ...selection,
                start: selection.start,
                end: selection.end + 2
            });
            
        }
        
        function onEvalExpression() {
            evalLine(inputText);
            setInputText('');
            setHistoryBrowse(0);
        }
        
        function onBackspace() {
            setInputText(t => `${t}`.slice(0, -1))
        }
        
        function onCommandSpecial(c: 'mIn' | 'mOut') {
            if (c == 'mIn') {
                setMemoryContent(inputText);
            } else if (c == 'mOut') {
                setMemoryContent(mem => {
                    // this is a stupid hack :D
                    setInputText(t => `${t}${mem}`)
                    return mem;
                })
            }
        }
        
        if (memoryContent != '') {
            document.body.classList.add('memory-in');
        } else {
            document.body.classList.remove('memory-in');
        }
        
        state.events.addListener(CalcEvent.COMMAND_SELECT_EXPRESSION, onSelectExpression);
        state.events.addListener(CalcEvent.COMMAND_WRAP_EXPRESSION, onWrapExpression);
        state.events.addListener(CalcEvent.COMMAND_EVALUATE, onEvalExpression);
        state.events.addListener(CalcEvent.COMMAND_BACKSPACE, onBackspace);
        state.events.addListener(CalcEvent.COMMAND_SPECIAL, onCommandSpecial);
        
        return () => {
            state.events.removeListener(CalcEvent.COMMAND_SELECT_EXPRESSION, onSelectExpression);
            state.events.removeListener(CalcEvent.COMMAND_WRAP_EXPRESSION, onWrapExpression);
            state.events.removeListener(CalcEvent.COMMAND_EVALUATE, onEvalExpression);
            state.events.removeListener(CalcEvent.COMMAND_BACKSPACE, onBackspace);
            state.events.removeListener(CalcEvent.COMMAND_BACKSPACE, onCommandSpecial);
        };
        
    }, [selection, inputText]);
    
    useEffect(() => {
        
        if (historyBrowse == 0) return;
        
        const toLine = historyLines.at(-historyBrowse)?.input ?? '';
        
        setInputText(toLine);
        setSelection({ start: toLine.length, end: toLine.length, direction: 'forward' })
        
    }, [historyBrowse, historyLines]);
    
    useEffect(() => {
        
        if (currentPrefs.isSidebarVisible) {
            document.body.classList.add('has-sidebar');
            document.body.classList.remove('no-sidebar');
        } else {
            document.body.classList.remove('has-sidebar');
            document.body.classList.add('no-sidebar');
        }
        
        if (currentPrefs.isKeypadVisible) {
            document.body.classList.add('has-keypad');
            document.body.classList.remove('no-keypad');
        } else {
            document.body.classList.remove('has-keypad');
            document.body.classList.add('no-keypad');
        }
        
    }, [currentPrefs]);
    
    return <div className={[
        'abicrunch'
    ].join(' ')}>
        <CrunchContext.Provider value={props.state}>
            
            <div className='top'>
                <div className='menu'>
                    <AbicrunchTopMenu state={props.state}/>
                </div>
                <div className='switch'>
                    <CalcAngleUnitSwitch state={props.state}/>
                </div>
            </div>
            
            <div className='calc-body'>
                
                <div className='left'>
                    <div className='history' ref={refHistory}>
                        {props.mode == 'exam' && <Fragment>
                            {historyLines.length > 0 && historyLines.at(-1)
                            ? <div className='history-line'
                                data-has-error={`${historyLines.at(-1)?.hasError ?? false}`}>
                                <div className='out'>{historyLines.at(-1)?.hasError ? historyLines.at(-1)?.output : historyLines.at(-1)?.input}</div>
                            </div>
                            : <div className='history-line'>
                                <div className='out'>&nbsp;</div>
                            </div>}
                        </Fragment>}
                        {props.mode == 'simple' && <Fragment>
                            {historyLines.length > 0 && historyLines.at(-1)
                                ? <div className='history-line'
                                    data-has-error={`${historyLines.at(-1)?.hasError ?? false}`}>
                                    <div className='out'>{historyLines.at(-1)?.output}</div>
                                </div>
                                : <div className='history-line'>
                                    <div className='out'>&nbsp;</div>
                                </div>}
                        </Fragment>}
                        {props.mode == 'full' && <Fragment>
                            {historyLines.map((line, n) =>
                                <div className='history-line'
                                    data-has-error={`${line.hasError ?? false}`}
                                    key={n}>
                                    <div className='in'>{line.input}</div>
                                    <div className='out'>= {line.output}</div>
                                </div>
                            )}
                        </Fragment>}
                    </div>
                    
                    <div className='input'>
                        <input
                            autoComplete={'off'}
                            spellcheck={false}
                            ref={refInput}
                            data-is-value={`${props.mode == 'exam' && historyLines.length > 0}`}
                            value={props.mode == 'exam' && historyLines.length > 0
                                    ? historyLines.at(-1)?.output
                                    : inputText}
                            onInput={e => {
                                setInputText(e.currentTarget.value);
                                setSelection({
                                    start: e.currentTarget.selectionStart || 0,
                                    end: e.currentTarget.selectionEnd || 0,
                                    direction: e.currentTarget.selectionDirection || 'forward',
                                });
                            }}
                            onKeyDown={e => {
                                if (props.mode == 'exam') {
                                    if (historyLines.length > 0) {
                                        setHistoryLines([]);
                                    }
                                } else if (e.key == 'Enter') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    evalLine(inputText);
                                    setInputText('');
                                    setHistoryBrowse(0);
                                } else if (e.key == 'ArrowUp') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setHistoryBrowse(b => Math.min(historyLines.length, b+1));
                                } else if (e.key == 'ArrowDown') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setHistoryBrowse(b => Math.max(0, b-1));
                                }
                            }}
                            onSelect={e => {
                                setSelection({
                                    start: e.currentTarget.selectionStart || 0,
                                    end: e.currentTarget.selectionEnd || 0,
                                    direction: e.currentTarget.selectionDirection || 'forward',
                                });
                            }}
                            />
                    </div>
                </div>
                
                <div className='right'>
                    <CalcSidebarTabs state={state}/>
                </div>
                
                <div className='bottom'>
                    <CalcKeypad state={state} mode={props.mode}/>
                </div>
                
            </div>
            
            
        </CrunchContext.Provider>
    </div>;
    
}

export function CalcSidebarTabs(props: { state: GlobalState }) {
    
    const { state } = props;
    const [currentTab, setCurrentTab] = useState<number>(0);
    
    useEffect(() => {
        
        function onChangeTab(toTab: number) {
            setCurrentTab(toTab);
        }
        
        state.events.addListener(CalcEvent.COMMAND_SIDEBAR_TAB, onChangeTab);
        
        return () => {
            state.events.removeListener(CalcEvent.COMMAND_SIDEBAR_TAB, onChangeTab);
        };
        
    }, []);
    
    const TABS = [
        ['commands', 'puzzle-line', <Lang fi='Komennot' en='Commands'/>, <div>
            <CalcCommandPalette state={state}/>
        </div>],
        ['variables', 'formula', <Lang fi='Muisti' en='Memory'/>, <div>
            <CalcVariablePalette state={state}/> 
        </div>],
        ['help', 'lightbulb-line', <Lang fi='Ohje' en='Guide'/>, <div>
            <CalcHelp state={state}/>
        </div>],
    ];
    
    return <Fragment>
        
        <div className='tabs'>
            {TABS.map((item, i) =>
                <div className='tab'
                    data-active={`${currentTab == i}`}
                    key={i}
                    onMouseDown={e => e.preventDefault()}
                    onClick={e => {
                        e.preventDefault();
                        setCurrentTab(i);
                    }}>
                    <RemixIcon icon={item[1] as string}/>
                </div>
            )}
        </div>
        
        <div className='tabs-wrapper'>
            {TABS[currentTab][3]}
        </div>
        
    </Fragment>;
    
}
