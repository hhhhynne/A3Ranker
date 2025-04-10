"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { useAuth } from "@/providers/authProvider";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      toast.success("Successfully signed in!");
      router.push("/");
    } catch (error: unknown) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="mb-4 text-2xl font-extrabold">Sign In</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        className="text-xl w-auto rounded-md border mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        className="text-xl w-auto rounded-md border mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="font-bold p-4 rounded-md bg-primary"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <a href="/createUser" className="text-primary hover:underline">
          Create one
        </a>
      </p>
    </div>
  );
};

export default SignIn;
