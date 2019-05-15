import Vue from 'vue';
import GdprComponent from './gdpr/gdpr.component.vue';
import DataPrivacyComponent from './gdpr/data-privacy.component.vue';

const gdprInfo = document.createElement('div');
document.body.appendChild(gdprInfo);
new Vue(GdprComponent).$mount(gdprInfo);

new Vue(DataPrivacyComponent).$mount(document.getElementById('data-privacy-link'));
