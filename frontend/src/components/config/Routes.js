import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Feed from './../feed/Feed';
import NotFound from './../NotFound';
import Register from './../form/Register';
import App from './../App';
import Login from '../form/Login';


function RoutesURL () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routes