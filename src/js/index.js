import style from "../scss/main.scss";
import FilterableContent, { getData, initialize } from './filterable-content.js';
import Testiomonial from './testimonial.js';

console.log('app loaded');

//getData();
//initialize();
export const initFail = ($el, err) => {};

getData().then(initialize).catch(initFail);



