import { cookies } from "next/headers";
import { type Participant } from "./mock-data";
import participantsData from "../data/participants.json";

export async function getParticipant(): Promise<Participant> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return participantsData[0] as Participant;
  return (
    (participantsData as Participant[]).find((p) => p.id === userId) ||
    (participantsData[0] as Participant)
  );
}
