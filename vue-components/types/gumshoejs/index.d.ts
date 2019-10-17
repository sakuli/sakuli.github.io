declare module 'gumshoejs' {

    export interface GumshoeOptions {
        nested: boolean,
        nestedClass: string,
        reflow: boolean,
        offset: () => number
    }

    export default class Gumshoe {
        constructor(selector: string, options?: Partial<GumshoeOptions>)
    }
}
