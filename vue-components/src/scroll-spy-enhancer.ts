import Gumshoe from 'gumshoejs';
import SmoothScroll from 'smooth-scroll';
import { $ } from './dom-utils'

if ($('#TableOfContents ')) {


    const header = $('header');
    const offset = () => {
        return header.getBoundingClientRect().height;
    }
    const spy = new Gumshoe('#TableOfContents a', {
        nested: true,
        nestedClass: 'active-parent',
        reflow: false,
        offset
    })

    /*
    const gumshoeEventHandler = (event: any) => {
        // The list item
        //var li = event.target;
        // The link
        //var link = event.detail.link;
        // The content
        const content = event.detail.content;
        const stickyHeader = $('.page .stick-header--content')
        const child = stickyHeader.firstElementChild;
        if (child) {
            stickyHeader.replaceChild(content.cloneNode(true), child)
        } else {
            stickyHeader.appendChild(content.cloneNode(true));
        }

    }
    document.addEventListener('gumshoeActivate', gumshoeEventHandler, false);
    document.addEventListener('gumshoeDeactivate', gumshoeEventHandler, false);
    */
    var scroll = new SmoothScroll('a[href*="#"]', {
        offset
    });

}
