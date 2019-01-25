import style from "../scss/main.scss";
import FilterableContent, { getData, initialize } from "./filterable-content.js";
import Testiomonial from "./testimonial.js";

// Run all Js files from here
getData().then(initialize);



