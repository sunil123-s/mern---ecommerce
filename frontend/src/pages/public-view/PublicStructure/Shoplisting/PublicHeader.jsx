
import { HousePlug, Menu } from "lucide-react";
import { useState } from "react";
import React from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import HeaderRight from "./HeaderRight";

const PublicHeader = () => {
 const [menuOpen, setMenuOpen] = useState(false)

 const handelCloseMenu = () =>{ setMenuOpen(false)}
 
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background flex items-center justify-between px-4 md:px-6 ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold ">E-commerce</span>
        </Link>
      </div>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggel header menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs">
          <MenuItem menuItmeClose={handelCloseMenu}/>
          <HeaderRight />
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block">
        <MenuItem />
      </div>
      <div className="hidden lg:block">
        <HeaderRight />
      </div>
    </header>
  );
};

export default PublicHeader;
