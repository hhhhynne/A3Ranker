"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateMatchForm from "./createMatchForm";


export function MatchDialog() {

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="bg-primary" variant="outline" >New Match</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Register match</DialogTitle>
          <DialogDescription>
            Register the match here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateMatchForm />
      </DialogContent>
    </Dialog>
  );
}
