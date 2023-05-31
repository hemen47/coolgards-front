import Image from "next/image";
import logo from "./logo.png";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="glass rounded-lg shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex-1 flex justify-start items-center">
            <Image src={logo} alt="coolgards logo" width={50} height={50} />
            <p className="mr-2 text-logo">CoolGards</p>
          </div>

          <div className="justify-center flex-1  flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <Link
              href="#"
              className="mt-4 ml-2 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 "
            >
              <InstagramIcon />
            </Link>
            <Link
              href="#"
              className="mt-4 ml-2 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 "
            >
              <YouTubeIcon />
            </Link>
            <Link
              href="#"
              className="mt-4 ml-2 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 "
            >
              <FacebookIcon />
            </Link>
            <Link
              href="#"
              className="mt-4 ml-2 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 "
            >
              <TwitterIcon />
            </Link>
            <Link
              href="#"
              className="mt-4 ml-2 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 "
            >
              <PinterestIcon />
            </Link>
            <Link
              href="#"
              className="mt-4 ml-2 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 "
            >
              <LinkedInIcon />
            </Link>
          </div>

          <ul className="flex-1 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/profile" className="mr-4 hover:underline md:mr-6 ">
                Profile
              </Link>
            </li>

            <li>
              <Link href="/news" className="mr-4 hover:underline md:mr-6">
                News
              </Link>
            </li>
            <li>
              <Link href="/products" className="mr-4 hover:underline md:mr-6 ">
                Store
              </Link>
            </li>
            <li>
              <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="mr-4 hover:underline md:mr-6 ">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            CoolGards™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
