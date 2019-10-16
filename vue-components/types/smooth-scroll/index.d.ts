declare module "smooth-scroll" {
    interface SmoothScrollOptions {
        offset: () => number
    }
    class SmoothScroll {
        constructor(
            selector:string,
            options: SmoothScrollOptions
        )
    }

    export default SmoothScroll;
}
