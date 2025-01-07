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
} from "@/components/ui/popover"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ScheduleDetailPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedSuite, setSelectedSuite] = useState("Demo Suite");
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Sat"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
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
          <div className="rounded-xl bg-gray-100 p-4 border">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Start Date and Time
              </label>
              <div className="flex items-center border rounded-md p-2 bg-white">
                <span className="text-sm text-gray-600">
                  10/10/24 at 7:00 AM PST
                </span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Run Weekly on Every
                </label>
                <Button variant={"ghost"} className="text-sm">
                  <u>Custom interval</u>
                </Button>
              </div>
              <div className="flex">
                <ToggleGroup type="multiple">
                  {weekDays.map((day) => (
                    <ToggleGroupItem
                    key={day}
                    value={day}
                    className="px-4 border py-1 rounded-md text-sm font-medium data-[state=on]:bg-blue-600 data-[state=on]:text-white bg-white text-gray-600"
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
          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-700"
            onClick={() => setOpen(false)}
          >
            Cancel Schedule
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setOpen(false)}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailPopup;
