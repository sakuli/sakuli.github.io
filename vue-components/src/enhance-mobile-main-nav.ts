import { $ } from './dom-utils';


const hideMenuButton = $('#hide-menu-button');
const showMenuButton = $('#show-menu-button');
const mainNav = $('#main-nav');

if (hideMenuButton) {
    hideMenuButton.addEventListener('click', e => {
        console.log('hidding')
        mainNav.classList.remove('open');
    });
}

if (showMenuButton) {
    showMenuButton.addEventListener('click', e => {
        mainNav.classList.add('open');
    });
}
