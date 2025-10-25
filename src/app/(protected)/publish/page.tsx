import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Publish() {
  return (
    <main className="p-6">
      <Tabs
        defaultValue="info"
        className="w-full max-w-[1200px] mx-auto py-24 flex flex-col gap-16"
      >
        <TabsList className="w-max border-none bg-transparent gap-12 p-0">
          <TabsTrigger
            value="info"
            className="group text-left text-white/30 h-max py-3 justify-start gap-4 border-b border-b-white/30 font-normal"
          >
            <div className="w-12 h-12 bg-[#1A1616] group-data-[state=active]:bg-primary rounded-full flex items-center justify-center group-data-[state=active]:text-white">
              1
            </div>
            <div>
              <h2 className="text-xl group-data-[state=active]:text-white">
                Paper Information
              </h2>
              <p>Upload details</p>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="group text-left text-white/30 h-max py-3 justify-start gap-4 border-b border-b-white/30 font-normal"
          >
            <div className="w-12 h-12 bg-[#1A1616] group-data-[state=active]:bg-primary rounded-full flex items-center justify-center group-data-[state=active]:text-white">
              2
            </div>
            <div>
              <h2 className="text-xl group-data-[state=active]:text-white">
                Preview
              </h2>
              <p>Review details</p>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="publish"
            className="group text-left text-white/30 h-max py-3 justify-start gap-4 border-b border-b-white/30 font-normal"
          >
            <div className="w-12 h-12 bg-[#1A1616] group-data-[state=active]:bg-primary rounded-full flex items-center justify-center group-data-[state=active]:text-white">
              3
            </div>
            <div>
              <h2 className="text-xl group-data-[state=active]:text-white">
                Publishing
              </h2>
              <p>Finalize</p>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <section>
          <TabsContent value="info">
            <div>
              <h2>Info</h2>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div>
              <h2>Preview</h2>
            </div>
          </TabsContent>
          <TabsContent value="publish">
            <div>
              <h2>Publish</h2>
            </div>
          </TabsContent>
        </section>
      </Tabs>
    </main>
  );
}
