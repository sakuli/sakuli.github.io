import { $ } from './dom-utils';


const hideMenuButton = $('#hide-menu-button');
const showMenuButton = $('#show-menu-button');
const mainNav = $('#main-nav');

hideMenuButton.addEventListener('click', e => {
    console.log('hidding')
    mainNav.classList.remove('open');
});

showMenuButton.addEventListener('click', e => {
    mainNav.classList.add('open');
});
