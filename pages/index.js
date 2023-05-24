import styles from "./home.module.scss";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import Image from "next/image";

export default function Home() {
  const images = [
    { original: "/1.png" },
    { original: "/2.png" },
    { original: "/3.png" },
    { original: "/4.png" },
    { original: "/5.png" },
    { original: "/6.png" },
  ];
  return (
    <main>
      {/*first hero start*/}
      <div className={styles.hero}>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="mt-5 max-w-xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
              FACILITATE YOUR RECOVERY WITH <span className="text-logo">COOLGARDS</span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Coolgards is designed to help you in your recovery by the
              intermittent flow of cold water in a suitable envelope.
            </p>
          </div>

          <div className="text-center">
            <Link
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                href="/store"
            >
              Visit Our Products
              <svg
                  className="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
              >
                <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      {/*first hero end*/}

      {/*slider start*/}
      <div className={styles.sliderContainer}>
        <div className={styles.details}>
          <h2 className="m-8">
            Pulse Cold Compression Therapy System Features:
          </h2>
          <ul>
            <li>
              Intermittent cold compression accelerates the healing process
            </li>
            <li>Cold Compression Therapy System reduces pain and swelling</li>

            <li>
              Preset flexible treatment options to achieve the best care for you
            </li>
            <li>Portable design, to use the device anywhere and anytime</li>
            <li>Perfect for athletic training rooms, clinics and home use</li>
            <li>Gives you a quiet environment during the treatment</li>
            <li>Covers ankle, shoulder, leg, back, elbow, hand and knee</li>
          </ul>
        </div>

        <div className={styles.slider}>
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets
            showNav={false}
            showThumbnails={false}
            autoPlay
            slideInterval={4000}
            items={images}
          />
        </div>
      </div>

      {/*slider end*/}

      {/*second hero start*/}
      <div className="bg-slate-900">
        <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                How does it work?
              </h1>
            </div>

            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-400">
                The design of the pulse cold compression therapy system the
                advantages of intermittent compression and ice compress therapy
                to achieve the good effect of enhancing body function recovery
                function, promoting blood circulation, and helping to stimulate
                tissue for better and better repair.
              </p>
            </div>

            <div className="text-center">
              <Link
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                href="/blog"
              >
                Visit our Blog to learn more
                <svg
                  className="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*second hero end*/}

      {/*feature start*/}
      <div className={styles.featureSection}>
        <div className={styles.featurePictures}>
          <Image
            width={120}
            height={120}
            className="rounded-xl"
            src="/11.jpg"
            alt="Image Description"
          />
          <Image
            width={180}
            height={180}
            className="rounded-xl"
            src="/12.jpg"
            alt="Image Description"
          />
          <Image
            width={250}
            height={250}
            className="rounded-xl"
            src="/13.jpg"
            alt="Image Description"
          />
        </div>

        <div className={styles.featureDetails}>
          <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                  Collaborative tools to design user experience
                </h2>
                <p className="text-gray-500">
                  Intermittent compression has been proven to be more effective than static compression because it moves the blood more effectively, helping push the swelling out of the system. EVERCRYO is designed to combine the benefits of intermittent compression and cold therapy to enhance lymphatic function, encourage blood flow, and help stimulate tissue repair faster and better.
                </p>
              </div>

              <ul role="list" className="space-y-2 sm:space-y-4">
                <li className="flex space-x-3">
                  <svg
                      className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                    />
                    <path
                        d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                        fill="currentColor"
                    />
                  </svg>

                  <span className="text-sm sm:text-base text-gray-500">
                  Intermittent compression and cold therapy
                </span>
                </li>

                <li className="flex space-x-3">
                  <svg
                      className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                    />
                    <path
                        d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                        fill="currentColor"
                    />
                  </svg>

                  <span className="text-sm sm:text-base text-gray-500">
                  Simplicity in design & ease to operate
                </span>
                </li>

                <li className="flex space-x-3">
                  <svg
                      className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                    />
                    <path
                        d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                        fill="currentColor"
                    />
                  </svg>

                  <span className="text-sm sm:text-base text-gray-500">
                  Preset 9 menus of pressure and time
                </span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      {/*features end*/}
    </main>
  );
}
