import Gumshoe from 'gumshoejs';
import SmoothScroll from 'smooth-scroll';
import { $ } from './dom-utils'

if ($('#TableOfContents ')) {


    const header = $('header');
    const offset = () => {
        return header ? header.getBoundingClientRect().height : 0;
    }
    const spy = new Gumshoe('#TableOfContents a', {
        nested: true,
        nestedClass: 'active-parent',
        reflow: false,
        offset
    })

    var scroll = new SmoothScroll('a[href*="#"]', {
        offset
    });

}
