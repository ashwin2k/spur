import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function Home() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={24} className="bg-gray-100"></ResizablePanel>
      <ResizableHandle />
      <ResizablePanel></ResizablePanel>
    </ResizablePanelGroup>
  );
}
