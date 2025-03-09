import { h } from 'preact';
import { CalcPreferences, GlobalState } from '..';
import { useState } from 'preact/hooks';
import { useCalcPrefs } from '../utils/utils';
import { Lang } from '../lang';


export function CalcAngleUnitSwitch(props: { state: GlobalState }) {
    
    const { state } = props;
    const [currentPrefs, setPrefs] = useCalcPrefs(state);
    
    return <div className='angle-unit-switch'
        onMouseDown={e => {
            e.preventDefault();
        }}
        onClick={e => {
            e.preventDefault();
            setPrefs(prefs => ({ ...prefs, isDegrees: !prefs.isDegrees }));
        }}
        >
        <div className='radian' data-active={`${!currentPrefs.isDegrees}`}>
            <Lang fi='rad' se='rad' en='rad'/>
        </div>
        <div className='degree' data-active={`${currentPrefs.isDegrees}`}>
            <Lang fi='aste' se='deg' en='deg'/>
        </div>
    </div>;
    
}