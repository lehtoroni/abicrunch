import { Fragment, h } from 'preact';
import { GlobalState } from '..';
import { Lang } from '../lang';

const GUIDE_PAGES = {
    'Luvut|Number format': {
        fi: [
            'Desimaalit voi erottaa pisteellä tai pilkulla (1.5 ja 1,5 kelpaavat).',
            <Fragment><b>Heksa-, oktaali- ja binäärilukuja</b> ei tueta tällä hetkellä.</Fragment>
        ],
        en: [
            'Comma and dot are the accepted decimal separators (1.5 and 1,5 are valid).',
            <Fragment><b>Hex, binary, and octal</b> numbers are not supported at the moment.</Fragment>
        ]
    },
    'Laskutoimitukset|Operations': {
        fi: [
            <ul>
                <li><code>+</code> yhteenlasku</li>
                <li><code>-</code> vähennyslasku/miinus</li>
                <li><code>*</code> kertomerkki</li>
                <li><code>/</code> jakomerkki</li>
                <li><code>sqrt(</code> neliöjuuri</li>
                <li><code>^</code> potenssi</li>
                <li><code>!</code> kertoma</li>
                <li>
                    Komentopaletista löytyy lista komennoista ja funktioista.
                </li>
            </ul>
        ],
        en: [
            <ul>
                <li><code>+</code> addition</li>
                <li><code>-</code> subtraction/minus</li>
                <li><code>*</code> multiplication</li>
                <li><code>/</code> division</li>
                <li><code>sqrt(</code> square root</li>
                <li><code>^</code> exponentiation</li>
                <li><code>!</code> factorial</li>
                <li>
                    The command palette contains a list of available commands and functions.
                </li>
            </ul>
        ],
    },
    'Komennot ja funktiot|Commands and functions': {
        fi: [
            <ul>
                <li>Funktion käyttäminen: <br/>
                    <code>komento(parametrit)</code>
                </li>
                <li>Parametrit erotellaan puolipisteellä <code>;</code> <br/>
                    <code>variance(1; 2; 3)</code>
                </li>
            </ul>
        ],
        en: [
            <ul>
                <li>Using a function: <br/>
                    <code>command(parameters)</code>
                </li>
                <li>Parameters are separated by a semicolon <code>;</code> <br/>
                    <code>variance(1; 2; 3)</code>
                </li>
            </ul>
        ],
    },
    'Käyttäjän funktiot|User functions': {
        fi: [
            <ul>
                <li>
                    Funktion määrittely: <br/>
                    <code>f(x) = lauseke</code> <br/>
                    esim. <code>g(x)=(x-1)^2</code>
                </li>
                <li>
                    Funktion käyttäminen: <br/>
                    <code>f(5)</code> <br/>
                    <code>g(f(2))</code>
                </li>
                <li>
                    Muuttujan määrittely: <br/>
                    <code>a = 5</code> <br/>
                    <code>xyz = 5^2 - 5!</code> <br/>
                    <code>pallot = 199</code> <br/>
                </li>
                <li>
                    Laskin tallettaa edellisen vastauksen arvon muuttujaan <code>ans</code>
                </li>
                <li>
                    Funktion tai muuttujan voi määritellä uudelleen
                </li>
                <li>
                    Tallennetut funktiot ja muuttujat voi tyhjentää Istunto-valikosta
                </li>
                <li>
                    Sivupalkin toiselta välilehdeltä löytyy luettelo talletetuista funktioista ja muuttujista
                </li>
            </ul>
        ],
        en: [
            <ul>
                <li>
                    Defining a function: <br/>
                    <code>f(x) = expression</code> <br/>
                    e.g., <code>g(x)=(x-1)^2</code>
                </li>
                <li>
                    Using a function: <br/>
                    <code>f(5)</code> <br/>
                    <code>g(f(2))</code>
                </li>
                <li>
                    Defining a variable: <br/>
                    <code>a = 5</code> <br/>
                    <code>xyz = 5^2 - 5!</code> <br/>
                    <code>balls = 199</code> <br/>
                </li>
                <li>
                    The calculator stores the last answer in the variable <code>ans</code>
                </li>
                <li>
                    Functions and variables can be redefined
                </li>
                <li>
                    Saved functions and variables can be cleared from the Session menu
                </li>
                <li>
                    A list of stored functions and variables can be found in the second tab of the sidebar
                </li>
            </ul>
        ],
    },
    'Kulmayksikkö|Angle unit': {
        fi: [ 'Vaihda kulmayksikkö asteiden ja radiaanien välillä Asetukset-valikosta tai oikean yläkulman painikkeesta.' ],
        en: [ 'Use the Settings menu to change the angle unit, or click on the button in the top right corner.' ],
    },
    'Tuloksen tarkkuus|Result precision': {
        fi: [ 'Tuloksen tarkkuutta ja kymmenpotenssin rajaa voi muuttaa Asetukset-valikosta.' ],
        en: [ 'The result precision and scientific notation threshold can be adjusted in the Settings menu.' ],
    },
    'Painikkeet|Buttons': {
        fi: [ 'Näyttönäppäimet eli laskimen painikkeet saa näkyviin Näytä-valikosta. Voit myös kirjoittaa syötekenttään näppäimistön avulla.' ],
        en: [ 'The on-screen calculator buttons can be enabled from the View menu. You can also enter expressions using the keyboard.' ],
    },
    'Tietoa ohjelmasta|About the program': {
        fi: <Fragment>
            <b>AbiCrunch v0.0.1 <br/></b>
            &copy; Roni Lehto 2025
            <p>
                AbiCrunch on selain&shy;teknologiaan perustuva tieteellinen laskin.
            </p>
            <p>
                AbiCrunch on avointa lähde&shy;koodia ja perustuu useisiin avoimen lähde&shy;koodin ohjelma&shy;kirjastoihin.
            </p>
            <p>
                Abitti&reg; on Ylioppilas&shy;tutkinto&shy;lauta&shy;kunnan rekisteröity tavaramerkki.
                Tämä ohjelmisto ei (ainakaan toistaiseksi) ole YTL:n tuottama tai virallisesti hyväksymä, eikä osa Abitti&reg;-järjestelmää.
            </p>
            <p>
                Koodattu &hearts; Tampereella
            </p>
        </Fragment>,
        en: <Fragment>
            <b>AbiCrunch v0.0.1 <br/></b>
            &copy; Roni Lehto 2025
            <p>
                AbiCrunch is a web-based scientific calculator.
            </p>
            <p>
                AbiCrunch is open-source and built upon multiple open-source libraries.
            </p>
            <p>
                Abitti&reg; is a registered trademark of the Matriculation Examination Board.
                This software is not (at least for now) produced or officially approved by MEB, nor is it part of the Abitti&reg; system.
            </p>
            <p>
                Coded with &hearts; in Tampere
            </p>
        </Fragment>,
    },
};

export function CalcHelp(props: { state: GlobalState }) {
    
    const { state } = props;
    
    return <Fragment>
        <div className='calc-guide' style={{ padding: '4px' }}>
            
            <p>
                <Lang
                    fi='Huomaathan, että tämä ohje on toistaiseksi keskeneräinen.'
                    en='Please note that this guide is still Work in Progress.'
                    />
            </p>
            
            <div>
                {Object.entries(GUIDE_PAGES).map((en, n) =>
                    <details key={en[0]}>
                        <summary><Lang fi={en[0].split('|')[0]} en={en[0].split('|')[1]}/></summary>
                        <Lang {...en[1]}/>
                    </details>
                )}
            </div>
            
        </div>
    </Fragment>;
    
}
