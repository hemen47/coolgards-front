import Image from "next/image";
import logo from "./logo.png";
import Link from "next/link";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

export default function Footer() {
  return (
    <footer className="glass rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">

          <div className="flex justify-start flex-1">
            <Image src={logo} alt="coolgards logo" width={50} height={50} />
            <p className="mr-2 text-logo">CoolGards</p>
          </div>

          <div>
            <p className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">feel free to follow us on:</p>
            <Link href="#" className="mr-4 hover:underline md:mr-6 ">
              <FacebookOutlinedIcon/>
            </Link>
          </div>


          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="mr-4 hover:underline md:mr-6">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/store" className="mr-4 hover:underline md:mr-6 ">
                Store
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>


        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            CoolGards™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
