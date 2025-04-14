import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-dark text-white py-10 mt-20 font-barlow">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-medium mb-4">
            Department of Computer and System Sciences
          </h3>
          <p className="text-sm text-gray-300">
            Promoting innovation and excellence in computing, systems, and
            research.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/events" className="hover:text-white">
                Events
              </a>
            </li>
            <li>
              <a href="/announcements" className="hover:text-white">
                Announcements
              </a>
            </li>
            <li>
              <a href="/student/resources" className="hover:text-white">
                Resources
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Academics</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/syllabus_bsc.pdf" className="hover:text-white">
                  Syllabus B.Sc.
                </a>
              </li>
              <li>
                <a href="/syllabus_msc.pdf" className="hover:text-white">
                  Syllabus M.Sc.
                </a>
              </li>
              <li>
                <a href="/syllabus_phd.pdf" className="hover:text-white">
                  Syllabus PHD
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Sports</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/sports" className="hover:text-white">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="/sports/teams" className="hover:text-white">
                  Teams
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4">Contact Us</h3>
          <p className="text-sm text-gray-300">
            Siksha-Bhavan, Visva-Bharati, Santiniketan
            <br />
            Email:{" "}
            <a
              href="mailto:office.css@visva-bharati.ac.in"
              className="hover:text-white"
            >
              office.css@visva-bharati.ac.in
            </a>
            <br />
            Phone: +91-12345-67890
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} Department of Computer and System
        Sciences. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
