import { CalendarComponent } from "@/components/calendar/CalendarComponent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function Home() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} className="bg-gray-100"></ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <CalendarComponent />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
