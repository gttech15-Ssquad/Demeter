"use client";
// import { usePathname } from "next/navigation"
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="m-0 relative min-h-[95vh] ">{children}</main>;
}
