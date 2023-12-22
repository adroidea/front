import { IUser } from '../types';
import React from 'react';
import { getAuthStatus } from '../api';

export function useFetchUser() {
    const [user, setUser] = React.useState<IUser>();
    const [error, setError] = React.useState<Error>();
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLoading(true);
        getAuthStatus()
            .then(({ data }) => {
                setUser(data);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { user, error, loading };
}
