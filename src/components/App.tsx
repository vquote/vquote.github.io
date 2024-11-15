import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'

import Header, { HeaderProp } from "yoga1290-ui-pool/react/header";

import ReportsPage from "./pages/reports";
import VideoPage from "./video-add-quote";
import AccountPage from "./pages/account";
import Login from './pages/login';

import './App.scss';
import BrowsePage from './pages/browse';
import VideoPlaylist from './video-playlist';

const headerProps: HeaderProp = {
    brand: 'VQuote',
    items: [{
        title: 'Browse',
        link: '/browse',
        icon: 'explore'
    }, {
        title: 'Reports',
        link: '/reports',
        icon: 'text_snippet'
    }, {
        title: 'Account',
        link: '/account',
        icon: 'folder_shared'
    }]
};



export default () => {
  
    const [_accessToken, _setAccessToken] = useState<String>('');
    // const hasAccessToken = accessToken !== '';
    const hasAccessToken = true; //accessToken !== '';


  return (<div>       

        {hasAccessToken? <></> : <Login />}

        <HashRouter>

            {hasAccessToken?  
                <Header brand={headerProps.brand}
                        items={headerProps.items} />

                : <></>}
            

            <div className="container-fluid">
                    <div className="mx-auto p-0 col-lg-10 col-md-10 col-sm-12 col-12">
                        <Routes>

                            <Route 
                                path="/"
                                element={<BrowsePage/>}
                            />

                            <Route 
                                path="/browse"
                                element={<BrowsePage/>}
                            />

                            <Route 
                                path="/reports"
                                element={<ReportsPage/>}
                            />

                            <Route 
                                path="/account"
                                element={<AccountPage/>}
                            />

                            <Route 
                                path="/login"
                                element={<Login/>}
                            />

                            <Route
                                path="/video"
                                element={<VideoPage/>}
                            />

                            <Route
                                path="/playlist"
                                element={<VideoPlaylist/>}
                            />

                            
                        </Routes>
                    </div>
                </div>
        </HashRouter>

        

            
    </div>);
};