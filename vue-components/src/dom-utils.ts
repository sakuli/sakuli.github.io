
const querySelector = document.querySelector;
export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => Array.from(document.querySelectorAll(selector))

export const isCurrentLocation = (a: HTMLAnchorElement) => {
    return (
        a.protocol === location.protocol &&
        a.hostname === location.hostname &&
        a.port === location.port &&
        a.pathname === location.pathname &&
        a.search === location.search
    )
}


export const createToggle = <T, K = keyof T>(o: T, p: keyof T, [v1, v2]: [T[typeof p], T[typeof p]], preventDefault: boolean = false) => {
    if (o) {

        if (!preventDefault) o[p] = v1;
        return () => {
            o[p] = o[p] === v1 ? v2 : v1;
        }
    } else {
        return () => console.warn('element was undefined')
    }
}

export const syncSize = (selector: string, childSelector: string) => {
    const p = $(selector);
    if (p) {
        const c = p.querySelector(childSelector) as HTMLElement
        if(c) {
            const sync = () => {
                const { width, height } = p.getBoundingClientRect();
                if (width > 0 && height > 0) {
                    c.style.width = `${width}px`
                    c.style.height = `${height}px`
                }
            }
            window.addEventListener('resize', sync);
            sync();
        }
    }
}
