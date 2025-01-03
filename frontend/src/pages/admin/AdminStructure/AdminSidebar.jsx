import React from 'react'
import { ShieldCheck } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import AdminMenuSidbar from "../admin-View/AdminMenuSidbar";
import {Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";


const AdminSidebar = ({open, setopen}) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mb-4 items-center">
                <ShieldCheck />
                <h1 className="text-xl font-bold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <AdminMenuSidbar setopen={setopen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/products")}
        >
          <ShieldCheck />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <AdminMenuSidbar />
      </aside>
    </>
  );
}

export default AdminSidebar
