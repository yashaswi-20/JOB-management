import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>{" "}
          </h1>
        </div>
        <div className="flex item-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          <Popover >
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
                <div className="flex gap-2 space-y-2 align-center">
                    
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4>Yashaswi MernStack</h4>
                </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
