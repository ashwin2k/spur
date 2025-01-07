import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "../ui/calendar";
import { saveEvent } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { CircleX } from "lucide-react";

const ScheduleDetailPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedSuite, setSelectedSuite] = useState("Demo Suite");
  const [selectedTime, setSelectedTime] = useState("07:00");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const { toast } = useToast();
  const saveChanges = async () => {
    console.log(selectedDays, date, selectedTime, selectedSuite);
    const saveResult = await saveEvent({
      selectedDays,
      selectedTime,
      date,
      selectedSuite,
    });
    if (saveResult) {
      toast({
        title: "Added event successfully!",
      });
    } else {
      toast({
        title: "Error adding event!",
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[640px] rounded-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium">
              Schedule Detail
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Test Suite
            </label>
            <Select value={selectedSuite} onValueChange={setSelectedSuite}>
              <SelectTrigger className="w-full">
                <SelectValue>{selectedSuite}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Demo Suite">Demo Suite</SelectItem>
                <SelectItem value="Test Suite">Test Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 border">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Start Date and Time
              </label>
              <div className="flex flex-row w-full">
                <div className="flex items-center border rounded-md p-2 bg-white w-1/2">
                  <Popover>
                    <PopoverTrigger className="text-sm text-gray-600">
                      {date?.toLocaleDateString()}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <input
                  type="time"
                  onChange={(e) => setSelectedTime(e.target.value)}
                  defaultValue={selectedTime}
                  className="text-gray-600 ml-2 w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Run Weekly on Every
                </label>
                <Button variant={"ghost"} className="text-sm text-gray-400">
                  <u>Custom Interval</u>
                </Button>
              </div>
              <div className="flex">
                <ToggleGroup
                  type="multiple"
                  value={selectedDays}
                  className="gap-0 w-full flex "
                  onValueChange={(v) => setSelectedDays(v)}
                >
                  {weekDays.map((day, idx) => (
                    <ToggleGroupItem
                      key={day}
                      value={day}
                      className={`border flex-grow px-4 py-1 rounded-none text-sm font-medium data-[state=on]:bg-blue-700 data-[state=on]:text-white bg-white text-gray-600
                      ${idx === 0 ? "rounded-l-lg" : ""}
                       ${idx === weekDays.length - 1 ? "rounded-r-lg" : ""}
                      `}
                    >
                      {day}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-start w-full mt-6">
          <div className="flex flex-row w-full">
            <Button
              variant="outline"
              className="w-full rounded-lg text-red-600 hover:text-red-700 mr-4"
              onClick={() => setOpen(false)}
            >
              <CircleX />
              Cancel Schedule
            </Button>
            <Button
              className="w-full bg-blue-700 text-white hover:bg-blue-800"
              onClick={saveChanges}
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailPopup;
