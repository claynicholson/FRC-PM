"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import PopupPortal from "./PopupPortal";
import CreateCardPopup from "./CreateCardPopup";

const dontNeedLogin = true; 

const SideNav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='side_nav'>
      {showPopup && (
      <CreateCardPopup
      closePopup={togglePopup}
      />
      
      )}
     
      <Link href='/' className='flex gap-2 flex-center p-4'>
        <Image
          src='/assets/images/robohawks_logo.svg'
          alt='logo'
          width={40}
          height={40}
          className='object-contain'
        />
        <p className='logo_text'>Robohawks Tasks</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user || dontNeedLogin ? (
          <div className='w-full flex flex-col'>

                  {session?.user ? (
                    <>
                        <div className="flex flex-row m-5">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
                <span className="ml-4 font-satoshi font-bold flex justify-center items-center text-center text-2xl">{session?.user.name}</span>
            </div>
                    </>
                  ) : null}

          
             

            <Link href='/' className="button">
              <Image
                src="/assets/icons/meeting-plans.svg"
                width={24}
                height={20}
                className='rounded-full'
                alt='all-tasks'/>
                <span className="ml-4 font-bold flex justify-center items-center text-center text-1xl">To-Do</span>
            </Link> 

            <Link href='/mechanical' className="button">
              <Image
                src="/assets/icons/meeting-plans.svg"
                width={24}
                height={20}
                className='rounded-full'
                alt='mechanical'/>
                <span className="ml-4 font-bold flex justify-center items-center text-center text-1xl">Mechanical</span>
            </Link>

           
            <Link href='/outreach' className="button">
              <Image
                src="/assets/icons/cad-manufacturing.svg"
                width={24}
                height={20}
                className='rounded-full'
                alt='outreach'/>
                <span className="ml-4 font-bold flex justify-center items-center text-center text-1xl">Outreach</span>
            </Link>


            <Link href='/programming' className="button">
              <Image
                src="/assets/icons/code-new.svg"
                width={24}
                height={20}
                className='rounded-full'
                alt='programming'/>
                <span className="ml-4 font-bold flex justify-center items-center text-center text-1xl">Programming</span>
            </Link>

           
            <Link href='/business' className="button">
              <Image
                src="/assets/icons/buisness-outreach.svg"
                width={24}
                height={20}
                className='rounded-full'
                alt='business'/>
                <span className="ml-4 font-bold flex justify-center items-center text-center text-1xl">Business</span>
            </Link>

            <Link href='/done' className="button">
              <Image
                src="/assets/icons/buisness-outreach.svg"
                width={24}
                height={20}
                className='rounded-full'
                alt='business'/>
                <span className="ml-4 font-bold flex justify-center items-center text-center text-1xl">Finished Tasks</span>
            </Link>

            {session?.user ? (
                <>
                  <button onClick={() => togglePopup()} className='black_btn mt-5 ml-5 mr-5'>
                    Create Post
                  </button>

                  <button type='button' onClick={signOut} className='outline_btn mt-5 ml-5 mr-5'>
                    Sign Out
                  </button>
                </>
              ) : null}

           

           
          </div>
        ) : (
          <>  
            {providers &&
              Object.values(providers).map((provider) => (
                <PopupPortal>
                      <Image
                        src='/assets/images/robohawks_logo.svg'
                        alt='logo'
                        width={200}
                        height={200}
                        className='object-contain'
                      />
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='sign_in'>
                    Sign in
                  </button>
                </PopupPortal>
                
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        
        {session?.user || dontNeedLogin ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  className='dropdown_link'
                  onClick={() => {setToggleDropdown(false)
                    togglePopup()
                  }}
                >
                  Create Prompt
                </button>
                
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>)}
      </div>
    </nav>
  );
};

export default SideNav;
