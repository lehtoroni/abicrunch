import { useContext } from 'preact/hooks';
import { CrunchContext } from 'src/js';

export function Lang(props: {
    fi: any,
    se?: any,
    en?: any
}) {
    
    const state = useContext(CrunchContext);
    const LANG = state.prefs.lang;
    
    switch (LANG) {
        case 'fi': {
            return props.fi;
        }
        case 'se': {
            return props.se ?? props.en ?? props.fi;
        }
        case 'en': {
            return props.en ?? props.fi;
        }
    }
    
    return props.fi;
    
}

export function lang(props: {
    fi: string,
    se?: string,
    en?: string
}) {
    
    const state = useContext(CrunchContext);
    const LANG = state.prefs.lang;
    
    switch (LANG) {
        case 'fi': {
            return props.fi;
        }
        case 'se': {
            return props.se ?? props.en ?? props.fi;
        }
        case 'en': {
            return props.en ?? props.fi;
        }
    }
    
    return props.fi;
    
}
