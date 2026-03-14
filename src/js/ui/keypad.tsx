import { Fragment, h } from 'preact';
import { lang, Lang } from '../lang';
import { GlobalState } from '..';
import { CalcEvent } from '../event';
import { CalcCommand } from './palette';
import { RemixIcon } from 'src/js/utils/remixicon';

const KEYS_LMATH = [
    { title: <Fragment>sin<sup>-1</sup></Fragment>, input: 'arcsin(' },
    { title: <Fragment>^</Fragment>, input: '^' },
    { title: <Fragment>!</Fragment>, input: '!' },
    { title: <Fragment>C</Fragment>, command: 'clear' },
    { title: <Fragment>&larr;</Fragment>, command: 'backspace' },
    { title: <Fragment>(</Fragment>, input: '(' },
    { title: <Fragment>)</Fragment>, input: ')' },
    { title: <Fragment>√</Fragment>, input: 'sqrt(' },
    
    { title: <Fragment>cos<sup>-1</sup></Fragment>, input: 'arccos(' },
    { title: <Fragment>x<sup>2</sup></Fragment>, input: '^2' },
    { title: <Fragment><sup>3</sup>√</Fragment>, input: '^(1/n)' },
    { title: <b>7</b>, input: '7' },
    { title: <b>8</b>, input: '8' },
    { title: <b>9</b>, input: '9' },
    { title: <span className='big'>÷</span>, input: '/' },
    { title: <Fragment>sin</Fragment>, input: 'sin(' },
    
    { title: <Fragment>tan<sup>-1</sup></Fragment>, input: 'arctan(' },
    { title: <Fragment>x<sup>3</sup></Fragment>, input: '^3' },
    { title: <Fragment>&times;10<sup>n</sup></Fragment>, input: '*10^' },
    { title: <b>4</b>, input: '4' },
    { title: <b>5</b>, input: '5' },
    { title: <b>6</b>, input: '6' },
    { title: <span className='big'>×</span>, input: '*' },
    { title: <Fragment>cos</Fragment>, input: 'cos(' },
    
    { title: <Fragment>π</Fragment>, input: 'π' },
    { title: <Fragment>log<sub><sub>10</sub></sub></Fragment>, input: 'log10(' },
    { title: <Fragment>rand</Fragment>, input: 'random()' },
    { title: <b>1</b>, input: '1' },
    { title: <b>2</b>, input: '2' },
    { title: <b>3</b>, input: '3' },
    { title: <span className='big'>&ndash;</span>, input: '-' },
    { title: <Fragment>tan</Fragment>, input: 'tan(' },
    
    { title: <Fragment>e</Fragment>, input: 'e' },
    { title: <Fragment>ln</Fragment>, input: 'ln(' },
    { title: <Fragment>1/x</Fragment>, input: '1/' },
    { title: <Fragment>ans</Fragment>, input: 'ans' },
    { title: <b>0</b>, input: '0' },
    { title: <b>,</b>, input: ',' },
    { title: <span className='big'>+</span>, input: '+' },
    { title: <b>=</b>, command: '=' },
];

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

const KEYS_EXAM = [
    { title: <span className='green'>M<sub>in</sub></span>, command: 'mIn' },
    { title: <span className='black memory-green'>M<sub>out</sub></span>, command: 'mOut' },
    { title: <span className='green'>ANS</span>, input: 'ans' },
    { title: <span className='blue'>log<sub>10</sub></span>, input: 'log10(' },
    { title: <span className='blue'>ln</span>, input: 'ln(' },
    
    { title: <span className='blue'>sin</span>, input: 'sin(' },
    { title: <span className='blue'>cos</span>, input: 'cos(' },
    { title: <span className='blue'>tan</span>, input: 'tan(' },
    { title: <span className='blue'>x²</span>, input: '^2' },
    { title: <span className='blue'>√</span>, input: '√(' },
    
    { title: <span className='blue'>sin<sup>-1</sup></span>, input: 'asin(' },
    { title: <span className='blue'>cos<sup>-1</sup></span>, input: 'acos(' },
    { title: <span className='blue'>tan<sup>-1</sup></span>, input: 'atan(' },
    { title: <span className='blue'>&times;10<sup>n</sup></span>, input: '*10^' },
    { title: <span className='blue'>x<sup>y</sup></span>, input: '^' },
    
    { title: <b>1</b>, input: '1' },
    { title: <b>2</b>, input: '2' },
    { title: <b>3</b>, input: '3' },
    { title: <Fragment>(</Fragment>, input: '(' },
    { title: <Fragment>)</Fragment>, input: ')' },
    
    { title: <b>4</b>, input: '4' },
    { title: <b>5</b>, input: '5' },
    { title: <b>6</b>, input: '6' },
    { title: <span className='big'>+</span>, input: '+' },
    { title: <span className='big'>&ndash;</span>, input: '-' },
    
    { title: <b>7</b>, input: '7' },
    { title: <b>8</b>, input: '8' },
    { title: <b>9</b>, input: '9' },
    { title: <span className='big'>×</span>, input: '×' },
    { title: <span className='big'>÷</span>, input: '÷' },
    
    { title: <b>.</b>, input: '.' },
    { title: <b>0</b>, input: '0' },
    { title: <b>(-)</b>, input: '-' },
    { title: <b>π</b>, input: 'π' },
    { title: <b>e</b>, input: 'e' },
    
    { title: <span className='red' style={{ fontSize: '18px', lineHeight: '0%' }}><RemixIcon icon='ri-delete-back-2-line'/></span>, command: 'backspace' },
    { title: <span className='red'>AC</span>, command: 'clear' },
    { title: <span className='empty'></span>, input: '' },
    { title: <span className='empty'></span>, input: '' },
    { title: <b>=</b>, command: '=' },
];

const KEYS_BY_MODE = {
    'simple': KEYS_LMATH,
    'full': KEYS,
    'exam': KEYS_EXAM
};

export function CalcKeypad(props: { state: GlobalState, mode: 'simple' | 'full' | 'exam' }) {
    
    const { state } = props;
    
    return <div className='calc-keypad'>
        {KEYS_BY_MODE[props.mode].map((key, n) =>
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
                            state.events.emit(CalcEvent.COMMAND_INSERT_EXPRESSION, '', { brackets: false } as CalcCommand);
                        } else if (key.command == 'backspace') {
                            state.events.emit(CalcEvent.COMMAND_BACKSPACE, '');
                        } else if (key.command == '=') {
                            state.events.emit(CalcEvent.COMMAND_EVALUATE, '');
                        } else if (key.command == 'mIn' || key.command == 'mOut') {
                            state.events.emit(CalcEvent.COMMAND_SPECIAL, key.command);
                            state.events.emit(CalcEvent.COMMAND_INSERT_EXPRESSION, '', { brackets: false } as CalcCommand);
                        }
                    }
                }}
                >
                {key.title}
            </div>
        )}
    </div>;
    
}
