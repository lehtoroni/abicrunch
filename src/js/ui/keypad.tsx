import { Fragment, h } from 'preact';
import { lang, Lang } from '../lang';
import { GlobalState } from '..';
import { CalcEvent } from '../event';
import { CalcCommand } from './palette';

const KEYS = [
    { title: <b>7</b>, input: '7' },
    { title: <b>8</b>, input: '8' },
    { title: <b>9</b>, input: '9' },
    { title: <span className='big'>÷</span>, input: '/' },
    { title: <Fragment>C</Fragment>, command: 'clear' },
    { title: <Fragment>√</Fragment>, input: 'sqrt(' },
    { title: <Fragment>π</Fragment>, input: 'π' },
    { title: <Fragment>exp</Fragment>, input: 'exp(' },
    { title: <Fragment>ln</Fragment>, input: 'ln(' },
    
    { title: <b>4</b>, input: '4' },
    { title: <b>5</b>, input: '5' },
    { title: <b>6</b>, input: '6' },
    { title: <span className='big'>×</span>, input: '*' },
    { title: <Fragment>E</Fragment>, input: 'e' },
    { title: <Fragment>^</Fragment>, input: '^' },
    { title: <Fragment>ans</Fragment>, input: 'ans' },
    { title: <Fragment>sin</Fragment>, input: 'sin(' },
    { title: <Fragment>sin<sup>-1</sup></Fragment>, input: 'arcsin(' },
    
    { title: <b>1</b>, input: '1' },
    { title: <b>2</b>, input: '2' },
    { title: <b>3</b>, input: '3' },
    { title: <span className='big'>&ndash;</span>, input: '-' },
    { title: <Fragment>(</Fragment>, input: '(' },
    { title: <Fragment>)</Fragment>, input: ')' },
    { title: <Fragment>x</Fragment>, input: 'x' },
    { title: <Fragment>cos</Fragment>, input: 'cos(' },
    { title: <Fragment>cos<sup>-1</sup></Fragment>, input: 'arccos(' },
    
    { title: <b>0</b>, input: '0' },
    { title: <b>,</b>, input: ',' },
    { title: <b>=</b>, command: '=' },
    { title: <span className='big'>+</span>, input: '+' },
    { title: <Fragment>%</Fragment>, input: '%' },
    { title: <Fragment>!</Fragment>, input: '!' },
    { title: <Fragment>x=</Fragment>, input: 'x=' },
    { title: <Fragment>tan</Fragment>, input: 'tan(' },
    { title: <Fragment>tan<sup>-1</sup></Fragment>, input: 'arctan(' }
];

export function CalcKeypad(props: { state: GlobalState }) {
    
    const { state } = props;
    
    return <div className='calc-keypad'>
        {KEYS.map((key, n) =>
            <div
                className='key'
                key={n}
                onMouseDown={e => {
                    e.preventDefault();
                }}
                onClick={e => {
                    e.preventDefault();
                    if (key.input) {
                        state.events.emit(CalcEvent.COMMAND_INSERT_EXPRESSION, key.input, { brackets: false } as CalcCommand);
                    } else {
                        if (key.command == 'clear') {
                            state.events.emit(CalcEvent.COMMAND_SET_EXPRESSION, '');
                        } else if (key.command == '=') {
                            state.events.emit(CalcEvent.COMMAND_EVALUATE, '');
                        }
                    }
                }}
                >
                {key.title}
            </div>
        )}
    </div>;
    
}
