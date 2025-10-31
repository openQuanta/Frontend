"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  X,
  Upload,
  Plus,
  User,
  Copy,
  FileText,
  Award,
  Calendar as CalendarIcon,
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
  FieldDescription,
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

/* Shadcn popover + calendar imports (adjust paths if your setup differs) */
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

/* Helper to convert Zod errors to a map */
function zodErrorsToMap(err: z.ZodError) {
  const map: Record<string, string> = {};
  for (const e of err.errors) {
    const key = String(e.path[0] ?? "form");
    // Only keep the first error per field
    if (!map[key]) map[key] = e.message;
  }
  return map;
}

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

  // form state
  const [paperTitle, setPaperTitle] = React.useState("");
  const [abstract, setAbstract] = React.useState("");
  const [researchField, setResearchField] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [publicationDate, setPublicationDate] = React.useState<Date | undefined>(
    undefined
  );
  const [githubRepository, setGithubRepository] = React.useState("");
  const [doi, setDoi] = React.useState("");
  const [supplementaryMaterials, setSupplementaryMaterials] = React.useState(
    ""
  );

  // tags & lists
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [keywordInput, setKeywordInput] = React.useState("");
  const [coAuthors, setCoAuthors] = React.useState<string[]>([]);
  const [coAuthorInput, setCoAuthorInput] = React.useState("");

  // files
  const [coverImageFile, setCoverImageFile] = React.useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = React.useState<string | null>(
    null
  );
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = React.useState<string>("");

  // UI state
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // keyword handlers
  const handleAddKeyword = () => {
    const val = keywordInput.trim();
    if (!val) return;
    if (keywords.length >= 10) {
      toast.error("Max 10 keywords");
      return;
    }
    setKeywords((k) => {
      const next = [...k, val];
      return next;
    });
    setKeywordInput("");
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords((k) => k.filter((_, i) => i !== index));
  };

  // coauthors handlers
  const handleAddCoAuthor = () => {
    const val = coAuthorInput.trim();
    if (!val) return;
    if (coAuthors.length >= 10) {
      toast.error("Max 10 co-authors");
      return;
    }
    setCoAuthors((c) => [...c, val]);
    setCoAuthorInput("");
  };

  const handleRemoveCoAuthor = (index: number) => {
    setCoAuthors((c) => c.filter((_, i) => i !== index));
  };

  // file handlers
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setCoverImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setCoverImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setPdfFile(file);
    setPdfFileName(file.name);
  };

  // Build the plain JS object that matches ResearchPaperFormData shape
  function buildFormData(): ResearchPaperFormData {
    return {
      paperTitle,
      abstract,
      researchField,
      keywords,
      coAuthors,
      coverImage: coverImageFile,
      pdfFile: pdfFile as File | undefined,
      license,
      publicationDate: publicationDate
        ? publicationDate.toISOString().substring(0, 10)
        : "",
      githubRepository,
      doi,
      supplementaryMaterials,
    } as unknown as ResearchPaperFormData; // cast because schema may expect some specifics
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault?.();
    setLoading(true);
    setErrors({});

    const data = buildFormData();

    // Run Zod validation
    const parsed = researchPaperSchema.safeParse(data);

    if (!parsed.success) {
      const map = zodErrorsToMap(parsed.error);
      setErrors(map);
      toast.error("Please fix the highlighted fields");
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual upload logic (IPFS, supabase storage, etc.)
      console.log("Submitting research paper:", parsed.data);
      toast.success("Research paper submitted successfully!", {
        description: "Your paper is being processed.",
        position: "bottom-right",
      });

      // Reset or navigate as necessary
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to submit your paper. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6">
      <form id="research-paper-form" onSubmit={handleSubmit} className="space-y-6">
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
                <h2 className="text-xl group-data-[state=active]:text-white">Preview</h2>
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
                <h2 className="text-xl group-data-[state=active]:text-white">Publishing</h2>
                <p>Finalize</p>
              </div>
            </TabsTrigger>
          </TabsList>

          <section>
            <TabsContent value="info" className="space-y-8 p-6 border border-white/12 rounded-2xl">
              <div>
                <h2 className="text-3xl font-medium text-white mb-2">Upload Your Research Paper</h2>
              </div>

              <FieldGroup>
                {/* Paper Title */}
                <Field data-invalid={!!errors.paperTitle}>
                  <FieldLabel htmlFor="paper-title" className="text-2xl items-baseline">
                    Paper Title*{" "}
                    <span className="text-white/50 text-base">Max 200 Characters</span>
                  </FieldLabel>
                  <Input
                    id="paper-title"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="Enter the title of your research paper"
                    autoComplete="off"
                    className="bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]"
                    maxLength={200}
                    aria-invalid={!!errors.paperTitle}
                  />
                  <p className="tabular-nums text-white/50 text-sm">{paperTitle.length}/200</p>
                  {errors.paperTitle && <FieldError>{errors.paperTitle}</FieldError>}
                </Field>

                {/* Abstract */}
                <Field data-invalid={!!errors.abstract}>
                  <FieldLabel htmlFor="abstract" className="text-2xl items-baseline">
                    Abstract*{" "}
                    <span className="text-white/50 text-base">Max 5000 Characters</span>
                  </FieldLabel>
                  <Textarea
                    id="abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Describe a concise summary of your research"
                    rows={12}
                    className="min-h-64 resize-none bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]"
                    aria-invalid={!!errors.abstract}
                    maxLength={5000}
                  />
                  <p className="tabular-nums text-white/50 text-sm">{abstract.length}/5000</p>
                  {errors.abstract && <FieldError>{errors.abstract}</FieldError>}
                </Field>

                {/* Research Field */}
                <Field data-invalid={!!errors.researchField}>
                  <FieldLabel htmlFor="research-field" className="text-2xl items-baseline">
                    Research Field*
                  </FieldLabel>

                  <Select value={researchField} onValueChange={(v) => setResearchField(v)}>
                    <SelectTrigger id="research-field" className="bg-[#1A1616]/40 border-white/10 p-8 rounded-[8px]">
                      <SelectValue placeholder="Select a field of research" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[8px]">
                      {researchFields?.map((f) => (
                        <SelectItem key={f.value} value={f.value} className="rounded-[8px]">
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.researchField && <FieldError>{errors.researchField}</FieldError>}
                </Field>

                {/* Keywords */}
                <Field data-invalid={!!errors.keywords}>
                  <FieldLabel htmlFor="keywords-input" className="text-2xl items-baseline">
                    Keywords* <span className="text-white/50 text-base">Max 10 Tags</span>
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
                    <Button type="button" variant="outline" size="icon" onClick={handleAddKeyword} disabled={keywords.length >= 10} className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {keywords.map((k, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-md px-3 py-1 text-sm">
                          {k}
                          <button type="button" onClick={() => handleRemoveKeyword(idx)} className="hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {errors.keywords && <FieldError>{errors.keywords}</FieldError>}
                </Field>

                {/* Co-Authors */}
                <Field data-invalid={!!errors.coAuthors}>
                  <FieldLabel htmlFor="coauthors-input" className="text-2xl items-baseline">
                    Co-Authors (optional) <span className="text-white/50 text-base">Max 10 co-authors</span>
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
                    <Button type="button" variant="outline" size="icon" onClick={handleAddCoAuthor} disabled={coAuthors.length >= 10} className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {coAuthors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {coAuthors.map((c, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-[9px] px-3 py-1 text-sm">
                          {c}
                          <button type="button" onClick={() => handleRemoveCoAuthor(idx)} className="hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {errors.coAuthors && <FieldError>{errors.coAuthors}</FieldError>}
                </Field>

                {/* Cover Image Upload */}
                <Field data-invalid={!!errors.coverImage}>
                  <FieldLabel htmlFor="cover-image" className="text-2xl items-baseline">
                    Paper Cover Image (Optional) <span className="text-white/50 text-base">JPG, PNG - Max 10MB</span>
                  </FieldLabel>

                  <div className="relative border-2 border-dashed border-white/10 rounded-[8px] p-8 bg-[#1A1616]/40 hover:border-white/20 transition-colors">
                    <input id="cover-image" type="file" accept="image/jpeg,image/png" onChange={handleCoverImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      {coverImagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={coverImagePreview} alt="Cover preview" className="max-h-32 rounded" />
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-white/30" />
                          <p className="text-white/50">Drag and drop your cover image here</p>
                          <p className="text-white/30 text-sm">or click to browse files</p>
                        </>
                      )}
                    </div>
                  </div>

                  {errors.coverImage && <FieldError>{errors.coverImage}</FieldError>}
                </Field>

                {/* PDF Upload */}
                <Field data-invalid={!!errors.pdfFile}>
                  <FieldLabel htmlFor="pdf-file" className="text-2xl">
                    PDF File Upload*
                  </FieldLabel>

                  <div className="relative border-2 border-dashed border-white/10 rounded-[8px] p-8 bg-[#1A1616]/40 hover:border-white/20 transition-colors">
                    <input id="pdf-file" type="file" accept="application/pdf" onChange={handlePdfChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      {pdfFileName ? (
                        <div className="flex items-center gap-2">
                          <Upload className="h-6 w-6 text-primary" />
                          <p className="text-white">{pdfFileName}</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-white/30" />
                          <p className="text-white/50">Drag and drop your PDF here</p>
                          <p className="text-white/30 text-sm">or click to browse files</p>
                          <p className="text-white/20 text-xs">PDF only - Max 30MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  {errors.pdfFile && <FieldError>{errors.pdfFile}</FieldError>}
                </Field>

                {/* License */}
                <Field data-invalid={!!errors.license}>
                  <FieldLabel htmlFor="license" className="text-2xl">
                    License*
                  </FieldLabel>

                  <Select value={license} onValueChange={(v) => setLicense(v)}>
                    <SelectTrigger id="license" className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8">
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>

                    <SelectContent className="rounded-[8px]">
                      {licenses.map((lic) => (
                        <SelectItem key={lic.value} value={lic.value} className="rounded-[8px]">
                          {lic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.license && <FieldError>{errors.license}</FieldError>}
                </Field>

                {/* Publication Date (Popover + Calendar) */}
                <Field data-invalid={!!errors.publicationDate}>
                  <FieldLabel htmlFor="publication-date" className="text-2xl">
                    Publication Date*
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="text-primary" />
                          <div>
                            {publicationDate
                              ? publicationDate.toISOString().substring(0, 10)
                              : "Select publication date"}
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={publicationDate}
                        onSelect={(d) => setPublicationDate(d ?? undefined)}
                      />
                    </PopoverContent>
                  </Popover>

                  {errors.publicationDate && <FieldError>{errors.publicationDate}</FieldError>}
                </Field>

                {/* GitHub */}
                <Field data-invalid={!!errors.githubRepository}>
                  <FieldLabel htmlFor="github-repo" className="text-2xl">
                    Github Repository (Optional)
                  </FieldLabel>
                  <Input id="github-repo" value={githubRepository} onChange={(e) => setGithubRepository(e.target.value)} placeholder="https://github.com/..." className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8" />
                  {errors.githubRepository && <FieldError>{errors.githubRepository}</FieldError>}
                </Field>

                {/* DOI */}
                <Field data-invalid={!!errors.doi}>
                  <FieldLabel htmlFor="doi" className="text-2xl items-baseline">
                    DOI (optional) <span className="text-white/50 text-base">e.g. 10.3390/ijerph191610448</span>
                  </FieldLabel>
                  <Input id="doi" value={doi} onChange={(e) => setDoi(e.target.value)} placeholder="Enter DOI (optional)" className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8" />
                  {errors.doi && <FieldError>{errors.doi}</FieldError>}
                </Field>

                {/* Supplementary */}
                <Field data-invalid={!!errors.supplementaryMaterials}>
                  <FieldLabel htmlFor="supplementary" className="text-2xl">Supplementary Materials (Optional)</FieldLabel>
                  <Input id="supplementary" value={supplementaryMaterials} onChange={(e) => setSupplementaryMaterials(e.target.value)} placeholder="Add link to supplementary material" className="bg-[#1A1616]/40 border-white/10 rounded-[8px] p-8" />
                  {errors.supplementaryMaterials && <FieldError>{errors.supplementaryMaterials}</FieldError>}
                </Field>

                <div className="rounded-[8px] p-8 bg-[#8330ED]/10 border border-white/10">
                  <span className="text-[#8330ED]">Estimated time: </span>
                  <span className="text-[#C192FD]/64">~5 minutes to complete the upload process. Your paper will be stored on IPFS and referenced on the blockchain.</span>
                </div>
              </FieldGroup>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-8 pt-16">
                <Button type="button" variant="outline" onClick={() => {
                  // reset form
                  setPaperTitle("");
                  setAbstract("");
                  setResearchField("");
                  setKeywords([]);
                  setCoAuthors([]);
                  setCoverImageFile(null);
                  setCoverImagePreview(null);
                  setPdfFile(null);
                  setPdfFileName("");
                  setLicense("");
                  setPublicationDate(undefined);
                  setGithubRepository("");
                  setDoi("");
                  setSupplementaryMaterials("");
                  setErrors({});
                }} className="text-2xl p-8">
                  Cancel
                </Button>

                <Button type="button" onClick={handleSubmit} className="text-2xl p-8">
                  Preview & Continue
                </Button>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="flex flex-col gap-6 p-6 border border-white/12 rounded-2xl">
              <h2 className="text-3xl font-medium text-white mb-2">Review Your Paper Details</h2>

              <div className="w-full h-[400px] bg-primary/12 border border-white/24"></div>

              <div>
                <div className="px-6 py-1 rounded-full text-primary bg-primary/12 w-max text-xs">Cryptography</div>
              </div>

              <h3>{paperTitle || "Untitled Paper"}</h3>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  <TabsTrigger value="external-links">External Links</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="py-12 flex flex-col gap-12">
                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-medium">Abstract</h4>
                    <p className="text-[#747474]">{abstract || "No abstract provided."}</p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-medium">Keywords</h4>
                    <div className="flex gap-3 items-center flex-wrap">
                      {keywords.length ? keywords.map((k) => <p key={k} className="px-6 py-1 bg-white/8 rounded-full text-xs w-max">{k}</p>) : <p className="text-white/64">No keywords</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-medium">Co-Authors</h4>
                    <div className="flex flex-col gap-3">
                      {coAuthors.length ? coAuthors.map((c, i) => (
                        <div key={i} className="flex gap-2 justify-between items-center p-3 border border-white/12 rounded-[8px]">
                          <div className="flex gap-2 items-center">
                            <User className="text-primary" />
                            <p className="text-white/64 text-sm">{c}</p>
                          </div>
                          <Copy className="text-white/60" width={24} height={24} />
                        </div>
                      )) : <p className="text-white/64">No co-authors</p>}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="grid gap-3">
                  <div className="flex gap-3 items-center justify-between py-3 px-4 bg-[#1A1616]/40 border border-white/4 rounded-[8px]">
                    <p className="text-white/64">Publication Date</p>
                    <div className="flex gap-2 items-center">
                      <CalendarIcon className="text-primary" width={24} height={24} />
                      <p className="text-white/64">{publicationDate ? publicationDate.toISOString().substring(0, 10) : " — "}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center justify-between py-3 px-4 bg-[#1A1616]/40 border border-white/4 rounded-[8px]">
                    <p className="text-white/64">License</p>
                    <p className="text-primary">{license || "—"}</p>
                  </div>

                  <div className="grid gap-1 py-3 px-4 bg-[#1A1616]/40 border border-white/4 rounded-[8px]">
                    <p className="text-white/64">DOI</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm">{doi || "—"}</p>
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
                      <p className="text-white/64">{paperTitle || "Untitled"}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <Award className="text-primary" width={24} height={24} />
                    <div>
                      <p className="text-white/40">Field</p>
                      <p className="text-white/64">{researchField || "—"}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <CalendarIcon className="text-primary" width={24} height={24} />
                    <div>
                      <p className="text-white/40">Publication Date</p>
                      <p className="text-white/64">{publicationDate ? publicationDate.toISOString().substring(0, 10) : "—"}</p>
                    </div>
                  </div>
                </div>

                <hr />

                <h3 className="text-xl font-medium">Expected Outcomes</h3>

                <div className="flex flex-col gap-3">
                  <p className="flex items-center gap-2"><ArrowRight width={12} height={12} className="text-primary" /> Paper stored permanently on Blockchain</p>
                  <p className="flex items-center gap-2"><ArrowRight width={12} height={12} className="text-primary" /> NFT minted to your wallet</p>
                  <p className="flex items-center gap-2"><ArrowRight width={12} height={12} className="text-primary" /> Visible in explore gallery</p>
                  <p className="flex items-center gap-2"><ArrowRight width={12} height={12} className="text-primary" /> Community can review & support</p>
                </div>
              </div>

              <div className="rounded-[8px] my-6 p-8 bg-[#8330ED]/10 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#8330ED]">Network Fee: </span>
                  <span className="text-[#C192FD]/64">Publishing includes blockchain transaction</span>
                </div>
                <div className="flex items-center gap-2 text-[#8330ED]">
                  <Image src="/images/solana_small.svg" alt="solana" width={12} height={12} />
                  ~0.05 Sol (Varies by network)
                </div>
              </div>

              <Button variant="outline" className="p-6"><Edit /> Edit Details</Button>

              <div className="flex gap-2 items-center">
                <Checkbox className="aspect-square h-full" />
                <p className="text-white/40 text-sm">
                  <div>I confirm that this is my original work or I have rights to publish.</div>
                  <div>By publishing, you agree to openQuanta&apos;s <Link href="/terms-of-service" className="text-primary underline">Terms of Service</Link></div>
                </p>
              </div>

              {/* Final Action Buttons */}
              <div className="grid grid-cols-2 gap-8 pt-16">
                <Button type="button" variant="outline" onClick={() => {
                  // reset form (same as earlier)
                  setPaperTitle("");
                  setAbstract("");
                  setResearchField("");
                  setKeywords([]);
                  setCoAuthors([]);
                  setCoverImageFile(null);
                  setCoverImagePreview(null);
                  setPdfFile(null);
                  setPdfFileName("");
                  setLicense("");
                  setPublicationDate(undefined);
                  setGithubRepository("");
                  setDoi("");
                  setSupplementaryMaterials("");
                  setErrors({});
                }} className="text-2xl p-8">Cancel</Button>

                <Button type="button" onClick={handleSubmit} className="text-2xl p-8">Publish</Button>
              </div>

              <div className="flex gap-1 items-center">
                <AlertCircle width={12} height={12} />
                <p className="text-white/40 text-xs"><span className="text-white font-bold">Pro tip:</span> Review all details carefully. You can edit your paper after publishing, but metadata changes require a new transaction.</p>
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
