import 'whatwg-fetch';
import './docs-nav-enhancer';
import './scroll-spy-enhancer';
import './toggles'
import Vue from 'vue';
import PortalVue from 'portal-vue';
Vue.use(PortalVue);

import GdprComponent from './gdpr/gdpr.component.vue';
import DataPrivacyComponent from './gdpr/data-privacy.component.vue';
import ContactForm from "./enterprise/contact-form.component.vue";
import { syncSize } from './dom-utils';

syncSize('#main-nav', 'nav');

// Mounting gdpr info to an dynamicly created element
const gdprInfo = document.createElement('div');
document.body.appendChild(gdprInfo);
new Vue(GdprComponent).$mount(gdprInfo);

// Mounting
new Vue(DataPrivacyComponent).$mount(document.getElementById('data-privacy-link'));

Array.from(document.querySelectorAll('[data-contactform]')).forEach((e, i) => {
    const props = {
        text: e.textContent,
        code: e.getAttribute('data-contactform'),
        formUrl: e.getAttribute('href')
    }
    new Vue({
        el: e,
        render(h) {
            return h(ContactForm, {props: {...props}})
        }
    })
})
