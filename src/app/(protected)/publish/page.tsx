"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Upload, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  researchPaperSchema,
  type ResearchPaperFormData,
} from "@/schemas/publish-form-schema";
import { Textarea } from "@/components/ui/textarea";
import { fetchPublishInputFields } from "@/lib/data-fetching";

export default function Publish() {
  const [researchFields, setResearchFields] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [licenses, setLicenses] = React.useState<
    { value: string; label: string }[]
  >([]);

  React.useEffect(() => {
    fetchPublishInputFields().then((data) => {
      setResearchFields(data.researchFields);
      setLicenses(data.licenses);
    });
  }, []);

  const form = useForm<ResearchPaperFormData>({
    resolver: zodResolver(researchPaperSchema),
    defaultValues: {
      paperTitle: "",
      abstract: "",
      researchField: "",
      keywords: [],
      coAuthors: [],
      coverImage: null,
      pdfFile: undefined,
      license: "",
      publicationDate: "",
      githubRepository: "",
      doi: "",
      supplementaryMaterials: "",
      // termsAccepted: false,
    },
  });

  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [keywordInput, setKeywordInput] = React.useState("");
  const [coAuthors, setCoAuthors] = React.useState<string[]>([]);
  const [coAuthorInput, setCoAuthorInput] = React.useState("");
  const [coverImagePreview, setCoverImagePreview] = React.useState<
    string | null
  >(null);
  const [pdfFileName, setPdfFileName] = React.useState<string>("");

  const handleAddKeyword = () => {
    if (keywordInput.trim() && keywords.length < 10) {
      const newKeywords = [...keywords, keywordInput.trim()];
      setKeywords(newKeywords);
      form.setValue("keywords", newKeywords);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    form.setValue("keywords", newKeywords);
  };

  const handleAddCoAuthor = () => {
    if (coAuthorInput.trim() && coAuthors.length < 10) {
      const newCoAuthors = [...coAuthors, coAuthorInput.trim()];
      setCoAuthors(newCoAuthors);
      form.setValue("coAuthors", newCoAuthors);
      setCoAuthorInput("");
    }
  };

  const handleRemoveCoAuthor = (index: number) => {
    const newCoAuthors = coAuthors.filter((_, i) => i !== index);
    setCoAuthors(newCoAuthors);
    form.setValue("coAuthors", newCoAuthors);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("pdfFile", file);
      setPdfFileName(file.name);
    }
  };

  function onSubmit(data: ResearchPaperFormData) {
    toast("Research paper submitted successfully!", {
      description: "Your paper is being processed.",
      position: "bottom-right",
    });
  }

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

        <section>
          <TabsContent value="info">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-medium text-white mb-2">
                  Upload Your Research Paper
                </h2>
              </div>

              <form
                id="research-paper-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FieldGroup>
                  {/* Paper Title */}
                  <Controller
                    name="paperTitle"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="paper-title"
                          className="text-2xl items-baseline"
                        >
                          Paper Title*{" "}
                          <span className="text-white/50 text-base">
                            Max 200 Characters
                          </span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="paper-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter the title of your research paper"
                          autoComplete="off"
                          className="bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]"
                        />
                        <p className="tabular-nums text-white/50 text-sm">
                          {field.value.length}/200
                        </p>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Abstract */}
                  <Controller
                    name="abstract"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="abstract"
                          className="text-2xl items-baseline"
                        >
                          Abstract*{" "}
                          <span className="text-white/50 text-base">
                            Max 5000 Characters
                          </span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="abstract"
                          placeholder="Describe a concise summary of your research"
                          rows={12}
                          className="min-h-64 resize-none bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px] "
                          aria-invalid={fieldState.invalid}
                        />
                        <p className="tabular-nums text-white/50 text-sm">
                          {field.value.length}/5000
                        </p>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Research Field */}
                  <Controller
                    name="researchField"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="research-field"
                          className="text-2xl items-baseline"
                        >
                          Research Field*
                        </FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="research-field"
                            className="bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]"
                          >
                            <SelectValue placeholder="Select a field of research" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            {researchFields?.map((field) => (
                              <SelectItem
                                key={field.value}
                                value={field.value}
                                className="rounded-[8px]"
                              >
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Keywords */}
                  <Controller
                    name="keywords"
                    control={form.control}
                    render={({ fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="keywords-input"
                          className="text-2xl items-baseline"
                        >
                          Keywords*{" "}
                          <span className="text-white/50 text-base">
                            Max 10 Tags
                          </span>
                        </FieldLabel>
                        <div className="flex gap-2 items-center">
                          <Input
                            id="keywords-input"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddKeyword();
                              }
                            }}
                            placeholder="Add keywords"
                            className="bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]"
                            disabled={keywords.length >= 10}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleAddKeyword}
                            disabled={keywords.length >= 10}
                            className="shrink-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-md px-3 py-1 text-sm"
                              >
                                {keyword}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveKeyword(index)}
                                  className="hover:text-red-500"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Co-Authors */}
                  <Controller
                    name="coAuthors"
                    control={form.control}
                    render={({ fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="coauthors-input"
                          className="text-2xl items-baseline"
                        >
                          Co-Authors (optional){" "}
                          <span className="text-white/50 text-base">
                            Max 10 co-authors
                          </span>
                        </FieldLabel>
                        <div className="flex gap-2 items-center">
                          <Input
                            id="coauthors-input"
                            type="email"
                            value={coAuthorInput}
                            onChange={(e) => setCoAuthorInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddCoAuthor();
                              }
                            }}
                            placeholder="Enter valid email or ORCiD"
                            className="bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]"
                            disabled={coAuthors.length >= 10}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleAddCoAuthor}
                            disabled={coAuthors.length >= 10}
                            className="shrink-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {coAuthors.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {coAuthors.map((coAuthor, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-[9px] px-3 py-1 text-sm"
                              >
                                {coAuthor}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCoAuthor(index)}
                                  className="hover:text-red-500"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Cover Image Upload */}
                  <Controller
                    name="coverImage"
                    control={form.control}
                    render={({ fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="cover-image"
                          className="text-2xl items-baseline"
                        >
                          Paper Cover Image (Optional){" "}
                          <span className="text-white/50 text-base">
                            JPG, PNG - Max 10MB
                          </span>
                        </FieldLabel>
                        <div className="relative border-2 border-dashed border-white/10 rounded-[8px] p-8 bg-[#1A1616]/40 hover:border-white/20 transition-colors">
                          <input
                            id="cover-image"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleCoverImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center gap-2 text-center">
                            {coverImagePreview ? (
                              <img
                                src={coverImagePreview}
                                alt="Cover preview"
                                className="max-h-32 rounded"
                              />
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-white/30" />
                                <p className="text-white/50">
                                  Drag and drop your cover image here
                                </p>
                                <p className="text-white/30 text-sm">
                                  or click to browse files
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* PDF Upload */}
                  <Controller
                    name="pdfFile"
                    control={form.control}
                    render={({ fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="pdf-file" className="text-2xl">
                          PDF File Upload*
                        </FieldLabel>
                        <div className="relative border-2 border-dashed border-white/10 rounded-[8px] p-8 bg-[#1A1616]/40 hover:border-white/20 transition-colors">
                          <input
                            id="pdf-file"
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center gap-2 text-center">
                            {pdfFileName ? (
                              <div className="flex items-center gap-2">
                                <Upload className="h-6 w-6 text-primary" />
                                <p className="text-white">{pdfFileName}</p>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-white/30" />
                                <p className="text-white/50">
                                  Drag and drop your PDF here
                                </p>
                                <p className="text-white/30 text-sm">
                                  or click to browse files
                                </p>
                                <p className="text-white/20 text-xs">
                                  PDF only - Max 30MB
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* License */}
                  <Controller
                    name="license"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="license" className="text-2xl">
                          License*
                        </FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="license"
                            className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8"
                          >
                            <SelectValue placeholder="CC BY 4.0" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            {licenses.map((license) => (
                              <SelectItem
                                key={license.value}
                                value={license.value}
                                className="rounded-[8px]"
                              >
                                {license.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Publication Date */}
                  <Controller
                    name="publicationDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="publication-date"
                          className="text-2xl"
                        >
                          Publication Date*
                        </FieldLabel>
                        <Input
                          {...field}
                          id="publication-date"
                          type="date"
                          aria-invalid={fieldState.invalid}
                          className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* GitHub Repository */}
                  <Controller
                    name="githubRepository"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="github-repo" className="text-2xl">
                          Github Repository (Optional)
                        </FieldLabel>
                        <Input
                          {...field}
                          id="github-repo"
                          type="url"
                          placeholder="https://github.com/..."
                          className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* DOI */}
                  <Controller
                    name="doi"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="doi"
                          className="text-2xl items-baseline"
                        >
                          DOI (optional){" "}
                          <span className="text-white/50 text-base">
                            e.g. 10.3390/ijerph191610448
                          </span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="doi"
                          placeholder="Enter DOI (optional)"
                          className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Supplementary Materials */}
                  <Controller
                    name="supplementaryMaterials"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="supplementary"
                          className="text-2xl"
                        >
                          Supplementary Materials (Optional)
                        </FieldLabel>
                        <Input
                          {...field}
                          id="supplementary"
                          type="url"
                          placeholder="Add link to supplementary material"
                          className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="rounded-[8px] p-8 bg-[#8330ED]/10 border border-white/10">
                    <span className="text-[#8330ED]">Estimated time: </span>
                    <span className="text-[#C192FD]/64">
                      ~5 minutes to complete the upload process. Your paper will
                      be stored on IPFS and referenced on the blockchain.
                    </span>
                  </div>

                  {/* Terms & Conditions */}
                  {/* <Controller
                    name="termsAccepted"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation="horizontal"
                      >
                        <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <div className="flex-1">
                            <label
                              htmlFor="terms"
                              className="text-sm text-white/70 cursor-pointer"
                            >
                              I understand I'm required to complete the upload
                              process. Your paper will be stored on IPFS and
                              indexed on the blockchain.
                            </label>
                          </div>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  /> */}
                </FieldGroup>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-8 pt-16">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="text-2xl p-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="research-paper-form"
                    className="text-2xl p-8"
                  >
                    Preview & Continue
                  </Button>
                </div>
              </form>
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
