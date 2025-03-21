import { Fragment, h } from 'preact';
import { lang, Lang } from '../lang';
import { GlobalState } from '..';
import { CalcEvent } from '../event';
import { useCalcScope } from '../utils/utils';
import { CalcCommand } from './palette';

export function CalcVariablePalette(props: { state: GlobalState }) {
    
    const { state } = props;
    
    const [scope, updateScope] = useCalcScope(state);
    const SCOPE_ENTRIES = Object.entries(scope);
    
    return <div className='calc-command-palette'>
        {SCOPE_ENTRIES.length == 0 &&
            <div className='calc-palette-info'>
                <Lang fi='Määrittelemäsi funktiot ja muuttujat näkyvät tässä.' en='User-defined functions and variables will be displayed here.'/>
            </div>}
        {SCOPE_ENTRIES.filter(en => !en[0].startsWith('____')).map(([key, value], n) => {
            
            return <div
                className='calc-command'
                key={key}
                onMouseDown={e => {
                    e.preventDefault();
                }}
                onClick={e => {
                    e.preventDefault();
                    state.events.emit(CalcEvent.COMMAND_INSERT_EXPRESSION, key, {} as CalcCommand);
                }}
                >
                <VariableDisplay state={state} name={key} value={value}/>
            </div>;
            
        })}
    </div>;
    
}

export function VariableDisplay(props: { state: GlobalState, name: string, value: any }) {
    
    const { state } = props;
    
    switch (typeof props.value) {
        case 'function': {
            return <Fragment>
                <span className='calc-command-key'>
                    {props.name}()
                </span>
                <span className='calc-command-value'> = {state.scope[`____${props.name}`] ?? lang({ fi: 'funktio', en: 'function' })}</span>
            </Fragment>;
        }
        default: {
            return <Fragment>
                <span className='calc-command-key'>
                    {props.name}
                </span>
                <span className='calc-command-value'> = {`${props.value}`}</span>
            </Fragment>;
        }
    }
    
}
