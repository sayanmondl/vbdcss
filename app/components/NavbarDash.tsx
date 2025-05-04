import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { redirect } from "next/navigation";
import { ArrowLeftFromLine } from "lucide-react";

const NavbarDash = () => {
  let loggedIn = true;

  if (!loggedIn) {
    redirect("/login");
  } else {
    return (
      <nav>
        <div className="bg-blue-fade h-20 flex items-center px-5 md:px-20">
          <Link
            href="https://visvabharati.ac.in/index.html"
            className="flex items-center gap-4"
          >
            <Image src="/vblogo.svg" alt="vblogo" width={40} height={40} />
            <h1 className="font-teko text-[22px] text-blue-dark">
              Visva-Bharati
            </h1>
          </Link>
          <div className="flex-1"></div>
          <Link href="/">
            <div>
              <button className="button-white flex items-center gap-4">
                <ArrowLeftFromLine className=" size-4 sm:size-[18px]" />
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
