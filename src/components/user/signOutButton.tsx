"use client"; 

import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; 
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignOutButton = () => {
  const router = useRouter(); 

  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      router.push("/"); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      type="reset"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
