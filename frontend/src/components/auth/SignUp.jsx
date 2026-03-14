import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

const SignUp = () => {
  return (
    <div>
      <Navbar />
      <div className="flex  justify-center items-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-full max-w-md rounded-md border-2 border-zinc-400 p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 ">Sign Up</h1>
          <div className="my-2">
            <Label>Enter Name</Label>
            <Input  className="my-2 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400"
             type="text" placeholder="Yashaswi" />
          </div>
          <div className="my-2">
            <Label>Enter Email</Label>
            <Input  className="my-2 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400" type="email" placeholder="yash@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Enter Phone No.</Label>
            <Input  className="my-2 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400" type="number" placeholder="9189789879" />
          </div>
          <div className="my-2">
            <Label>Enter Password</Label>
            <Input  className="my-2 border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400" type="password" placeholder="#csdf4234$%" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup  className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                 <Input
               type="radio"
               name="role"
               value="student"
               className="cursor-pointer"
               />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
               type="radio"
               name="role"
               value="student"
               className="cursor-pointer"
               />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
              />

            </div>
          </div>
          <Button type="submit" className="w-full my-4 bg-zinc-900 text-white cursor-pointer" variant="outline" >SignUp</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
