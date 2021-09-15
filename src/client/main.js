import '@@/scss/reset.scss';

import { createApp } from 'vue';

import App from './app.vue';
import router from './router';
import store from './store';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay);

let dom = document.createElement('div');
dom.id = 'app';
document.getElementsByTagName('body')[0].appendChild(dom);
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app');


