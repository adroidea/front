import './app.component.scss';
import Header from '../header/header.component';
import { Outlet } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default App;
