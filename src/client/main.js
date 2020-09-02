import { createApp } from 'vue';

import App from './app.vue';
import router from './router';
import store from './store';

import '@@/scss/reset.scss';

let dom = document.createElement('div');
dom.id = 'app';
document.getElementsByTagName('body')[0].appendChild(dom);
createApp(App).use(store).use(router).mount('#app');


