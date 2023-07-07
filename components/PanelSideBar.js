import styles from "./PanelSideBar.module.scss";
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
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../pages/_app";

export default function PanelSideBar() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const color = "#230061FF";

  return (
    <nav className={styles.menu}>
      <div className={styles.adminName}>
        <p className="text-center text-lg font-light">{user?.fullName} ({user?.roles})</p>
      </div>
      <Link className={styles.link} 
        style={router.pathname === "/panel" ? { backgroundColor: color } : {}}
        href="/panel"
      >
        <DashboardOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Home
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/users" ? { backgroundColor: color } : {}
        }
        href="/panel/users"
      >
        <PeopleAltOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Users
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/news" ? { backgroundColor: color } : {}
        }
        href="/panel/news"
      >
        <AssignmentOutlinedIcon sx={{ marginRight: ".5rem" }} />
        News
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/media" ? { backgroundColor: color } : {}
        }
        href="/panel/media"
      >
        <MonochromePhotosOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Media
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/products"
            ? { backgroundColor: color }
            : {}
        }
        href="/panel/products"
      >
        <ColorLensOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Products
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/messages"
            ? { backgroundColor: color }
            : {}
        }
        href="/panel/messages"
      >
        <MailOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Messages
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/shipments"
            ? { backgroundColor: color }
            : {}
        }
        href="/panel/shipments"
      >
        <LocalShippingOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Shipments
      </Link>
      <Link className={styles.link} 
        style={
          router.pathname === "/panel/orders" ? { backgroundColor: color } : {}
        }
        href="/panel/orders"
      >
        <LocalMallOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Orders
      </Link>
      <Link className={styles.link}  href="/">
        <ReplyOutlinedIcon sx={{ marginRight: ".5rem" }} />
        Back
      </Link>
    </nav>
  );
}
