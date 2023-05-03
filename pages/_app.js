import './globals.css'
import {createContext, useEffect, useState} from "react";
import {useRouter} from 'next/router';
import MainMenu from "../components/MainMenu";
import Authenticator from "../components/Authenticator";
import PanelSideBar from "../components/PanelSideBar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



export const UserContext = createContext();
export const AlertContext = createContext();

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        import('preline')
    }, [])

    const renderMainMenu = () => {
        if (!router.pathname.includes('/panel') && router.pathname !== '/login') return <MainMenu/>
    }
    const renderPanelSideBar = () => {
        if ((router.pathname.includes('/panel')) && user.roles?.includes('admin') ) return <PanelSideBar/>
    }

    const handleCloseAlert = () => {
        setError('');
        setMessage('');
    }

    return <>
        <AlertContext.Provider value={{setMessage, setError}}>
            <UserContext.Provider value={{user, setUser}}>
                <Authenticator/>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} variant="filled"
                           severity={"error"}>{error}</Alert>
                </Snackbar>
                <Snackbar open={!!message} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} variant="filled"
                           severity={"success"}>{message}</Alert>
                </Snackbar>
                {renderMainMenu()}
                {renderPanelSideBar()}
                {(router.pathname.includes('/panel')) && !user.roles?.includes('admin') ? "Please Login As Admin" : <Component {...pageProps} />  }
            </UserContext.Provider>
        </AlertContext.Provider>

    </>
}

export default MyApp
