import { useContext, useState } from "react";
import { AlertContext, UserContext } from "../pages/_app";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ax } from "../utils/axios";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";

export default function MainMenu() {
  const { user, setUser } = useContext(UserContext);
  const { setError, setMessage } = useContext(AlertContext);

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
    <nav className="flex glass fixed top-3 left-8 right-8 p-4 h-12 items-center	 ">
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

      <Link href="/">
        <MenuItem sx={{ borderRadius: "2rem" }}>home</MenuItem>
      </Link>

      <Link href="/blog">
        <MenuItem sx={{ borderRadius: "2rem" }}>blog</MenuItem>
      </Link>

      <Link href="/store">
        <MenuItem sx={{ borderRadius: "2rem" }}>store</MenuItem>
      </Link>
    </nav>
  );
}
