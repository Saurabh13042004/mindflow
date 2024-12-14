import React, { useState } from "react";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-white pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
                  Free Online Mind Mapping with WiseMapping
                </h1>
                <p className="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6">
                  Create, share, collaborate, and view your mind maps with
                  WiseMapping! Perfect for note-taking, teamwork, and classrooms.
                </p>
                <ul className="flex flex-wrap items-center">
                  <li>
                    <a
                      href="/canvas"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark lg:px-7"
                    >
                      Try now!
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary dark:text-white"
                    >
                      <span className="mr-2">Why WiseMapping?</span>
                    </a>
                  </li>
                </ul>
                {/* <div className="clients pt-16">
                  <h6 className="mb-6 flex items-center text-xs font-normal text-body-color dark:text-dark-6">
                    Some Of Our Clients
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                  <div className="flex items-center space-x-4">
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/ayroui.svg"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg"
                    />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/010/845/216/original/people-mind-map-concept-illustration-a-man-and-his-thoughts-in-his-head-imagination-in-the-form-of-connections-brain-vector.jpg"
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      {/* More circles */}
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  
    </>
  );
};

export default Hero;



// Single Image Component for Client Logos
const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

// Navbar Component with links
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img
                src="https://www.wisemapping.com/_next/static/media/logo-small.3e04aac9.svg"
                alt="logo"
                className="w-full dark:hidden"
              />
              <img
                src="https://www.wisemapping.com/_next/static/media/logo-small.3e04aac9.svgg"
                alt="logo"
                className="w-full hidden dark:block"
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={`${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                }`}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/#">Open Source</ListItem>
                  <ListItem NavLink="/#">F.A.Q</ListItem>
                  <ListItem NavLink="/#">About Us</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <a
                href="/login"
                className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
              >
                Sign In
              </a>

              <a
                href="/register"
                className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ListItem Component for Navbar Links
const ListItem = ({ children, NavLink }) => {
  return (
    <li>
      <a
        href={NavLink}
        className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
      >
        {children}
      </a>
    </li>
  );
};
