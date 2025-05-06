import Image from "next/image";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const NavbarDash = () => {
  let loggedIn = true;

  if (!loggedIn) {
    redirect("/login");
  } else {
    return (
      <nav>
        <div className="bg-blue-fade h-20 flex items-center px-5 md:px-20">
          <Link href="/" className="items-center gap-4">
            <Image src="/logo2.svg" alt="vblogo" width={70} height={50} />
          </Link>
          <div className="flex-1"></div>
          <Link href="/">
            <div>
              <button className="button-white flex items-center gap-4">
                <ChevronLeft className=" size-4 sm:size-[18px]" />
                <p className="mb-0.5 text-sm sm:text-base">Home</p>
              </button>
            </div>
          </Link>
        </div>
      </nav>
    );
  }
};

export default NavbarDash;
