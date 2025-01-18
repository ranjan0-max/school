import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';
import axios from '../intercepter/axios';

// api
import { getUserMenu } from 'api/menu/menuApi';

const AuthContext = createContext(null);

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('accessToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [menu, setMenu] = React.useState([]);
    const [accessableUrls, setAccessableUrls] = useState([]);

    // fetch user menu which is assigned
    const fetchMenu = async () => {
        try {
            const response = await getUserMenu();
            if (typeof response === 'string') {
                console.log(response);
            } else {
                setMenu(response?.userMenu);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getChildersOfMenu = (menu) => {
        if (menu.type == 'group') {
            return menu.children;
        } else {
            return [];
        }
    };

    // set the use accessable urls
    const checkAccessableUrls = () => {
        try {
            const urlsList = [];

            menu.forEach((row) => {
                const childernList = getChildersOfMenu(row);
                childernList.forEach((child) => {
                    urlsList.push(child.url);
                });
            });

            setAccessableUrls(urlsList);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        const init = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                if (accessToken && verifyToken(accessToken)) {
                    setSession(accessToken);
                    const response = await axios.get('/auth/user');
                    const { user } = response.data.data;
                    setUser(user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error(err);
                setUser(null);
                setIsAuthenticated(false);
            }
        };
        init();
    }, []);

    React.useEffect(() => {
        fetchMenu();
    }, [user]);

    React.useEffect(() => {
        checkAccessableUrls();
    }, [menu]);

    const login = async (data) => {
        try {
            const response = await axios.post('/auth/login', data);
            setUser(response.data.data.user);
            setIsAuthenticated(true);
            window.localStorage.setItem('accessToken', response.data.data.accessToken);
            // navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const logOut = async () => {
        try {
            await axios.get('/auth/logout');
        } catch (error) {
            console.log('error ', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            window.localStorage.removeItem('accessToken');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, menu, accessableUrls, setIsAuthenticated, setUser, login, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
