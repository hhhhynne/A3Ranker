"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { useAuth } from "@/providers/authProvider";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";

const CreateUser = () => {
  const [name, setName] = useState("");
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
    if (!name || !email || !password) {
      toast.error("Please enter name, email, and password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create user document in Firestore with initial ranking and stats
      await setDoc(doc(db, "players", user.uid), {
        name: name,
        ranking: 1200, // Base ELO ranking
        wins: 0,
        losses: 0,
        email: email,
      });

      console.log("User created:", user);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (error: unknown) {
      console.error("Error creating user:", error);
      toast.error("Error creating account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="mb-4 text-2xl font-extrabold">Create User</h1>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        className="text-xl w-auto rounded-md border mb-4"
        onChange={(e) => setName(e.target.value)}
      />
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
        {isLoading ? "Creating Account..." : "Create User"}
      </Button>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/sign-in" className="text-primary hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default CreateUser;
