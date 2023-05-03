import {useContext, useState} from "react";
import {UserContext} from "../pages/_app";
import Link from "next/link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default function MainMenu() {
    const {user} = useContext(UserContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Link onClick={handleClose} href='/'>My account</Link>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu></> : <Link href='/login'>login</Link>}
        </div>
    )
}
