
import '../styles/bootstrap.min.css';
import '../styles/bootstrap_grid.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/global.css'
import '../styles/modern-business.css'
import '../styles/style.css'
import '../styles/nice-select.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
    return <div>
        <Component {...pageProps} />
        <ToastContainer />
    </div>
}