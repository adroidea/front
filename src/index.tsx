import './common/i18n';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './components/app/app.component';
import ErrorPage from './pages/error/error.page';
import Faq from './pages/faq/faq.page';
import Home from './pages/home/home.page';
import React from 'react';
import ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/faq',
                element: <Faq />
            },
            {
                path: '/dashboard'
            }
        ]
    }
]);

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#B02020'
        },
        text: {
            primary: '#fff'
        },
        background: {
            default: '#B02020',
            paper: '#1E1F22'
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
