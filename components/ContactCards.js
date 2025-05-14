'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ContactCards = ({showContactForm = false}) => {
  const router = useRouter();

  const cardData = [
    {
      bgImageSrc: '/contact-us-card1.webp',
      iconSrc: '/contact-us-mail.svg',
      title: 'Email Us',
      description: 'info@coolgards.com',
      action: () => {
        window.location.href = 'mailto:info@coolgards.com';
      },
    },
    {
      bgImageSrc: '/contact-us-card2.webp',
      iconSrc: '/contact-us-office.svg',
      title: 'Visit Our Office',
      description: 'Skrivarevägen 46, 226 27 Lund, Sweden',
    },
    {
      bgImageSrc: '/contact-us-card2.webp',
      iconSrc: '/contact-us-chat.svg',
      title: 'Call Us',
      description: '+1-778-776-2417',
      action: () => {
        window.location.href = 'tel:+17787762417';
      },
    },
    {
      bgImageSrc: '/contact-us-card3.webp',
      iconSrc: '/contact-us-form.svg',
      title: 'Contact Form',
      description: 'Get in touch with our team',
      action: () => {
        router.push('/contact');
      },
    },
  ];

  // Filter out the last item (Contact Form) if showContactForm is true
  const displayedCards = showContactForm ? cardData.slice(0, -1) : cardData;

  return (
      <section className="my-12">
        <div className="mb-12 text-center ">
          <h2 className="text-3xl font-bold text-mainBlue mb-2">Have Any Questions?</h2>
          <p className="text-lg text-gray-600">We&#39;re here to help. Reach out to us through any of these channels.</p>
        </div>

        <div className="flex flex-wrap justify-around">
          {displayedCards.map((card, index) => (
              <div
                  key={index}
                  className="relative m-4 w-[300px] cursor-pointer"
                  onClick={card.action}
              >
                <Image
                    src={card.bgImageSrc}
                    alt="card background"
                    width={328}
                    height={278}
                    className="rounded-lg"
                />
                <div className="absolute left-1/2 top-[50px] flex -translate-x-1/2 flex-col items-center justify-center">
                  <Image
                      src={card.iconSrc}
                      alt="icon"
                      width={69}
                      height={69}
                      className="mb-6"
                  />
                  <h3 className="m-0 line-clamp-1 whitespace-nowrap text-center text-[22px] font-extrabold text-mainBlue">
                    {card.title}
                  </h3>
                  <p className="mt-3 whitespace-nowrap text-center text-[15px] text-mainBlue">
                    {card.description}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
};

export default ContactCards;
