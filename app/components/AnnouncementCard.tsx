import Link from "next/link";
import React from "react";

const announcementData = {
  date: new Date("2024-10-20"),
  title: "Seminar about Quantum Computing",
  info: "jbusefhiefview wgfwvflh giwviweg foiweg fiwg fiuwg fiuwefipuweg fpiuwg fiuwgf iuwgfp iuwg fpiuw4gfioug ndohef wfw 4r wfh 6 h hrwrw3r wr r3wrwrwr w3rw3rt4tw4 w3r w3rw3 rw3tw3ttw r3 rw  3 rw3rw3rw3rw3rwd   44e t 4e 4t t t  ttytjtuj uk  rth   tg re grthtrhrt fwfgregerg ger e g erg  erg e g e g egergeegerg",
};

const AnnouncementCard = () => {
  return (
    <div>
      <Link href="">
        <div className="bg-blue-background px-6 py-3 rounded-lg group hover:bg-blue-middark duration-100">
          <h1 className="font-barlow text-2xl font-medium text-blue-dark group-hover:text-white">
            [ {announcementData.date.toLocaleDateString()} ] -{" "}
            {announcementData.title}
          </h1>
          <p className="mt-2 font-barlow text-blue-dark group-hover:text-white">
            {announcementData.info}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AnnouncementCard;
