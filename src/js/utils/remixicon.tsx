import { h } from 'preact';

export function RemixIcon(props: {
    icon: string
}) {
    let icon = props.icon;
    if (!icon.startsWith('ri-')) {
        icon = 'ri-' + icon;
    }
    return <i
        className={[icon].join(' ')}
        ></i>;
}