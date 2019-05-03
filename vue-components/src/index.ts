import Vue from 'vue';
import GdprComponent from './gdpr/gdpr.component.vue';

const gdprInfo = document.createElement('div');
gdprInfo.classList.add('huhu');
document.body.appendChild(gdprInfo);
new Vue(GdprComponent).$mount(gdprInfo)