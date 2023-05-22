import styles from './PanelSideBar.module.scss'
import Link from "next/link";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import MonochromePhotosOutlinedIcon from '@mui/icons-material/MonochromePhotosOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import {useRouter} from 'next/router';
import {useContext} from "react";
import {UserContext} from "../pages/_app";


export default function PanelSideBar() {
    const router = useRouter();
    const {user} = useContext(UserContext)

    return (

        <nav className={styles.menu}>
            <div>
                <p className="text-center text-lg font-bold	">
                    {user?.fullName}
                </p>
                <p className="text-center text-sm	">
                    ({user?.roles})
                </p>
            </div>
            <Link style={router.pathname === '/panel' ? {backgroundColor: "#032b5c"} : {}} href='/panel'
                  className='flex justify-start items-center'><DashboardOutlinedIcon sx={{marginRight: ".5rem"}}/>Home
            </Link><Link style={router.pathname === '/panel/users' ? {backgroundColor: "#032b5c"} : {}} href='/panel/users'
                  className='flex justify-start items-center'><PeopleAltOutlinedIcon sx={{marginRight: ".5rem"}}/>Users</Link>
            <Link style={router.pathname === '/panel/blog' ? {backgroundColor: "#032b5c"} : {}} href='/panel/posts'
                  className='flex justify-start items-center'><AssignmentOutlinedIcon sx={{marginRight: ".5rem"}}/>Posts</Link>
            <Link style={router.pathname === '/panel/media' ? {backgroundColor: "#032b5c"} : {}} href='/panel/media'
                  className='flex justify-start items-center'><MonochromePhotosOutlinedIcon
                sx={{marginRight: ".5rem"}}/>Media</Link>
            <Link style={router.pathname === '/panel/products' ? {backgroundColor: "#032b5c"} : {}}
                  href='/panel/products' className='flex justify-start items-center'><ColorLensOutlinedIcon
                sx={{marginRight: ".5rem"}}/>Products</Link>
            <Link style={router.pathname === '/panel/orders' ? {backgroundColor: "#032b5c"} : {}}
                  href='/panel/orders' className='flex justify-start items-center'><LocalMallOutlinedIcon
                sx={{marginRight: ".5rem"}}/>Orders</Link>
            <Link  href='/' className='flex justify-start items-center'><ReplyOutlinedIcon
                sx={{marginRight: ".5rem"}}/>Back</Link>
        </nav>
    )
}
