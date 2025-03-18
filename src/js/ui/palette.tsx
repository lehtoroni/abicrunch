import { h } from 'preact';
import { lang, Lang } from '../lang';
import { GlobalState } from '..';
import { CalcEvent } from '../event';

export type CalcCommand = {
    title: { fi: string, en: string, se?: string },
    args?: string[],
    brackets?: boolean
};

export const COMMANDS: Record<string, CalcCommand> = {
    'sin': { title: { fi: 'Sini', en: 'Sine' }, args: ['a'], brackets: true },
    'cos': { title: { fi: 'Kosini', en: 'Cosine' }, args: ['a'], brackets: true },
    'tan': { title: { fi: 'Tangentti', en: 'Tangent' }, args: ['a'], brackets: true },
    'asin': { title: { fi: 'Arkussini', en: '' }, args: ['a'], brackets: true },
    'acos': { title: { fi: 'Arkuskosini', en: '' }, args: ['a'], brackets: true },
    'atan': { title: { fi: 'Arkustangentti', en: '' }, args: ['a'], brackets: true },
    'arcsin': { title: { fi: 'Arkussini', en: '' }, args: ['a'], brackets: true },
    'arccos': { title: { fi: 'Arkuskosini', en: '' }, args: ['a'], brackets: true },
    'arctan': { title: { fi: 'Arkustangentti', en: '' }, args: ['a'], brackets: true },
    'sinh': { title: { fi: 'Hyperbolinen sini', en: '' }, args: ['a'], brackets: true },
    'cosh': { title: { fi: 'Hyperbolinen kosini', en: '' }, args: ['a'], brackets: true },
    'tanh': { title: { fi: 'Hyperbolinen tangentti', en: '' }, args: ['a'], brackets: true },
    'asinh': { title: { fi: 'Hyperbolinen arkussini', en: '' }, args: ['a'], brackets: true },
    'acosh': { title: { fi: 'Hyperbolinen arkuskosini', en: '' }, args: ['a'], brackets: true },
    'atanh': { title: { fi: 'Hyperbolinen arkustangentti', en: '' }, args: ['a'], brackets: true },
    'arcsinh': { title: { fi: 'Hyperbolinen arkussini', en: '' }, args: ['a'], brackets: true },
    'arccosh': { title: { fi: 'Hyperbolinen arkuskosini', en: '' }, args: ['a'], brackets: true },
    'arctanh': { title: { fi: 'Hyperbolinen arkustangentti', en: '' }, args: ['a'], brackets: true },
    'sqrt': { title: { fi: 'Neliöjuuri', en: '' }, args: ['a'], brackets: true },
    'cbrt': { title: { fi: 'Kuutiojuuri', en: '' }, args: ['a'], brackets: true },
    'log': { title: { fi: 'Logaritmi', en: '' }, args: ['a'], brackets: true },
    'log2': { title: { fi: 'Logaritmi (2-kantainen)', en: '' }, args: ['a'], brackets: true },
    'ln': { title: { fi: 'Logaritmi (luonnollinen)', en: '' }, args: ['a'], brackets: true },
    'lg': { title: { fi: 'Logaritmi', en: '' }, args: ['a'], brackets: true },
    'log10': { title: { fi: 'Logaritmi (10-kantainen9', en: '' }, args: ['a'], brackets: true },
    'expm1': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    'log1p': { title: { fi: '', en: '' }, args: ['a'] , brackets: true},
    'abs': { title: { fi: 'Itseisarvo', en: '' }, args: ['a'], brackets: true },
    'ceil': { title: { fi: 'Katto', en: '' }, args: ['a'], brackets: true },
    'floor': { title: { fi: 'Lattia', en: '' }, args: ['a'], brackets: true },
    'round': { title: { fi: 'Pyöristys', en: '' }, args: ['a'], brackets: true },
    'trunc': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    '-': { title: { fi: 'Miinus', en: '' }, args: ['a'] },
    '+': { title: { fi: 'Plus', en: '' }, args: ['a'] },
    'exp': { title: { fi: 'Eksponentti', en: '' }, args: ['a'], brackets: true },
    'not': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    'length': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    '!': { title: { fi: 'Kertoma', en: '' }, args: ['a'] },
    'sign': { title: { fi: 'Merkki', en: '' }, args: ['a'], brackets: true },
    '*': { title: { fi: 'Kertomerkki', en: '' }, args: ['a'] },
    '/': { title: { fi: 'Jakolasku', en: '' }, args: ['a'] },
    '%': { title: { fi: 'Modulo', en: '' }, args: ['a'] },
    '^': { title: { fi: 'Potenssi', en: '' }, args: ['a'] },
    '||': { title: { fi: 'Looginen TAI', en: '' }, args: ['a'] },
    '==': { title: { fi: 'Looginen YHTÄ SUURI', en: '' }, args: ['a'] },
    '!=': { title: { fi: 'Looginen ERISUURI', en: '' }, args: ['a'] },
    '>': { title: { fi: 'Suurempi kuin', en: '' }, args: ['a'] },
    '<': { title: { fi: 'Pienempi kuin', en: '' }, args: ['a'] },
    '>=': { title: { fi: 'Suurempi tai yhtä suuri kuin', en: '' }, args: ['a'] },
    '<=': { title: { fi: 'Pienempi tai yhtä suuri kuin', en: '' }, args: ['a'] },
    'and': { title: { fi: 'Looginen JA', en: '' }, args: ['a'] },
    'or': { title: { fi: 'Looginen TAI', en: '' }, args: ['a'] },
    'in': { title: { fi: '', en: '' }, args: ['a'] },
    'random': { title: { fi: 'Satunnaisluku', en: '' }, args: ['a'], brackets: true },
    'fac': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    'min': { title: { fi: 'Minimi', en: '' }, args: ['a'], brackets: true },
    'max': { title: { fi: 'Maksimi', en: '' }, args: ['a'], brackets: true },
    'hypot': { title: { fi: 'Pythagoraan lause', en: '' }, args: ['a'], brackets: true },
    'pyt': { title: { fi: 'Pythagoraan lause', en: '' }, args: ['a'], brackets: true },
    'pow': { title: { fi: 'Potenssi', en: '' }, args: ['a'], brackets: true },
    'atan2': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    'if': { title: { fi: 'Looginen JOS', en: '' }, args: ['a'] },
    'gamma': { title: { fi: 'Gamma', en: '' }, args: ['a'], brackets: true },
    'roundTo': { title: { fi: 'Pyöristä tarkkuuteen', en: '' }, args: ['a', 'n'], brackets: true },
    'map': { title: { fi: '', en: '' }, args: ['...'], brackets: true },
    'fold': { title: { fi: '', en: '' }, args: ['...'], brackets: true },
    'filter': { title: { fi: '', en: '' }, args: ['...'], brackets: true },
    'indexOf': { title: { fi: '', en: '' }, args: ['a'], brackets: true },
    'join': { title: { fi: '', en: '' }, args: ['...'], brackets: true },
    'sum': { title: { fi: '', en: '' }, args: ['...'], brackets: true },
    
    
    'nCr': { title: { fi: 'nCr', en: 'nCr' }, args: ['n', 'r'], brackets: true },
    'nPr': { title: { fi: 'nPr', en: 'nr' }, args: ['n', 'r'], brackets: true },
    
    'average': { title: { fi: 'Keskiarvo', en: 'Average' }, args: ['...'], brackets: true },
    'stddev': { title: { fi: 'Hajonta', en: 'Standard deviation' }, args: ['...'], brackets: true },
    
    'mean': { title: { fi: 'Keskiarvo', en: 'Mean' }, args: ['...'], brackets: true },
    'variance': { title: { fi: 'Varianssi', en: 'Variance' }, args: ['...'], brackets: true },
    'median': { title: { fi: 'Mediaani', en: 'Median' }, args: ['...'], brackets: true },
    
    'binompmf': { title: { fi: 'binompmf', en: 'binompmf' }, args: ['x', 'N', 'p'], brackets: true },
    'binomcdf': { title: { fi: 'binomcdf', en: 'binomcdf' }, args: ['x', 'N', 'p'], brackets: true },
    'binommean': { title: { fi: 'binommean', en: 'binommean' }, args: ['N', 'p'], brackets: true },
    'binomvar': { title: { fi: 'binomvar', en: 'binomvar' }, args: ['N', 'p'], brackets: true },
    'hyperpmf': { title: { fi: 'hypergeompmf', en: 'hypergeompmf' }, args: ['x', 'N', 'K', 'n'], brackets: true },
    'hypercdf': { title: { fi: 'hypergeomcdf', en: 'hypergeomcdf' }, args: ['x', 'N', 'K', 'n'], brackets: true },
    'hypermean': { title: { fi: 'hypergeommean', en: 'hypergeommean' }, args: ['N', 'K', 'n'], brackets: true },
    'hypervar': { title: { fi: 'hypergeomvar', en: 'hypergeomvar' }, args: ['N', 'K', 'n'], brackets: true },
    
};

const COMMAND_LIST = Object.entries(COMMANDS);
COMMAND_LIST.sort((a, b) => a[0].localeCompare(b[0]));

export function CalcCommandPalette(props: { state: GlobalState }) {
    
    const { state } = props;
    
    
    return <div className='calc-command-palette'>
        {COMMAND_LIST.map(([commandName, commandInfo], n) =>
        <div
            className='calc-command'
            key={commandName}
            onMouseDown={e => {
                e.preventDefault();
            }}
            onClick={e => {
                e.preventDefault();
                state.events.emit(CalcEvent.COMMAND_INSERT_EXPRESSION, commandName, commandInfo);
            }}
            title={lang(commandInfo.title)}
            >
            <span className='calc-command-key'>{commandName}</span>
        </div>
    )}
    </div>;
    
}
