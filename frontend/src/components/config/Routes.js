import { Routes, Route } from 'react-router-dom';

import Feed from './../feed/Feed';
import NotFound from './../NotFound';
import Auth from '../auth/Auth';
import Profil from '../header/profil/Profil'

function RoutesURL() {
    return (

        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Feed />} />
            <Route path="/profil/:id" element={<Profil />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

    )
}

export default RoutesURL