import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './app.css';
import App from './App.svelte';

new App({
  target: document.getElementById('app'),
  hydrate: true,
});
