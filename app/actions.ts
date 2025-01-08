"use server";
import { createClient } from "@/utils/supabase/server";

export const getEvents = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Tests").select("*");
  if (error) {
    console.error(error.message);
    return null;
  }
  return data;
};

export const saveEvent = async ({
  selectedDays,
  selectedTime,
  date,
  selectedSuite,
}: {
  selectedDays: string[];
  selectedTime: string;
  date: Date | undefined;
  selectedSuite: string;
}) => {
  const supabase = await createClient();
  const randomIntUUID = BigInt("0x" + crypto.randomUUID().replace(/-/g, ""))
    .toString()
    .substring(0, 10);
  const res = await supabase.from("Tests").insert({
    id: randomIntUUID,
    title: selectedSuite,
    schedule: selectedDays,
    time: selectedTime,
    date: date,
  });
  if (res.status == 201) {
    return randomIntUUID;
  }
  return null;
};
