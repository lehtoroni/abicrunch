export function Lang(props: {
    fi: any,
    se?: any,
    en?: any
}) {
    
    const LANG: string = 'fi';
    
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
    
    const LANG: string = 'fi';
    
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
