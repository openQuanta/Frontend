"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  X,
  Upload,
  Plus,
  User,
  Copy,
  FileText,
  Award,
  Calendar,
  ArrowRight,
  Edit,
  AlertCircle,
} from "lucide-react";

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
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

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
    console.log("Submitted data:", data);
    toast("Research paper submitted successfully!", {
      description: "Your paper is being processed.",
      position: "bottom-right",
    });
  }

  return (
    <main className="p-6">
      <form
        id="research-paper-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
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
            <TabsContent
              value="info"
              className="space-y-8 p-6 border border-white/12 rounded-2xl"
            >
              <div>
                <h2 className="text-3xl font-medium text-white mb-2">
                  Upload Your Research Paper
                </h2>
              </div>

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
                            <Image
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
                      <FieldLabel htmlFor="supplementary" className="text-2xl">
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
                <Button type="button" className="text-2xl p-8">
                  Preview & Continue
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="preview"
              className="flex flex-col gap-6 p-6 border border-white/12 rounded-2xl"
            >
              <h2 className="text-3xl font-medium text-white mb-2">
                Review Your Paper Details
              </h2>

              <div className="w-full h-[400px] bg-primary/12 border border-white/24"></div>

              <div>
                <div className="px-6 py-1 rounded-full text-primary bg-primary/12 w-max text-xs">
                  Cryptography
                </div>
              </div>

              <h3>
                Post-Quantum Cryptography Protocol for Blockchain Consensus
              </h3>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  <TabsTrigger value="external-links">
                    External Links
                  </TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="overview"
                  className="py-12 flex flex-col gap-12"
                >
                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-medium">Abstract</h4>
                    <p className="text-[#747474]">
                      This paper presents a comprehensive framework for
                      integrating post-quantum cryptographic protocols into
                      blockchain systems. We analyze the vulnerabilities of
                      current elliptic curve cryptography to quantum computing
                      attacks and propose a hybrid approach combining
                      lattice-based cryptography with traditional ECC. Our
                      implementation demonstrates minimal performance overhead
                      while maintaining backward compatibility with existing
                      blockchain networks. We provide security proofs and
                      conduct extensive benchmarking against quantum-resistant
                      attack vectors.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-medium">Keywords</h4>

                    <div className="flex gap-3 items-center">
                      <p className="px-6 py-1 bg-white/8 rounded-full text-xs w-max">
                        Blockchain
                      </p>
                      <p className="px-6 py-1 bg-white/8 rounded-full text-xs w-max">
                        Distributed Systems
                      </p>
                      <p className="px-6 py-1 bg-white/8 rounded-full text-xs w-max">
                        Post-Quantum Cryptography
                      </p>
                      <p className="px-6 py-1 bg-white/8 rounded-full text-xs w-max">
                        Security
                      </p>
                      <p className="px-6 py-1 bg-white/8 rounded-full text-xs w-max">
                        Quantum Computing
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-medium">Co-Authors</h4>

                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 justify-between items-center p-3 border border-white/12 rounded-[8px]">
                        <div className="flex gap-2 items-center">
                          <User className="text-primary" />
                          <p className="text-white/64 text-sm">
                            0x742d35Cc6634C0532925a3b844Bc9e7595f42e0d
                          </p>
                        </div>
                        <Copy
                          className="text-white/60"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex gap-2 justify-between items-center p-3 border border-white/12 rounded-[8px]">
                        <div className="flex gap-2 items-center">
                          <User className="text-primary" />
                          <p className="text-white/64 text-sm">john.sol</p>
                        </div>
                        <Copy
                          className="text-white/60"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex gap-2 justify-between items-center p-3 border border-white/12 rounded-[8px]">
                        <div className="flex gap-2 items-center">
                          <User className="text-primary" />
                          <p className="text-white/64 text-sm">
                            <div className="text-xs">
                              pqc-blockchain-paper.pdf
                            </div>
                            <div className="text-white/32">4.2MB</div>
                          </p>
                        </div>
                        <Copy
                          className="text-white/60"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="grid gap-3">
                  <div className="flex gap-3 items-center justify-between py-3 px-4 bg-[#1A1616]/40 border border-white/4 rounded-[8px]">
                    <p className="text-white/64">Publication Date</p>
                    <div className="flex gap-2 items-center">
                      <Calendar
                        className="text-primary"
                        width={24}
                        height={24}
                      />
                      <p className="text-white/64">2025-01-15</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center justify-between py-3 px-4 bg-[#1A1616]/40 border border-white/4 rounded-[8px]">
                    <p className="text-white/64">License</p>
                    <p className="text-primary">CC BY 4.0</p>
                  </div>
                  <div className="grid gap-1 py-3 px-4 bg-[#1A1616]/40 border border-white/4 rounded-[8px]">
                    <p className="text-white/64">DOI</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm">10.1109/ACCESS.2025.242526</p>
                      <Copy className="text-white/60" width={12} height={12} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-medium">Summary</h3>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-3 items-center">
                    <FileText className="text-primary" width={24} height={24} />
                    <div>
                      <p className="text-white/40">Title</p>
                      <p className="text-white/64">
                        Post-Quantum Cryptography Protocol for Blockchain
                        Consensus
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <Award className="text-primary" width={24} height={24} />
                    <div>
                      <p className="text-white/40">Field</p>
                      <p className="text-white/64">Cryptography</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <Calendar className="text-primary" width={24} height={24} />
                    <div>
                      <p className="text-white/40">Publication Date</p>
                      <p className="text-white/64">2025-01-15</p>
                    </div>
                  </div>
                </div>

                <hr />

                <h3 className="text-xl font-medium">Expected Outcomes</h3>

                <div className="flex flex-col gap-3">
                  <p className="flex items-center gap-2">
                    <ArrowRight
                      width={12}
                      height={12}
                      className="text-primary"
                    />{" "}
                    Paper stored permanently on Blockchain
                  </p>

                  <p className="flex items-center gap-2">
                    <ArrowRight
                      width={12}
                      height={12}
                      className="text-primary"
                    />{" "}
                    NFT minted to your wallet
                  </p>

                  <p className="flex items-center gap-2">
                    <ArrowRight
                      width={12}
                      height={12}
                      className="text-primary"
                    />{" "}
                    Visible in explore gallery
                  </p>

                  <p className="flex items-center gap-2">
                    <ArrowRight
                      width={12}
                      height={12}
                      className="text-primary"
                    />{" "}
                    Community can review & support
                  </p>
                </div>
              </div>

              <div className="rounded-[8px] my-6 p-8 bg-[#8330ED]/10 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#8330ED]">Network Fee: </span>
                  <span className="text-[#C192FD]/64">
                    Publishing includes blockchain transaction
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#8330ED]">
                  <Image
                    src="/images/solana_small.svg"
                    alt="solana"
                    width={12}
                    height={12}
                  />
                  ~0.05 Sol (Varies by network)
                </div>
              </div>

              <Button variant="outline" className="p-6">
                <Edit /> Edit Details
              </Button>

              {/* Consent */}
              <div className="flex gap-2 items-center">
                <Checkbox className="aspect-square h-full" />
                <p className="text-white/40 text-sm">
                  <div>
                    I confirm that this is my original work or I have rights to
                    publish.
                  </div>
                  <div>
                    By publishing, you agree to openQuanta&apos;s{" "}
                    <Link
                      href="/terms-of-service"
                      className="text-primary underline"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </p>
              </div>

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
                  Publish
                </Button>
              </div>

              <div className="flex gap-1 items-center">
                <AlertCircle width={12} height={12} />
                <p className="text-white/40 text-xs">
                  <span className="text-white font-bold">Pro tip:</span> Review
                  all details carefully. You can edit your paper after
                  publishing, but metadata changes require a new transaction.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="publish">
              <div>
                <h2>Publish</h2>
              </div>
            </TabsContent>
          </section>
        </Tabs>
      </form>
    </main>
  );
}
