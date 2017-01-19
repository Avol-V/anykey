/**
 * AnyKey – Password Manager with client-side encryption.
 * 
 * UI entry point.
 */
;

import {h, render} from 'preact';
import 'preact/devtools/index';
import Home from './scenes/Home/index';

render( <Home />, document.body );
