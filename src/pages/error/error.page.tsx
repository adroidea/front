import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Header from '../../components/header/header.component';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage: React.FC = () => {
    const { t } = useTranslation();
    const error = useRouteError();

    let errorTitle: string;
    let errorDescription: string;

    if (isRouteErrorResponse(error)) {
        errorTitle = t(`errors.${error.status}.title`) || t('errors.unexpected.title');
        errorDescription =
            t(`errors.${error.status}.description`) || t('errors.unexpected.description');
    } else if (error instanceof Error) {
        errorTitle = t('errors.unexpected.title');
        errorDescription = t('errors.unexpected.description');
    } else if (typeof error === 'string') {
        errorTitle = t('errors.unexpected.title');
        errorDescription = t('errors.unexpected.description');
    } else {
        console.error(error);
        errorTitle = t('errors.unexpected.title');
        errorDescription = t('errors.unexpected.description');
    }

    return (
        <>
            <div
                id="error-page"
                className="flex flex-col gap-8 justify-center items-center h-screen"
            >
                <Header />
                <h1 className="text-4xl font-bold">{t(`errors.common.oops`)}</h1>
                <img
                    src="https://media.discordapp.net/attachments/763373897692217384/1186684356522156072/404.png"
                    alt="Error"
                    className="w-96"
                />
                <p>{errorTitle}</p>
                <p className="text-slate-400">
                    <i>{errorDescription}</i>
                </p>
            </div>
        </>
    );
};

export default ErrorPage;
