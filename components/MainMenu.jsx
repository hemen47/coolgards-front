import { useContext, useState, useEffect } from "react";
import { AlertContext, CartContext, UserContext } from "../pages/_app";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { ax } from "../utils/axios";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useRouter } from "next/router";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Divider } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export default function MainMenu() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { setError, setMessage } = useContext(AlertContext);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        ax.post("/api/users/logout")
            .then((res) => {
                router.push("/");
                setMessage(res.data.message);
                document.cookie = "COOKIE_NAME=cookieToken; Max-Age=0; path=/; domain=" + location.host;
                localStorage.removeItem("authenticated");
                setUser("");
            })
            .catch((e) => {
                setError(e.response?.data?.message || e.message);
            });
        setAnchorEl(null);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-3"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            {showMobileMenu ? (
                                <CloseIcon className="block h-6 w-6" />
                            ) : (
                                <MenuOutlinedIcon className="block h-6 w-6" />
                            )}
                        </button>
                        <Link href="/" className="flex items-center">
                            <div className="flex items-center space-x-1">
                                <Image
                                    src="/logo.png"
                                    alt="coolgards logo"
                                    width={48}
                                    height={48}
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                                <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                  CoolGards
                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {[
                                { name: "Products", href: "/products" },
                                { name: "News", href: "/news" },
                                { name: "About", href: "/about" },
                                { name: "Contact Us", href: "/contact" },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        router.pathname === item.href
                                            ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-2">
                        <Link href="/cart">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                                <Badge badgeContent={cart?.length} color="primary">
                                    <ShoppingCartOutlinedIcon className="text-gray-600" />
                                </Badge>
                            </button>
                        </Link>

                        {user ? (
                            <div>
                                <button
                                    onClick={handleClick}
                                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
                                >
                                    <Avatar
                                        sx={{ width: 32, height: 32 }}
                                        alt={user?.fullName}
                                        src={user?.avatar || ""}
                                    >
                                        {user?.fullName?.charAt(0)}
                                    </Avatar>
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                                            mt: 1.5,
                                            borderRadius: "0.75rem",
                                            minWidth: 180,
                                        },
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">Hi, {user?.fullName}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>

                                    {user.roles.includes("admin") && (
                                        <Link href="/panel">
                                            <MenuItem onClick={handleClose} className="hover:bg-gray-50">
                                                <ListItemIcon>
                                                    <Settings fontSize="small" className="text-gray-600" />
                                                </ListItemIcon>
                                                <span className="text-gray-700">Dashboard</span>
                                            </MenuItem>
                                        </Link>
                                    )}

                                    <Link href="/profile">
                                        <MenuItem onClick={handleClose} className="hover:bg-gray-50">
                                            <ListItemIcon>
                                                <PersonIcon fontSize="small" className="text-gray-600" />
                                            </ListItemIcon>
                                            <span className="text-gray-700">Profile</span>
                                        </MenuItem>
                                    </Link>

                                    <Divider />

                                    <MenuItem onClick={handleLogout} className="hover:bg-gray-50">
                                        <ListItemIcon>
                                            <Logout fontSize="small" className="text-gray-600" />
                                        </ListItemIcon>
                                        <span className="text-gray-700">Logout</span>
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={handleClick}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <PersonOutlineOutlinedIcon className="text-gray-600" />
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                                            mt: 1.5,
                                            borderRadius: "0.75rem",
                                            minWidth: 180,
                                        },
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <Link href="/login">
                                        <MenuItem className="hover:bg-gray-50">
                                            <ListItemIcon>
                                                <VpnKeyOutlinedIcon fontSize="small" className="text-gray-600" />
                                            </ListItemIcon>
                                            <span className="text-gray-700">Login</span>
                                        </MenuItem>
                                    </Link>

                                    <Link href="/signup">
                                        <MenuItem className="hover:bg-gray-50">
                                            <ListItemIcon>
                                                <LockOpenOutlinedIcon fontSize="small" className="text-gray-600" />
                                            </ListItemIcon>
                                            <span className="text-gray-700">Sign Up</span>
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`md:hidden ${showMobileMenu ? "block" : "hidden"}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
                    {[
                        { name: "Products", href: "/products" },
                        { name: "News", href: "/news" },
                        { name: "About", href: "/about" },
                        { name: "Contact Us", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setShowMobileMenu(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                router.pathname === item.href
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
