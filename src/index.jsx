import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './style/index.scss';

//prime react
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render( 
    <App />
);
 