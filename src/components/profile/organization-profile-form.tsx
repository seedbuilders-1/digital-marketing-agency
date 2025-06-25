"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, X } from "lucide-react"

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadArea } from "@/components/ui/upload-area"

// Types and Schemas
import { organizationProfileSchema, type OrganizationProfileFormData } from "@/lib/schemas/profile"

// Constants and Utils
import { getOrganizationProfileDefaultValues } from "@/lib/utils/form"
import { ORGANIZATION_OPTIONS } from "@/lib/constants/organization"

const OrganizationProfileForm = () => {
  const [organizationProfileImage, setOrganizationProfileImage] = useState<string | null>(null)
  const [documents, setDocuments] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<OrganizationProfileFormData>({
    resolver: zodResolver(organizationProfileSchema),
    defaultValues: getOrganizationProfileDefaultValues(),
  })

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)
      setOrganizationProfileImage(imageUrl)
      console.log("Organization profile image uploaded")
    }
  }

  const handleDocumentUpload = (documentUrl: string) => {
    setDocuments((prev) => [...prev, documentUrl])
    console.log("Organization document uploaded")
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const isFormComplete = () => {
    const formData = form.getValues()
    return (
      formData.organizationName &&
      formData.address &&
      formData.country &&
      formData.organizationType &&
      formData.industry &&
      formData.rcNumber &&
      formData.staffSize &&
      documents.length > 0
    )
  }

  const onSubmit = (data: OrganizationProfileFormData) => {
    if (isFormComplete()) {
      const completeOrganizationData = {
        ...data,
        profilePicture: organizationProfileImage,
        documents,
      }
      console.log("Organization profile data submitted:", completeOrganizationData)
      router.push("/contact-person-profile")
    }
  }

  const handleSkip = () => {
    console.log("Organization profile registration skipped")
    router.push("/")
  }

  return (
    <div className="w-full max-w-[500px] font-['Sora']">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#7642FE] mb-2 font-['Sora'] leading-10 tracking-[-0.15px] max-w-[275px]">
          Organization Profile
        </h1>
        <p className="text-base text-[#6B7280] mb-8 font-['Sora']">
          Complete the KYC registration for your organization
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Profile Picture Section */}
          <div className="mb-6">
            <h3 className="text-base font-normal text-[#1F2937] mb-4 font-['Sora']">Upload Your Profile Picture</h3>
            <div className="flex flex-col items-start">
              <div className="relative w-[120px] h-[120px] rounded-full border-2 border-dashed border-[#D1D5DB] flex items-center justify-center cursor-pointer overflow-hidden bg-[#F9FAFB] md:w-[100px] md:h-[100px]">
                {organizationProfileImage ? (
                  <img
                    src={organizationProfileImage || "/placeholder.svg"}
                    alt="Organization Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Camera size={32} className="text-[#6B7280]" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">Organization Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] focus:outline-none focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">
                  Organization Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] focus:outline-none focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] bg-white focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">Organization Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] bg-white focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">
                  Organization Industry/Sector
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] bg-white focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rcNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">
                  Organization RC Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] focus:outline-none focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="staffSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">
                  Organization Staff Size
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border border-[#D1D5DB] rounded-lg text-base font-['Sora'] bg-white focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.STAFF_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          {/* Document Upload Section */}
          <div className="mb-8">
            <h3 className="text-base font-normal text-[#1F2937] mb-4 font-['Sora']">
              Upload Valid Organization Documents
            </h3>
            <p className="text-sm text-[#6B7280] mb-2 leading-[1.4] font-['Sora']">
              e.g. Certificate of Incorporation, Memorandum of Association, Proof of Business Address, Company Status
              Report
            </p>
            <p className="text-sm text-[#6B7280] mb-4 leading-[1.4] font-['Sora']">
              Upload multiple high quality images for better results
            </p>

            <UploadArea onImageUpload={handleDocumentUpload} />

            {documents.length > 0 && (
              <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-2.5">
                {documents.map((doc, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={doc || "/placeholder.svg"}
                      alt={`Document ${index + 1}`}
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isFormComplete()}
            className="bg-[#7642fe] text-white border-none rounded-lg px-6 py-3 text-base font-medium cursor-pointer transition-colors duration-200 font-['Sora'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
          >
            Continue
          </Button>

          <button
            type="button"
            onClick={handleSkip}
            className="bg-none border-none text-[#7642FE] text-sm cursor-pointer underline mt-4 font-['Sora'] hover:text-[#5f35cc]"
          >
            Skip
          </button>
        </form>
      </Form>
    </div>
  )
}

export default OrganizationProfileForm
