"use client";
import React, { ReactNode } from "react";
import Header from "./Header";

interface Layout {
  children: ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
  return (
    <>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
