import Link from "next/link";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import MonochromePhotosOutlinedIcon from "@mui/icons-material/MonochromePhotosOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../pages/_app";
import { Tooltip, Avatar } from "@mui/material";

export default function PanelSideBar() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const selectionColor = "rgba(255, 255, 255, 0.15)";
    const [expanded, setExpanded] = useState(true);

    // Handle resize events
    useEffect(() => {
        const handleResize = () => {
            setExpanded(window.innerWidth > 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <nav style={{ background: "linear-gradient(135deg, #2d3436 0%, #3d3d3d 100%)" }} className={`flex flex-col fixed h-screen text-white overflow-x-hidden overflow-y-auto shadow-lg transition-all duration-300 ease-in-out z-50 
            ${expanded ? 'w-60' : 'w-[4rem]'} 
            scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent`}>
            <div className="flex items-center p-1 border-b border-white/10">
                <div className="flex items-center max-w-[200px]">
                    <Avatar className={`bg-white/20 !text-white !font-medium h-8 w-8 ${expanded ? 'mr-3' : 'mr-0'}`}>
                        {getInitials(user?.fullName)}
                    </Avatar>
                    <div className={`overflow-hidden transition-opacity duration-300 text-white ${expanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                        <p className="text-sm font-medium m-0 whitespace-nowrap overflow-hidden text-ellipsis">
                            {user?.fullName}
                        </p>
                        <span className="text-xs text-white/70 block">
                            {user?.roles}
                        </span>
                    </div>
                </div>
                <button
                    className="bg-transparent border-none text-white cursor-pointer flex items-center justify-center w-8 h-8 p-0 rounded-lg transition-all duration-200 hover:bg-white/10 ml-auto"
                    onClick={toggleSidebar}
                    aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <ChevronLeftIcon style={{ transform: expanded ? 'none' : 'rotate(180deg)' }}
                    />
                </button>
            </div>

            <div className="flex-1 flex flex-col p-1">
                <NavItem
                    href="/panel"
                    icon={<DashboardOutlinedIcon />}
                    label="Home"
                    active={router.pathname === "/panel"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/users"
                    icon={<PeopleAltOutlinedIcon />}
                    label="Users"
                    active={router.pathname === "/panel/users"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/news"
                    icon={<AssignmentOutlinedIcon />}
                    label="News"
                    active={router.pathname === "/panel/news"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/media"
                    icon={<MonochromePhotosOutlinedIcon />}
                    label="Media"
                    active={router.pathname === "/panel/media"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/products"
                    icon={<ColorLensOutlinedIcon />}
                    label="Products"
                    active={router.pathname === "/panel/products"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/messages"
                    icon={<MailOutlinedIcon />}
                    label="Messages"
                    active={router.pathname === "/panel/messages"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/shipments"
                    icon={<LocalShippingOutlinedIcon />}
                    label="Shipments"
                    active={router.pathname === "/panel/shipments"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />

                <NavItem
                    href="/panel/orders"
                    icon={<LocalMallOutlinedIcon />}
                    label="Orders"
                    active={router.pathname === "/panel/orders"}
                    expanded={expanded}
                    selectionColor={selectionColor}
                />
            </div>

            <div className="p-2 border-t border-white/10">
                <NavItem
                    href="/"
                    icon={<ReplyOutlinedIcon />}
                    label="Back"
                    expanded={expanded}
                    selectionColor={selectionColor}
                />
            </div>
        </nav>
    );
}

// Extract NavItem as a reusable component
function NavItem({ href, icon, label, active, expanded, selectionColor }) {
    return (
        <Tooltip title={!expanded ? label : ""} placement="right" arrow>
            <Link
                className={`flex items-center py-3 px-4 my-1 rounded-xl text-white/85 no-underline transition-all duration-200 
                    relative overflow-hidden hover:bg-white/10 hover:text-white hover:translate-x-1 
                    ${active ? 'text-white font-medium' : ''}`}
                style={active ? { backgroundColor: selectionColor } : {}}
                href={href}
            >
                <span className={`min-w-6 h-6 flex items-center justify-center ${expanded ? 'mr-4' : 'mr-0'}`}>
                    {icon}
                </span>
                {expanded && <span className="whitespace-nowrap text-sm transition-opacity duration-300">{label}</span>}
            </Link>
        </Tooltip>
    );
}
