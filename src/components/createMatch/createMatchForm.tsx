"use client";
import useCustomForm from "../form/useCustomForm";
import { Match, matchSchema } from "@/schemas/matchSchema";
import GenericForm from "../form/genericForm";
import { FormDatePicker } from "../form/formComponents/formDatePicker";
import { PickPlayer } from "./pickPlayer";
import { useWatch } from "react-hook-form";
import { SelectWinner } from "./selectWinner";
import { Score } from "./score";
import { Label } from "../ui/label";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateEloRankings } from "@/functions/ELOranking";
import { updatePlayerRecord } from "@/functions/W-L";




const CreateMatchForm = () => {
  const form = useCustomForm({
    schema: matchSchema,
    reValidateMode: "onChange",
    defaultValues: {
      date: new Date(),
    },
  });
  const { register, setValue, control } = form;
  const selectedPlayer1 = useWatch({ control, name: "player1" });
  const selectedPlayer2 = useWatch({ control, name: "player2" });
  const winner = useWatch({ control, name: "winner" });
  const router = useRouter();

  const handleSelection1 = (player: string) => {
    console.log(player);
    setValue("player1", player);
  };
  const handleSelection2 = (player: string) => {
    console.log(player);
    setValue("player2", player);
  };

  const handleWinner = (player: string) => {
    console.log(player);
    setValue("winner", player);
  };

  const onSubmit = async (data: Match) => {
    try {
      const matchData = {
        ...data,
        date: data.date.toISOString().split("T")[0],
        score: `${data.score.slice(0, 2)}-${data.score.slice(2, 4)}`
      };

      await addDoc(collection(db, "matches"), matchData);

      updateEloRankings(data.player1, data.player2, data.winner);
      updatePlayerRecord(data.player1, data.player2, data.winner);

      toast.success("Match added successfully");
      router.push("/matches");
    } catch (error) {
      console.error("Error adding match:", error);
      toast.error("Error adding match. Please try again.");
    }
  };

  return (
    <GenericForm
      className="p-4 grid grid-cols-1 items-center justify-center border border-primary rounded-lg w-2/5 self-center"
      form={form}
      onSubmit={(values) => onSubmit(values)}
      submitText="Create Match"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Create Match</h2>
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col">
            <Label
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="player1"
            >
              {" "}
              Player 1{" "}
            </Label>
            <PickPlayer
              selectedPlayer={selectedPlayer1}
              onSelect={handleSelection1}
            />
          </div>
          <div className="flex flex-col">
            <Label
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="player2"
            >
              {" "}
              Player 2{" "}
            </Label>
            <PickPlayer
              selectedPlayer={selectedPlayer2}
              onSelect={handleSelection2}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 mx-16">
          <div>
            <Label
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="winner"
            >
              {" "}
              Winner{" "}
            </Label>

            <SelectWinner
              selectedPlayer1={selectedPlayer1}
              selectedPlayer2={selectedPlayer2}
              selectPlayer={handleWinner}
              winner={winner}
            />
          </div>
          <FormDatePicker
            label="Date"
            {...register("date")}
            closeAfterSelect={true}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center">
            <Label
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="score"
            >
              {" "}
              Score{" "}
            </Label>
            <Score
              value={form.watch("score")}
              onChange={(value) => form.setValue("score", value)}
            />
          </div>
        </div>
      </div>
    </GenericForm>
  );
};

export default CreateMatchForm;
