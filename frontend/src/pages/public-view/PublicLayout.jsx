import React from "react";
import PublicHeader from "./PublicStructure/Shoplisting/PublicHeader";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <PublicHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
