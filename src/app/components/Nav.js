"use client"
import { ChevronDown, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { SessionProvider, useSession } from "next-auth/react";
import { useSelector } from "react-redux";

function Nav() {
    gsap.registerPlugin();
    const [cartProductAmount, setcartProductAmount] = useState(0)
    const {totalProduct,totalPrice} = useSelector((state)=>state.cart)
    useEffect(()=>{
        console.log("hello nava");
    },[])
    useEffect(() => {
        
        if (totalProduct) {
            setcartProductAmount(totalProduct)
        }
    }, [totalProduct])

    const { data: session, status } = useSession();
    const [first, setfirst] = useState(false)
    const [displayMenu, setdisplayMenu] = useState(false)
    const menuBt = useRef()
    const profileButtonArrow = useRef()
    const profileButton = useRef()
    const path = usePathname()
    const profileRender = () => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            if (status === "authenticated") {
                setIsLoggedIn(true);
                console.log(session);
            } else {
                setIsLoggedIn(false);
            }
        }, [status]);

        if (status === "loading") {
            return <p>Loading...</p>; // Show a loading state while session is being fetched
        }

        return (
            <div
                className={`pr-3 pl-2 gap-3 sm:gap-2 border-2 border-zinc-300 py-3 w-30 rounded-md bg-white flex-col flex`}
            >
                {!isLoggedIn ? (
                    <>
                        <Link onClick={onClickProfileLinkButton} href={"/log-in"}>Log In</Link>
                        <Link onClick={onClickProfileLinkButton} href={"/sign-up"}>Sign up</Link>
                    </>
                ) : (
                    <>
                        <Link onClick={onClickProfileLinkButton} href={"/profile"}>Profile</Link>
                        <Link onClick={onClickProfileLinkButton} href={"/api/auth/signout"}>Sign Out</Link>
                        {
                            session.user.role === "admin" ? <Link onClick={onClickProfileLinkButton} href={"/admin/dashboard"}>Manage</Link> : ""
                        }
                    </>
                )}
            </div>
        );
    }
    const onClickProfileLinkButton = () => {
        gsap.to(profileButton.current, {
            display: "none",
            duration: .2
        })
        gsap.to(profileButtonArrow.current, {
            rotate: 0,

            duration: .2
        })
        setfirst(false)
    }
    const onClickProfileButton = () => {
        if (first) {
            gsap.to(profileButton.current, {
                display: "none",
                duration: .2
            })
            gsap.to(profileButtonArrow.current, {
                rotate: 0,

                duration: .2
            })
            setfirst(false)
        }
        else {
            gsap.to(profileButton.current, {
                display: "flex",
                duration: .2
            })
            gsap.to(profileButtonArrow.current, {
                rotate: 180,
                duration: .2
            })
            setfirst(true)
        }
    }
    const menu = useRef()
    const onClickMenuHandler = () => {
        console.log(menu.current);
        if (displayMenu) {
            console.log("close");
            gsap.to(menu.current, {
                width: "0%",
                duration: .2
            })
            setdisplayMenu(false)
        }
        else {
            console.log("open");
            gsap.to(menu.current, {
                width: "70%",
                duration: .5

            })
            setdisplayMenu(true)
        }
    }
    return (
        <>
            
                <div className="w-full z-40 sticky bg-white top-0 text-lg flex select-none border-b border-zinc-300 justify-between items-center px-6 py-5">
                    <div>
                        <h1 className="text-3xl text-zinc-800 font-bold">
                            New <span className="text-red-500">Zone</span>
                        </h1>
                    </div>
                    <ul className="sm:flex hidden font-medium gap-2">
                        <li><button className=" active:scale-75"><Link href={"/"} className={path === "/" ? `text-red-500 ` : `` + `hover:text-red-500 active:scale-50`}>Home</Link></button></li>
                        <li><button className="active:scale-75"><Link href={"/products"} className={path === "/products" ? `text-red-500` : `` + `hover:text-red-500`}>Products</Link></button></li>
                        <li><button className="active:scale-75"><Link href={"/about-us"} className={path === "/about-us" ? `text-red-500` : `` + `hover:text-red-500 active:scale-75`}>About Us</Link></button></li>
                    </ul>
                    <div className="flex sm:gap-1 gap-2 relative">
                        <div>
                            <div className="flex items-center" onClick={onClickProfileButton} >
                                <User size={28} strokeWidth={1.5} />
                                <ChevronDown size={22} strokeWidth={1.5} ref={profileButtonArrow} />
                            </div>
                            <div className=" absolute hidden top-14 font-medium -left-5" ref={profileButton}>
                                {profileRender()}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute w-5 h-5 flex justify-center items-center rounded-full -top-1/4 right-0 bg-red-600">
                                <h1 className="flex text-white text-sm justify-center items-center">{cartProductAmount}</h1>
                            </div>
                            <ShoppingCart size={28} strokeWidth={1.5} />
                        </div>
                        <div className="sm:hidden ml-2 flex" ref={menuBt} onClick={onClickMenuHandler}>
                            <Menu size={28} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
                <div className="fixed h-full  overflow-hidden right-0 border-l-2 border-t-2 border-zinc-200 bg-white" style={{ width: "0%" }} ref={menu}>
                    <ul className="flex text-xl w-[70vw] flex-col justify-center items-center mt-5 font-medium gap-2">
                        <li><button className=" active:scale-75"><Link href={"/"} className={path === "/" ? `text-red-500 ` : `` + `hover:text-red-500 active:scale-50`}>Home</Link></button></li>
                        <li><button className="active:scale-75"><Link href={"/products"} className={path === "/products" ? `text-red-500` : `` + `hover:text-red-500`}>Products</Link></button></li>
                        <li><button className="active:scale-75"><Link href={"/about-us"} className={path === "/about-us" ? `text-red-500` : `` + `hover:text-red-500 active:scale-75`}>About Us</Link></button></li>
                    </ul>
                </div>
        
        </>
    );
}

export default Nav;
