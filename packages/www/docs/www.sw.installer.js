!function(t){function e(e){for(var r,c,u=e[0],a=e[1],f=e[2],s=0,p=[];s<u.length;s++)c=u[s],o[c]&&p.push(o[c][0]),o[c]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);for(l&&l(e);p.length;)p.shift()();return i.push.apply(i,f||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,u=1;u<n.length;u++){var a=n[u];0!==o[a]&&(r=!1)}r&&(i.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},o={3:0},i=[];function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var u=window.webpackJsonp=window.webpackJsonp||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var l=a;i.push([1090,0]),n()}({1090:function(t,e,n){n(336),n(337),t.exports=n(1093)},1093:function(t,e,n){"use strict";n.r(e);n(338);var r=n(495),o=n(182);Object(r.a)("/www.sw.js",{ready:function(){o.b.debug("Service worker from ".concat("/www.sw.js"," is ready"))},registered:function(){o.b.debug("Service worker from ".concat("/www.sw.js"," has been registered"))},cached:function(){o.b.debug("Service worker from ".concat("/www.sw.js"," has cached assets"))},updatefound:function(){o.b.debug("Service worker from ".concat("/www.sw.js"," needs updating"))},updated:function(){o.b.debug("Service worker from ".concat("/www.sw.js"," has been updated")),Materialize.toast('\n        <p>\n            <span class="hide-on-small-and-down">\n                I just pushed\n                <a\n                    target="__blank"\n                    rel="noopener noreferrer"\n                    href="https://github.com/randytarampi/me/releases/latest"\n                    data-metrics-event-name="anchor" \n                    data-metrics-type="href" \n                    data-metrics-name="an update" \n                    data-metrics-label="an update"\n                >\n                    an update\n                </a> and you\'re behind.\n            </span>\n            <a \n                href="javascript:void(0)" \n                data-metrics-event-name="anchor" \n                data-metrics-type="onClick" \n                data-metrics-name="Reload now" \n                data-metrics-label="Reload now"\n                onclick="location.reload();"\n            >\n                Reload now\n            </a> to stay current!\n        </p>\n        <button \n            class="hide-on-small-and-down btn-flat toast-action" \n            onclick="location.reload();"\n            data-metrics-event-name="button" \n            data-metrics-type="onClick" \n            data-metrics-name="Reload and update" \n            data-metrics-label="Reload and update"\n        >\n            Reload and update\n        </button>\n    ',void 0,"toast__sw-updated")},offline:function(){o.b.debug("Service worker from ".concat("/www.sw.js"," reports that we're offline"))},error:function(t){o.b.error(t,"Could not install service worker from ".concat("/www.sw.js"))}})},12:function(t,e,n){"use strict";n.d(e,"c",function(){return f}),n.d(e,"b",function(){return l}),n.d(e,"a",function(){return s});var r=n(323);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={leftAction:{id:"leftAction",position:1},leftLeaningLeftArm:{id:"leftLeaningLeftArm",position:2},leftEar:{id:"leftEar",character:"ʕ",position:3},rightLeaningLeftArm:{id:"rightLeaningLeftArm",position:4},leftEye:{id:"leftEye",character:"•",position:5},nose:{id:"nose",character:"ᴥ",position:6},rightEye:{id:"rightEye",character:"•",position:7},leftLeaningRightArm:{id:"leftLeaningRightArm",position:8},rightEar:{id:"rightEar",character:"ʔ",position:9},rightLeaningRightArm:{id:"rightLeaningRightArm",position:10},rightAction:{id:"rightAction",position:11}},l=function(t){return Object(r.b)(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}({type:"bear",components:f},t))},s=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,c(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,l({})),e}()},162:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(t,e){return t.position<e.position?-1:t.position>e.position?1:0}},182:function(t,e,n){"use strict";var r=n(61),o=n(230),i=n(119),c=n.n(i),u=n(715),a=n(463),f=n(12),l=n(464),s=n(716),p=n(465);function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var b={lennyBear:new u.a,shrugBear:new a.a,bear:new f.a,doubtBear:new l.a,disBear:new s.a,deadBear:new p.a},d=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,o;return e=t,o=[{key:"colorFromLevel",value:function(t){return t>=60?"brightRed":t>=50?"red":t>=40?"magenta":t>=30?"cyan":"brightBlack"}},{key:"nameFromLevel",value:function(t){return t>=60?b.deadBear.toString():t>=50?b.disBear.toString():t>=40?b.doubtBear.toString():t>=30?b.bear.toString():t>=20?b.shrugBear.toString():b.lennyBear.toString()}},{key:"consoleLoggerFromLevel",value:function(t){var e="undefined"!=typeof window&&window.console;return t>=50&&e&&e.error?e.error:t>=40&&e&&e.warn?e.warn:t>=30&&e&&e.info?e.info:t>=10&&e&&e.debug?e.debug:e&&e.log||null}}],(n=[{key:"write",value:function(e){var n=t.consoleLoggerFromLevel(e.level);n&&n("%c｢%s｣ %c%s%c: %s","color: grey",b.bear.toString(),"color: ".concat(t.colorFromLevel(e.level)),r.b[e.level].toUpperCase(),"color: unset",e.msg)}}])&&y(e.prototype,n),o&&y(e,o),t}();n.d(e,"a",function(){return w}),n.d(e,"b",function(){return h});var m=function(){return"undefined"!=typeof window&&window?{windowName:window.NAME,windowEnvironment:window.ENVIRONMENT,windowVersion:window.VERSION,windowSentryDsn:window.SENTRY_DSN,windowLogger:window.LOGGER}:{}},w=function(){var t=m(),e=t.windowName,n=t.windowEnvironment,r=t.windowVersion,o=t.windowLogger;return{logger:e,autoBreadcrumbs:!0,captureUnhandledRejections:!0,maxBreadcrumbs:100,environment:n,release:r,debug:!!o&&["trace","debug"].includes(o.level)}},h=Object(r.a)(function(){var t=m(),e=t.windowName,n=t.windowEnvironment,i=t.windowVersion,u=t.windowSentryDsn,a=t.windowLogger;if(a){var f=[],l=a.streams,s=a.level;return l.console&&f.push({stream:new d,level:s,type:"raw"}),l.sentry&&u&&(c.a.config(u,w()).install(),f.push({level:"warn",type:"raw",stream:new o.SentryStream(c.a)})),{name:e||"jsx",streams:f,src:!1,version:i,environment:n,serializers:r.c}}return{name:"jsx",src:!1,serializers:r.c}}())},323:function(t,e,n){"use strict";n.d(e,"b",function(){return h}),n.d(e,"a",function(){return O});var r=n(2),o=n(162),i=n(87);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var c,u=t[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){d(t,e,n[e])})}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function m(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var w={leftEye:{id:"leftEye",character:"•",position:1},nose:{id:"nose",character:"ᴥ",position:2},rightEye:{id:"rightEye",character:"•",position:3}},h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.components,n=void 0===e?w:e,c=m(t,["components"]);return function(t){function e(){return u(this,e),f(this,l(e).apply(this,arguments))}var p,d,w;return s(e,Object(r["Record"])(b({id:null,type:null,components:Object(r["Map"])(Object.entries(n).reduce(function(t,e){var n=y(e,2),r=n[0],o=n[1];t[r]=i["b"].fromJS(o);return t},{}))},c))),p=e,w=[{key:"parsePropertiesFromJs",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.components;return b({},m(t,["components"]),{components:e&&new r.Map(Object.entries(e).reduce(function(t,e){var n=y(e,2),r=n[0],o=n[1];return t[r]=i.b.fromJS(o),t},{}))})}},{key:"fromJS",value:function(t){return new this(this.parsePropertiesFromJs(t))}},{key:"parsePropertiesFromJson",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.components;return b({},m(t,["components"]),{components:e&&new r.Map(Object.entries(e).reduce(function(t,e){var n=y(e,2),r=n[0],o=n[1];return t[r]=i.b.fromJSON(o),t},{}))})}},{key:"fromJSON",value:function(t){return new this(this.parsePropertiesFromJson(t))}}],(d=[{key:"toString",value:function(){return this.components.join("")}},{key:"components",get:function(){return this.get("components").filter(function(t){return!!t.character}).sort(o.a).toList().toArray()}}])&&a(p.prototype,d),w&&a(p,w),e}()},O=(h(),function(t){function e(){return u(this,e),f(this,l(e).apply(this,arguments))}return s(e,h({type:"emoji"})),e}())},463:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var r=n(12);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}({},r.c,{leftAction:{id:"leftAction",character:"¯",position:1},leftLeaningLeftArm:{id:"leftLeaningLeftArm",character:"\\_",position:2},rightLeaningRightArm:{id:"rightLeaningRightArm",character:"_/",position:10},rightAction:{id:"rightAction",character:"¯",position:11}}),l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,c(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,Object(r["b"])({components:f})),e}()},464:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var r=n(12);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}({},r.c,{leftEye:{id:"leftEye",character:"ಠಿ",position:5},rightEye:{id:"rightEye",character:"ಠ",position:7}}),l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,c(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,Object(r["b"])({components:f})),e}()},465:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var r=n(12);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}({},r.c,{leftEye:{id:"leftEye",character:"×",position:5},rightEye:{id:"rightEye",character:"×",position:7}}),l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,c(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,Object(r["b"])({components:f})),e}()},715:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var r=n(12);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}({},r.c,{leftEye:{id:"leftEye",character:" ͡°",position:5},rightEye:{id:"rightEye",character:" ͡°",position:7}}),l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,c(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,Object(r["b"])({components:f})),e}()},716:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var r=n(12);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}({},r.c,{leftEye:{id:"leftEye",character:"ಠ",position:5},rightEye:{id:"rightEye",character:"ಠ",position:7}}),l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,c(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,Object(r["b"])({components:f})),e}()},87:function(t,e,n){"use strict";n.d(e,"a",function(){return s});var r=n(2);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var s=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,u(e).apply(this,arguments))}var n,o,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(e,Object(r["Record"])({id:null,position:null,character:null,meta:Object(r["Map"])()})),n=e,s=[{key:"fromJSON",value:function(t){return e.fromJS(t)}},{key:"fromJS",value:function(t){var e=t.meta;return new this(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){f(t,e,n[e])})}return t}({},l(t,["meta"]),{meta:e?Object(r.fromJS)(e):Object(r.Map)()}))}}],(o=[{key:"toString",value:function(){return this.character}}])&&i(n.prototype,o),s&&i(n,s),e}();e.b=s}});
//# sourceMappingURL=www.sw.installer.js.map