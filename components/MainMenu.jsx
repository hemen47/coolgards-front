import {useContext, useState} from "react";
import {AlertContext, UserContext} from "../pages/_app";
import Link from "next/link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {ax} from "../utils/axios";

export default function MainMenu() {
    const {user, setUser} = useContext(UserContext)
    const {setError, setMessage} = useContext(AlertContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        ax.post('/users/logout').then((res) => {
            setMessage(res.data.message);
            setUser('');
        }).catch((e) => {
            setError(e.response?.data?.message || e.message)
            localStorage.removeItem('authenticated')
        })
        setAnchorEl(null);

    }

    return (
        <div className="flex glass fixed top-3 left-8 right-8 p-4 h-12">
            {user ? <><Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {user?.fullName}
            </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {user.roles.includes('admin')? <Link onClick={handleClose} href='/panel'>Dashboard</Link> : ""}
                    <Link onClick={handleClose} href='/profile'>Profile</Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu></> : <Link href='/login'>login</Link>}
        </div>
    )
}
