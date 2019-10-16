import { $ } from './dom-utils';


const hideMenuButton = $('#hide-menu-button');
const showMenuButton = $('#show-menu-button');
const mainNav = $('#main-nav');

if (hideMenuButton && mainNav) {
    hideMenuButton.addEventListener('click', e => {
        mainNav.classList.remove('open');
    });
}

if (showMenuButton && mainNav) {
    showMenuButton.addEventListener('click', e => {
        mainNav.classList.add('open');
    });
}
