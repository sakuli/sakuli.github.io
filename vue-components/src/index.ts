import 'whatwg-fetch';
import Vue from 'vue';
import PortalVue from 'portal-vue';
Vue.use(PortalVue);

import GdprComponent from './gdpr/gdpr.component.vue';
import DataPrivacyComponent from './gdpr/data-privacy.component.vue';
import ContactForm from "./enterprise/contact-form.component.vue";

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
        el: e, a,
        render(h) {
            return h(ContactForm, {props: {...props}})
        }
    })
})
