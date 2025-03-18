import { Fragment, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { GlobalState } from '..';
import { CalcEvent } from '../event';
import { Lang } from '../lang';
import { RemixIcon } from '../utils/remixicon';
import { useCalcPrefs } from '../utils/utils';


export function AbicrunchTopMenu(props: { state: GlobalState }) {
    
    const { state } = props;
    
    const [calcPrefs, setPrefs] = useCalcPrefs(props.state);
    const [currentMenuOpen, setCurrentMenuOpen] = useState<number>(-1);
    
    const menuSubmenus: { title: any, menuItems: MenuItem[] }[] = [
        {
            title: <Lang fi='Istunto' en='Session'/>,
            menuItems: [
                {
                    title: <Lang fi='Tyhjennä muisti' en='Clear memory'/>,
                    onClick: () => {
                        const keys = Object.keys(state.scope);
                        for (const key of keys) {
                            delete state.scope[key];
                        }
                        state.events.emit(CalcEvent.SCOPE_UPDATE, state.scope);
                    }
                },
                {
                    title: <Lang fi='Sulje' en='Quit'/>,
                    onClick: () => {
                        window.close();
                    }
                }
            ]
        },
        {
            title: <Lang fi='Muokkaa' en='Edit'/>,
            menuItems: [
                {
                    title: <Lang fi='Kopioi' en='Copy'/>,
                    onClick: () => {
                        document.execCommand('copy');
                    }
                },
                {
                    title: <Lang fi='Kopioi viimeisin tulos' en='Copy last result'/>,
                    onClick: () => {
                        state.events.emit(CalcEvent.COMMAND_COPY_LAST);
                    }
                },
                {
                    title: <Lang fi='Liitä' en='Paste'/>,
                    onClick: () => {
                        navigator.clipboard.readText()
                            .then(textToPaste => {
                                document.execCommand('insertText', false, `${textToPaste}`);
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                },
                {
                    title: <Lang fi='Valitse syöte' en='Select expression'/>,
                    onClick: () => {
                        state.events.emit(CalcEvent.COMMAND_SELECT_EXPRESSION);
                    }
                },
                {
                    title: <Lang fi='Tyhjennä syöte' en='Clear expression'/>,
                    onClick: () => {
                        state.events.emit(CalcEvent.COMMAND_SET_EXPRESSION, '');
                    }
                },
                {
                    title: <Lang fi='Lisää sulut valinnan ympärille' en='Wrap selection in parentheses'/>,
                    onClick: () => {
                        state.events.emit(CalcEvent.COMMAND_WRAP_EXPRESSION, '(', ')');
                    }
                }
            ]
        },
        {
            title: <Lang fi='Näytä' en='View'/>,
            menuItems: [
                {
                    title: <Lang fi='Näytä sivupalkki' en='Show sidebar'/>,
                    isChecked: calcPrefs.isSidebarVisible,
                    onClick: () => {
                        setPrefs(prefs => ({ ...prefs, isSidebarVisible: !prefs.isSidebarVisible }));
                    }
                },
                {
                    title: <Lang fi='Näytä painikkeet' en='Show keypad'/>,
                    isChecked: calcPrefs.isKeypadVisible,
                    onClick: () => {
                        setPrefs(prefs => ({ ...prefs, isKeypadVisible: !prefs.isKeypadVisible }));
                    }
                },
            ]
        },
        {
            title: <Lang fi='Asetukset' en='Settings'/>,
            menuItems: [
                {
                    title: <Lang fi='Tuloksen tarkkuus' en='Result precision'/>,
                    submenu: [
                        ...[5, 10, 20, 25, 50].map(n => ({
                            title: <Lang fi={`${n} desimaalia`} en={`${n} decimals`}/>,
                            isRadio: true,
                            isChecked: calcPrefs.precision == n,
                            onClick: () => {
                                setPrefs(prefs => ({ ...prefs, precision: n }));
                            }
                        }))
                    ]
                },
                {
                    title: <Lang fi='Kulmayksikkö' en='Angle unit'/>,
                    submenu: [
                        {
                            title: <Lang fi='Radiaani' en='Radian'/>,
                            isRadio: true,
                            isChecked: !calcPrefs.isDegrees,
                            onClick: () => {
                                setPrefs(prefs => ({ ...prefs, isDegrees: false }));
                            }
                        },
                        {
                            title: <Lang fi='Aste' en='Degree'/>,
                            isRadio: true,
                            isChecked: calcPrefs.isDegrees,
                            onClick: () => {
                                setPrefs(prefs => ({ ...prefs, isDegrees: true }));
                            }
                        }
                    ]
                },
                {
                    title: <Lang fi='Eksponenttimuodon raja' en='Exponent notation limit'/>,
                    submenu: [
                        ...[5, 10, 15, 20, 25, 50].map(n => ({
                            title: <Lang fi={`10e${n}`} en={`10e${n}`}/>,
                            isRadio: true,
                            isChecked: calcPrefs.expLimit == n,
                            onClick: () => {
                                setPrefs(prefs => ({ ...prefs, expLimit: n }));
                            }
                        }))
                    ]
                }
            ]
        },
        {
            title: <Lang fi='Apua' en='Help'/>,
            menuItems: [
                {
                    title: <Lang fi='Käyttöohje' en='Guide'/>,
                    onClick: () => {
                        setPrefs(prefs => ({ ...prefs, isSidebarVisible: true }));
                        setTimeout(() => {
                            state.events.emit(CalcEvent.COMMAND_SIDEBAR_TAB, 2);
                        }, 100);
                    }
                },
            ]
        }
    ];
    
    return <Fragment>
        {menuSubmenus.map((submenu, i) =>
            <MenuSubmenu
                key={i}
                title={submenu.title}
                menuItems={submenu.menuItems}
                isOpen={i == currentMenuOpen}
                onOpen={() => {
                    if (i == currentMenuOpen) {
                        setCurrentMenuOpen(-1);
                    } else {
                        setCurrentMenuOpen(i);
                    }
                }}
                onHover={() => {
                    if (currentMenuOpen > -1) {
                        setCurrentMenuOpen(i);
                    }
                }}
                onClose={() => {
                    setCurrentMenuOpen(-1);
                }}
                />
        )}
    </Fragment>;
    
}

export function MenuSubmenu(props: {
    title: any,
    menuItems: MenuItem[],
    isOpen: boolean,
    onOpen: () => any,
    onClose: () => any,
    onHover: () => any
}) {
    
    const isVisible = props.isOpen;
    
    useEffect(() => {
        
        if (!isVisible) {
            return;
        }
        
        function onClickOutside(e: MouseEvent) {
            if (!e.target || !(e.target instanceof HTMLElement) || !e.target.matches('.menu, .menu *, .abicrunch-menu-item, .abicrunch-menu-item *')) {
                props.onClose();
            }
        }
        
        document.body.addEventListener('click', onClickOutside);
        
        return () => {
            document.body.removeEventListener('click', onClickOutside);
        }
        
    }, [isVisible]);
    
    return <div className='abicrunch-menu-item'
        onMouseDown={e => {
            e.preventDefault();
        }}
        onClick={e => {
            e.preventDefault();
            if (e.target && e.target instanceof HTMLElement && !e.target.matches('.abicrunch-menu-menu *')) {
                props.onOpen();
            }
        }}
        onMouseEnter={e => {
            props.onHover();
        }}
        >
        
        <span>
            {props.title}
        </span>
        
        <div className='abicrunch-menu-menu' data-visible={`${isVisible}`}>
            {props.menuItems.map((item, i) =>
                item.submenu
                    ? <MenuInlineSubmenu
                        title={item.title}
                        onClose={() => {
                            props.onClose();
                        }}
                        menuItems={item.submenu}
                        />
                    : <div key={`${item.title} ${i}`}
                        className='item'
                        onMouseDown={e => {
                            e.preventDefault();
                        }}
                        onClick={e => {
                            e.preventDefault();
                            item.onClick && item.onClick();
                            props.onClose();
                        }}
                        >
                        <div>
                            {item.isRadio
                                ? (item.isChecked ? <RemixIcon icon='radio-button-line'/> : <RemixIcon icon='checkbox-blank-circle-line'/>)
                                : (item.isChecked ? <RemixIcon icon='check-line'/> : '')}
                        </div>
                        <div>{item.title}</div>
                    </div>
            )}
        </div>
        
    </div>;
    
}

export function MenuInlineSubmenu(props: {
    title: any,
    menuItems: MenuItem[],
    onClose: () => any,
}) {
    
    return <div
        className='item with-submenu'
        onMouseDown={e => {
            e.preventDefault();
        }}
        onClick={e => {
            e.preventDefault();
        }}
        >
        <div></div>
        <div>{props.title}</div>
        <div className='submenu'>
            {props.menuItems.map((item, i) =>
                item.submenu
                    ? <MenuInlineSubmenu title={item.title} menuItems={item.submenu} onClose={() => props.onClose()}/>
                    : <div key={`${item.title} ${i}`}
                        className='item'
                        onMouseDown={e => {
                            e.preventDefault();
                        }}
                        onClick={e => {
                            e.preventDefault();
                            item.onClick && item.onClick();
                            props.onClose();
                        }}
                        >
                        <div>
                            {item.isRadio
                                ? (item.isChecked ? <RemixIcon icon='radio-button-line'/> : <RemixIcon icon='checkbox-blank-circle-line'/>)
                                : ''}
                        </div>
                        <div>{item.title}</div>
                    </div>
            )}
        </div>
    </div>;
    
}

export type MenuItem = {
    title: any,
    disabled?: boolean,
    submenu?: MenuItem[],
    isRadio?: boolean,
    isChecked?: boolean,
    onClick?: () => any
};
