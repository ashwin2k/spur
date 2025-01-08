"use server";
import { createClient } from "@/utils/supabase/server";

export const getEvents = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("Tests").select("*");
    if (error) {
      console.error("Critical Error while fetching events", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Critical Error while fetching events", error);
    return null;
  }
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
  try {
    const res = await supabase.from("Tests").insert({
      id: randomIntUUID,
      title: selectedSuite,
      schedule: selectedDays,
      time: selectedTime,
      date: date,
    });
    if (res.status == 201) {
      return randomIntUUID;
    } else {
      console.warn("Error saving event", res);
    }
  } catch (error) {
    console.error("Critical error while saving event", error);
  }
  return null;
};
