import {useContext, useEffect} from "react";
import {AlertContext, UserContext} from "../pages/_app";
import {ax} from "../utils/axios";


export default function Authenticator() {
    const {setUser} = useContext(UserContext)
    const {setError} = useContext(AlertContext)
    useEffect(() => {
        if (localStorage.getItem('authenticated')) {
            if (!user) {
                ax.get('/users/me').then((res) => {
                    setUser(res.data)
                }).catch((e) => {
                    setError(e.response?.data?.message || e.message)
                    localStorage.removeItem('authenticated')
                })
            }
        }
    }, [])
    const {user} = useContext(UserContext)
}
