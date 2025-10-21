'use client'

import PreviewStage from '@/components/publish-tabs/preview'
import { useState } from 'react'
import Image from 'next/image'
import { OrangeLogo, Notification, Message, Headshot, UploadIcon, HeadshotIcon } from '@/assets/images'

interface FormData {
  title: string;
  author: string;
  paperType: string;
  keyword: string; // Temporary keyword input state (not part of main formData)
  abstract: string;
  coverImage: File | null;
  pdf: File | null;
  license: string;
  date: string;
  publisher: string; // Not needed anymore, was used for Github URL
  doi: string;
  github: string;
  supplementaryMaterials: string;
}

// Helper function to format file size
const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === undefined || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};


export default function UploadResearchPaper() {
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '', // This should ideally be the primary author's wallet/SNS
    paperType: '',
    keyword: '',
    abstract: '',
    coverImage: null,
    pdf: null,
    license: '',
    date: '',
    publisher: '', // Keeping it for type safety but it's redundant now
    doi: '',
    github: '',
    supplementaryMaterials: '',
  })

  // State for Keywords
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])

  // === NEW STATE FOR CO-AUTHORS ===
  const [coAuthor, setCoAuthor] = useState('') // Temporary input for co-author
  const [coAuthors, setCoAuthors] = useState<string[]>([]) // Array of added co-authors
  // ================================

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

    // Handle file inputs separately
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleAddKeyword = () => {
    if (!keyword.trim()) return
    if (keywords.length >= 10) return
    const newKeywords = keyword
      .split(',')
      .map(k => k.trim())
      .filter(k => k && !keywords.includes(k))
    setKeywords([...keywords, ...newKeywords].slice(0, 10))
    setKeyword('')
  }

  const handleRemoveKeyword = (word: string) => {
    setKeywords(keywords.filter(k => k !== word))
  }

  // === NEW HANDLERS FOR CO-AUTHORS ===
  const handleAddCoAuthor = () => {
    if (!coAuthor.trim()) return
    if (coAuthors.length >= 10) return // Max 10 co-authors limit

    // Allow adding multiple co-authors separated by comma (like keywords)
    const newCoAuthors = coAuthor
      .split(',')
      .map(a => a.trim())
      .filter(a => a && !coAuthors.includes(a))

    // Ensure total co-authors doesn't exceed 10
    setCoAuthors([...coAuthors, ...newCoAuthors].slice(0, 10))
    setCoAuthor('')
  }

  const handleRemoveCoAuthor = (address: string) => {
    setCoAuthors(coAuthors.filter(a => a !== address))
  }
  // ===================================

  // >>> FORM SUBMISSION HANDLER to switch to preview <<<
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPreview(true)
  }

  if (isPreview) {
    // Pass keywords and coAuthors to PreviewStage
    const previewFormData = {
      ...formData,
      keywords: keywords,
      coAuthors: coAuthors,
    }
    // Note: You need to ensure PreviewStage accepts an object with keywords and coAuthors
    return <PreviewStage formData={previewFormData as any} onBack={() => setIsPreview(false)} />
  }

  // current step: 1 = Paper Info, 2 = Preview (and its tabs), 3 = Publishing
  const currentStep = isPreview ? 2 : 1

  return (
    <main className='mt-15'>
      {/* ... (Header and Progress Steps JSX remains the same) ... */}
            <div className='flex justify-between items-center py-2 px-6 h-[47px] w-[98%] absolute top-0 left-0 right-0 bg-black z-10'>
                {/* Placeholder for the Orange Logo */}
                <div className='w-[64px] h-[15px] bg-orange-500 rounded-sm'></div>
                <div className='flex w-[177px] h-[24px] gap-2 items-center justify-center my-auto'>
                    <Image src={Message} alt='Message' width={12} height={12} style={{ objectFit: 'contain' }} />
                    <Image src={Notification} alt='Notification' width={12} height={12} style={{ objectFit: 'contain' }} />
                    <div className='flex items-center w-[143px] pr-8 py-1 pl-1 gap-4 border border-white/20 rounded-2xl'>
                        <Image src={HeadshotIcon} alt='Headshot' width={16} height={16} className='profile-img' style={{ objectFit: 'contain' }} />
                        <div className='flex items-center gap-2'>
                            <span className='connected bg-green-500 size-[6px] rounded-full'></span>
                            <span className='wallet-address text-wrap w-[57px] text-[10px] overflow-clip'>uecuvecedceygpo</span>
                        </div>
                    </div>
                </div>
            </div>
            
      {/* Progress Steps (highlights current step) */}
      <div className='flex justify-center pt-20 gap-10 border-b border-gray-800/80 pb-6'>
        <div className='flex items-center gap-3'>
          <span
            className={`px-4 py-2 rounded-full text-xl font-bold ${currentStep === 1 ? 'bg-[#F97316] text-white' : 'bg-[#1A1A16] text-white/80'}`}
          >
            1
          </span>
          <div className='text-sm'>
            <h2 className={`text-[16px] font-semibold ${currentStep === 1 ? 'text-white' : 'text-white/70'}`}>Paper Information</h2>
            <h3 className={`text-[12px] font-light ${currentStep === 1 ? 'text-white/80' : 'text-white/70'}`}>Upload details</h3>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span
            className={`px-4 py-2 rounded-full text-xl font-bold ${currentStep === 2 ? 'bg-[#F97316] text-white border border-white' : 'bg-white/5 text-white/80 border border-white/10'}`}
          >
            2
          </span>
          <div className='text-sm'>
            <h2 className={`text-[16px] font-semibold ${currentStep === 2 ? 'text-white' : 'text-white/70'}`}>Preview</h2>
            <h3 className={`text-[12px] font-light ${currentStep === 2 ? 'text-white/80' : 'text-white/70'}`}>Review Paper</h3>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span
            className={`px-4 py-2 rounded-full text-xl font-bold ${currentStep === 3 ? 'bg-[#F97316] text-white' : 'bg-white/5 text-white/80'}`}
          >
            3
          </span>
          <div className='text-sm'>
            <h2 className={`text-[16px] font-semibold ${currentStep === 3 ? 'text-white' : 'text-white/70'}`}>Publishing</h2>
            <h3 className={`text-[12px] font-light ${currentStep === 3 ? 'text-white/80' : 'text-white/70'}`}>Final Steps</h3>
          </div>
        </div>
      </div>

      <div className='min-h-screen bg-black text-white flex justify-center py-10 px-4'>
        <div
          className='h-[3073px] max-w-[1000px] bg-[#110F0F]/50 p-[30px] rounded-2xl space-y-6 border border-white/10 mt-8'
        >
          <h2 className='text-4xl font-semibold mb-[48px]'>Upload Your Research Paper</h2>

          <form
            className='w-[900px] h-2864px flex flex-col gap-16 [&>input]:mb-[8px] [&>input]:text-[12px] border-[#fff]/8'
            onSubmit={handleFormSubmit}
          >
            {/* Paper Title* */}
            <div>
              <label className='block mb-6 text-2xl'>
                Paper Title*<span className='text-[16px]'> Max 200 Characters</span>
              </label>
              <input
                name='title'
                type='text'
                value={formData.title}
                onChange={handleChange}
                maxLength={200}
                placeholder='Enter the title of your research paper'
                // 💡 REQUIRED
                required
                className='w-full h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none px-9 mb-[8px]'
              />
              <span>{formData.title.length} /200</span>
            </div>

            {/* Abstract* */}
            <div>
              <label className='block mb-6 text-2xl'>
                Abstract*<span className='text-[16px]'> Max 5000 Characters</span>
              </label>
              <textarea
                name='abstract'
                value={formData.abstract}
                maxLength={5000} // Set max length on the textarea
                placeholder='Provide a comprehensive abstract to your research'
                // 💡 REQUIRED
                required
                onChange={handleChange}
                className='w-full h-[200px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none px-9 pt-[4px] mb-[8px]'
              />
              <span>{formData.abstract.length}/5000</span>
            </div>

            {/* Research Field (Paper Type)* */}
            <div>
              <label className='block mb-6 text-2xl'>Research Field*</label>
              <select
                name='paperType'
                value={formData.paperType}
                onChange={handleChange}
                // 💡 REQUIRED
                required
                className='w-full h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none px-9 mb-[8px] text-white/40 '
              >
                <option value=''>Select a field of research</option>
                <option value='Thesis'>Thesis</option>
                <option value='Journal'>Journal</option>
                <option value='Conference'>Conference</option>
              </select>
            </div>

            {/* Keywords* */}
            <div>
              <label className='block mb-6 text-2xl'>
                Keywords* <span className='text-[16px]'>Max 10 tags</span>
              </label>

              <div className='flex gap-2.5'>
                <div
                  className='flex flex-wrap items-center gap-2 w-[824px] min-h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg px-4 py-3 text-white/45 cursor-text'
                  onClick={() => document.getElementById('keyword-input')?.focus()}
                >
                  {keywords.map((word, index) => (
                    <span
                      key={index}
                      className='flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-md text-sm'
                    >
                      {word}
                      <button
                        type='button'
                        onClick={() => handleRemoveKeyword(word)}
                        className='text-red-400 hover:text-red-600'
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    id='keyword-input'
                    name='keywords'
                    type='text'
                    value={keyword}
                    // 💡 NOTE: Required logic here is handled by the submit button logic in a real app
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddKeyword()
                      }
                    }}
                    placeholder={keywords.length === 10 ? 'Max 10 keywords reached' : 'Add a keyword'}
                    disabled={keywords.length >= 10}
                    className='flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40'
                  />
                </div>
                <button type='button' onClick={handleAddKeyword} className='text-[20.3px] size-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none' > + </button>
              </div>

              <div className='text-white/40 text-[12px] mt-1'>
                Press Enter or the Add button to confirm a keyword
              </div>
            </div>


            {/* === CO-AUTHORS INPUT (TAG-STYLE) === */}
            <div>
              <label className='block mb-6 text-2xl'>
                Co-Authors(optional)<span className='text-[16px]'> Max 10 co-authors</span>
              </label>

              <div className='flex gap-2.5'>
                <div
                  className='flex flex-wrap items-center gap-2 w-[900px] min-h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg px-4 py-3 text-white cursor-text'
                  onClick={() => document.getElementById('coauthor-input')?.focus()}
                >
                  {coAuthors.map((address, index) => (
                    <span
                      key={index}
                      // Use a fixed width or truncate for long addresses/names
                      className='flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-md text-sm text-white/45 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'
                    >
                      {address}
                      <button
                        type='button'
                        onClick={() => handleRemoveCoAuthor(address)}
                        className='text-red-400 hover:text-red-600'
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    id='coauthor-input'
                    name='coAuthorInput'
                    type='text'
                    value={coAuthor}
                    onChange={(e) => setCoAuthor(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddCoAuthor()
                      }
                    }}
                    placeholder={coAuthors.length < 10 ? 'Enter wallet address or SNS name' : 'Max 10 co-authors reached'}
                    disabled={coAuthors.length >= 10}
                    className='flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40'
                  />
                </div>

              </div>

              <div className='text-white/40 text-[12px] mt-1'>
                Press Enter or the Add button to confirm a co-author (wallet/SNS)
              </div>
            </div>

            {/* Paper Cover Image (Optional) */}
            <div>
              <label className='block mb-6 text-2xl text-white'>
                Paper Cover Image (Optional)
                <span className='text-[16px] ml-1'>JPG, PNG - Max 10MB</span>
              </label>

              <div
                className='flex flex-col justify-center items-center w-[900px] h-[200px] border border-white/20 rounded-lg bg-[#1A1616]/40 cursor-pointer text-center'>
                <div className='bg-[#0F0D0D] w-[877px] h-[180px] rounded-[8px] flex flex-col justify-center items-center border-2 border-dashed border-white/12'>
                  <Image src={UploadIcon} alt='' width={24} height={24} className='mb-[9px] ' style={{ objectFit: 'contain' }} />
                  <p className='text-white opacity-64 mb-[7px] text-[16px]'>
                    Drag and drop your cover image here<br />
                    or click to browse files
                  </p>

                  {/* Display uploaded file name */}
                  {formData.coverImage && <p className='text-orange-400 text-[14px]'>{formData.coverImage.name} uploaded</p>}

                  <p className='text-white/24 text-[12px]'>
                    Recommended: 2734×454px or similar aspect ratio
                  </p>

                  <input
                    type='file'
                    name='coverImage'
                    accept='image/*'
                    onChange={handleChange}
                    className='absolute w-[900px] h-[200px] opacity-0 cursor-pointer'
                  />
                </div>
              </div>
            </div>


            {/* PDF File Upload* (UPDATED) */}
            <div>
              <label className='block mb-6 text-2xl'>PDF/Text File Upload*</label>
              <div
                className='flex flex-col justify-center items-center w-[900px] h-[200px] border border-white/20 rounded-[8px] bg-[#1A1616]/40 cursor-pointer text-center'>
                <div className='bg-[#0F0D0D] w-[877px] h-[180px] rounded-[8px] flex flex-col justify-center items-center border-2 border-dashed border-white/12'>
                  <Image src={UploadIcon} alt='' width={24} height={24} className='mb-[9px] ' style={{ objectFit: 'contain' }} />

                  {/* 💡 NEW DISPLAY LOGIC */}
                  {formData.pdf ? (
                    <>
                      <p className='text-orange-400 font-semibold text-[16px]'>{formData.pdf.name}</p>
                      <p className='text-white/64 mb-[7px] text-[14px]'>
                        Size: {formatFileSize(formData.pdf.size)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className='text-white opacity-64 mb-[7px] text-[16px]'>
                        Drag and drop your document here<br />
                        or click to browse files
                      </p>
                      <p className='text-white/24 text-[12px]'>
                        Max size: 50MB
                      </p>
                    </>
                  )}

                  <input
                    type='file'
                    name='pdf'
                    accept='application/pdf, .doc, .docx'
                    onChange={handleChange}
                    // 💡 REQUIRED
                    required
                    className='absolute w-[877px] h-[180px] opacity-0 cursor-pointer'
                  />
                </div>
              </div>
            </div>

            {/* License */}
            <div>
              <label className='block mb-6 text-2xl'>License</label>
              <select
                name='license'
                value={formData.license}
                onChange={handleChange}
                className='w-full h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none px-9 mb-[8px] text-white/40'
              >
                <option value=''>Select License</option>
                <option value='Creative Commons'>Creative Commons</option>
                <option value='Open Access'>Open Access</option>
              </select>
            </div>

            {/* Publication Date* */}
            <div>
              <label className='block mb-6 text-2xl'>Publication Date*</label>
              <input
                name='date'
                type='date'
                value={formData.date}
                onChange={handleChange}
                // 💡 REQUIRED
                required
                className='w-full px-9 h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none text-white/40'
              />
            </div>

            {/* Github Repository (Optional) - Name is now 'github' */}
            <div>
              <label className='block mb-6 text-2xl'>Github Repository (Optional)</label>
              <input
                name='github' // Corrected name to 'github'
                type='text'
                value={formData.github}
                onChange={handleChange}
                placeholder='https://github.com/...'
                className='w-full px-9 h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none'
              />
            </div>

            {/* DOI (optional) */}
            <div>
              <label className='block mb-6 text-2xl'>
                DOI (optional) <span className='text-[16px]'> e.g. 10.3390/ijerph191610448</span>
              </label>
              <input
                name='doi'
                type='text'
                value={formData.doi}
                onChange={handleChange}
                placeholder='Enter DOI link'
                className='w-full px-9 h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none'
              />
            </div>

            {/* Supplementary Materials (Optional) */}
            <div>
              <label className='block mb-6 text-2xl'>Supplementary Materials (Optional)</label>
              <input
                name='supplementaryMaterials'
                type='text'
                value={formData.supplementaryMaterials}
                onChange={handleChange}
                placeholder='Link to supplementary material'
                className='w-full px-9 h-[66px] bg-[#1A1616]/40 border border-white/20 rounded-lg outline-none'
              />
            </div>

            {/* Info Box */}
            <div className='bg-[#8330ED]/8 w-full h-[100px] rounded-[8px] text-[12px] flex items-center px-[32px]'>
              <span className='text-purple-700'>Estimated time:</span> ~5 minutes to complete the upload process. Your paper will be stored on IPFS and
              referenced on the blockchain.
            </div>

            {/* Action Buttons */}
            <div className='flex justify-center gap-[100px] w-[900px] h-[59px]'>
              <button
                type='button'
                className='px-[165px] py-[16px] rounded-[40px] bg-gray-700 hover:bg-gray-600 max-lg:w-[400px] cursor-pointer'
              >
                Cancel
              </button>
              <button
                type='submit' // This will trigger the handleFormSubmit function
                className='px-[140px] py-[16px] rounded-[40px] bg-orange-500 hover:bg-orange-600 max-lg:w-[400px] text-[16px] cursor-pointer'
              >
                Preview & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}