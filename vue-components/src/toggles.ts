import { createToggle } from "./dom-utils";
import { $ } from './dom-utils';

(() => {

    const toggleTocBtn = $('#toggle-toc') as HTMLElement | undefined;
    if (toggleTocBtn) {
        const toc = $('#TableOfContents') as HTMLElement;
        if (toc) {

            const toggleToc = createToggle(
                toc.style,
                'display',
                ['block', 'none'],
                true
            )

            toggleTocBtn.addEventListener('click', () => toggleToc());
        }
    }

})()
