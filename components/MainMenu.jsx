import { useContext, useState } from "react";
import {AlertContext, CartContext, UserContext} from "../pages/_app";
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
import logo from "./logo.png";
import Image from "next/image";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import styles from "./MainMenu.module.scss";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useRouter } from "next/router";
export default function MainMenu() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { setError, setMessage } = useContext(AlertContext);
  const [showHam, setShowHam] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    ax.post("/users/logout")
      .then((res) => {
        setMessage(res.data.message);
        setUser("");
      })
      .catch((e) => {
        setError(e.response?.data?.message || e.message);
        localStorage.removeItem("authenticated");
      });
    setAnchorEl(null);
  };

  return (
    <nav className="flex glass fixed top-3 left-8 right-8 p-0 h-12 items-center justify-between ">
      <div className={styles.ham} onClick={() => setShowHam(!showHam)}>
        {showHam ? <ListOutlinedIcon /> : <MenuOutlinedIcon />}
      </div>
      <div className={showHam ? styles.menu2 : styles.menu}>
        {user ? (
          <>
            <MenuItem sx={{ borderRadius: "2rem" }} onClick={handleClick}>
              {user?.fullName}
            </MenuItem>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {user.roles.includes("admin") ? (
                <Link onClick={handleClose} href="/panel">
                  <MenuItem onClick={handleClose} sx={{ borderRadius: "2rem" }}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                </Link>
              ) : (
                ""
              )}

              <Link onClick={handleClose} href="/profile">
                <MenuItem onClick={handleClose} sx={{ borderRadius: "2rem" }}>
                  <Avatar
                    sx={{ width: 24, height: 24, marginRight: ".5rem" }}
                    fontSize="small"
                  />
                  Profile
                </MenuItem>
              </Link>

              <MenuItem onClick={handleLogout} sx={{ borderRadius: "2rem" }}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link href="/login">
              <MenuItem sx={{ borderRadius: "2rem" }}>login</MenuItem>
            </Link>
          </>
        )}

        <Link href="/" onClick={() => setShowHam(false)}>
          <MenuItem sx={
              router.pathname === "/"
                  ? { backgroundColor: "#00a2ea", borderRadius: "2rem" }
                  : {borderRadius: "2rem"}
          }>home</MenuItem>
        </Link>

        <Link href="/blog" onClick={() => setShowHam(false)}>
          <MenuItem sx={
              router.pathname === "/blog"
                  ? { backgroundColor: "#00a2ea", borderRadius: "2rem" }
                  : {borderRadius: "2rem"}
          }>blog</MenuItem>
        </Link>

        <Link href="/store" onClick={() => setShowHam(false)}>
          <MenuItem
            sx={
              router.pathname === "/store"
                ? { backgroundColor: "#00a2ea", borderRadius: "2rem" }
                : {borderRadius: "2rem"}
            }
          >
            store
          </MenuItem>
        </Link>
        <Link href="/about" onClick={() => setShowHam(false)}>
          <MenuItem sx={
              router.pathname === "/about"
                  ? { backgroundColor: "#00a2ea", borderRadius: "2rem" }
                  : {borderRadius: "2rem"}
          }>about</MenuItem>
        </Link>
      </div>

      <div className="flex justify-center flex-1">
        <p className="mr-2 text-logo">CoolGards</p>
        <Image src={logo} alt="coolgards logo" width={50} height={50} />
      </div>

      <div className="flex justify-end mr-8 flex-1">
          <Link href="/cart">
              <Badge badgeContent={cart?.length} color="primary">
                  <ShoppingCartOutlinedIcon color="action" />
              </Badge>
          </Link>

      </div>
    </nav>
  );
}
