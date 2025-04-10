"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import avatar from "../../public/images/avatar.png";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import AuthModal from "./Auth/AuthModal";
import { useRouter } from "next/navigation";

type HeaderProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  activeItem?: number;
  setRoute?: (route: string) => void;
  route?: string;
};

const Header: FC<HeaderProps> = props => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(
    props.open !== undefined ? props.open : false
  );
  const [route, setRoute] = useState(props.route || "Login");
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      // Force reload if signOut fails
      window.location.href = "/";
    }
  };

  const navigateToDashboard = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      toast.error("Please login first");
      handleOpenAuth("Login");
    }
  };

  const navigateToProfile = () => {
    if (session) {
      router.push("/profile");
    } else {
      toast.error("Please login first");
      handleOpenAuth("Login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open]);

  useEffect(() => {
    if (props.route !== undefined) {
      setRoute(props.route);
    }
  }, [props.route]);

  const handleOpenAuth = (authRoute: string) => {
    setRoute(authRoute);
    if (props.setRoute) {
      props.setRoute(authRoute);
    }
    setOpen(true);
    if (props.setOpen) {
      props.setOpen(true);
    }
  };

  return (
    <>
      <div
        className={`w-full h-[70px] z-[9999] bg-background/95 backdrop-blur-lg shadow-md border-b border-primary/10 fixed ${
          active ? "top-0 left-0" : "top-0 left-0"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="LearnWise Logo"
                width={80}
                height={24}
                className="object-contain dark:brightness-200 dark:contrast-200"
              />
              <span className="ml-2 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                LearnWise
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-primary/10"
                  onClick={navigateToDashboard}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full hover:bg-primary/10"
                    >
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage
                          src={session.user?.image || avatar.src}
                          alt={session.user?.name || "User"}
                        />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {(session.user?.name || "U").charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 mt-2 border-primary/20 bg-card/95 backdrop-blur-sm"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem
                      className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
                      onClick={navigateToProfile}
                    >
                      <User className="mr-2 h-4 w-4 text-primary" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4 text-primary" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => handleOpenAuth("Login")}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleOpenAuth("Sign-Up")}
                  className="bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add spacing for fixed header */}
      <div className="h-[70px]"></div>

      <AuthModal
        open={open}
        setOpen={value => {
          setOpen(value);
          if (props.setOpen) {
            props.setOpen(value);
          }
        }}
        activeRoute={route}
        setActiveRoute={value => {
          setRoute(value);
          if (props.setRoute) {
            props.setRoute(value);
          }
        }}
      />
    </>
  );
};

export default Header;
