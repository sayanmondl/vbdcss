"use client";

import dynamic from "next/dynamic";

const ExportPDF = dynamic(() => import("./ExportPDF"), {
  ssr: false,
});

export default ExportPDF;
