import { h, render } from 'preact';

const base = document.querySelector('#base');
if (!base) throw new Error(`No base?!`);

render(<p>Hello world!</p>, base);
