import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Publish() {
  return (
    <main>
      <Tabs defaultValue="info" className="w-full max-w-[1200px] mx-auto py-24">
        <TabsList className="w-max border-none bg-transparent gap-12 p-6">
          <TabsTrigger
            value="info"
            className="text-left text-white/30 h-max py-3 justify-start gap-4 border-b border-b-white/30 font-normal"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              1
            </div>
            <div>
              <h2 className="text-xl">Paper Information</h2>
              <p>Upload details</p>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="text-left text-white/30 h-max py-3 justify-start gap-4 border-b border-b-white/30 font-normal"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              2
            </div>
            <div>
              <h2 className="text-xl">Preview</h2>
              <p>Review details</p>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="publish"
            className="text-left text-white/30 h-max py-3 justify-start gap-4 border-b border-b-white/30 font-normal"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              3
            </div>
            <div>
              <h2 className="text-xl">Publishing</h2>
              <p>Finalize</p>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <section className="p-6">
          <TabsContent value="info">
            <div className="w-full max-w-[1200px] mx-auto">
              <h2>Info</h2>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="w-full max-w-[1200px] mx-auto">
              <h2>Preview</h2>
            </div>
          </TabsContent>
          <TabsContent value="publish">
            <div className="w-full max-w-[1200px] mx-auto">
              <h2>Publish</h2>
            </div>
          </TabsContent>
        </section>
      </Tabs>
    </main>
  );
}
