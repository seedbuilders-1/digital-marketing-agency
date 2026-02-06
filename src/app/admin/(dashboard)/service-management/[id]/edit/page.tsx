/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Plus, X, Loader2, GripVertical } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { VideoUpload } from "@/components/VideoUpload";

// API Hooks
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/api/servicesApi";

// --- Type Definitions ---
interface Feature {
  id: string;
  text: string;
}
interface Plan {
  id: string;
  name: string;
  price: string;
  priceUnit: string;
  audience: string;
  discountPercentage: number; // 0-100, percentage off
  features: Feature[];
}
interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  bannerImageFile: File | null;
  bannerImageUrl?: string | null;
  challenge: string;
  challengeImageFile: File | null;
  challengeImageUrl?: string | null;
  solution: string;
  solutionImageFile: File | null;
  solutionImageUrl?: string | null;
  result: string;
  resultImageFile: File | null;
  resultImageUrl?: string | null;
}
interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  stars: number;
  authorImageFile: File | null;
  authorImageUrl?: string | null;
  link?: string; // Optional link
}
interface Faq {
  id: string;
  question: string;
  answer: string;
}

// --- Draggable Plan Sub-Component (Wrapped in React.memo for performance) ---
const SortablePlan = memo(
  ({
    plan,
    planIndex,
    removeArrayItem,
    handleArrayItemChange,
    handleNestedArrayChange,
    addNestedArrayItem,
    removeNestedArrayItem,
  }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: plan.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-4 border rounded-lg space-y-4 relative bg-white shadow-sm"
      >
        <div
          {...attributes}
          {...listeners}
          className="absolute top-1/2 -left-8 -translate-y-1/2 text-gray-400 cursor-grab active:cursor-grabbing p-2"
        >
          <GripVertical />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 text-gray-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => removeArrayItem("plans", planIndex)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Plan Name</Label>
            <Input
              value={plan.name}
              onChange={(e) =>
                handleArrayItemChange(
                  "plans",
                  planIndex,
                  "name",
                  e.target.value,
                )
              }
            />
          </div>
          <div>
            <Label>Audience</Label>
            <Input
              value={plan.audience}
              onChange={(e) =>
                handleArrayItemChange(
                  "plans",
                  planIndex,
                  "audience",
                  e.target.value,
                )
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={plan.price}
              onChange={(e) =>
                handleArrayItemChange(
                  "plans",
                  planIndex,
                  "price",
                  e.target.value,
                )
              }
            />
          </div>
          <div>
            <Label>Price Unit</Label>
            <Input
              value={plan.priceUnit}
              onChange={(e) =>
                handleArrayItemChange(
                  "plans",
                  planIndex,
                  "priceUnit",
                  e.target.value,
                )
              }
            />
          </div>
          <div>
            <Label>Discount %</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={plan.discountPercentage}
              onChange={(e) =>
                handleArrayItemChange(
                  "plans",
                  planIndex,
                  "discountPercentage",
                  parseInt(e.target.value) || 0,
                )
              }
              placeholder="50"
            />
          </div>
        </div>
        <div>
          <Label>Features</Label>
          <div className="space-y-2 mt-2">
            {plan.features.map((feature: Feature, featureIndex: number) => (
              <div key={feature.id} className="flex items-center gap-2">
                <Input
                  value={feature.text}
                  onChange={(e) =>
                    handleNestedArrayChange(
                      planIndex,
                      featureIndex,
                      e.target.value,
                    )
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => removeNestedArrayItem(planIndex, featureIndex)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addNestedArrayItem(planIndex)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
SortablePlan.displayName = "SortablePlan";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const {
    data: specificService,
    error: serviceError,
    isLoading: isServiceLoading,
  } = useGetServiceByIdQuery(serviceId);
  const [updateService, { isLoading: isUpdatingService }] =
    useUpdateServiceMutation();

  const [formData, setFormData] = useState({
    title: "",
    visibility: true,
    heroSection: {
      headline: "",
      paragraph: "",
      imageFile: null as File | null,
      imageUrl: null as string | null,
    },
    blueprintSection: {
      headline: "",
      paragraph: "",
      imageFile: null as File | null,
      imageUrl: null as string | null,
    },
    bannerText: "",
    plans: [] as Plan[],
    caseStudies: [] as CaseStudy[],
    testimonials: [] as Testimonial[],
    faqs: [] as Faq[],
    onboardingVideoFile: null as File | null,
    onboardingVideoUrl: null as string | null,
  });

  const initialFormData = useMemo(() => {
    if (!specificService?.data) return null;
    const service = specificService.data;
    return {
      title: service.title || "",
      visibility: service.isPublic,
      heroSection: {
        headline: service.heroHeadline || "",
        paragraph: service.heroParagraph || "",
        imageFile: null,
        imageUrl: service.heroImageUrl || null,
      },
      blueprintSection: {
        headline: service.blueprintHeadline || "",
        paragraph: service.blueprintParagraph || "",
        imageFile: null,
        imageUrl: service.blueprintImageUrl || null,
      },
      onboardingVideoFile: null,
      onboardingVideoUrl: service.onboardingVideoUrl || null,
      bannerText: service.bannerText || "",
      plans:
        service.plans?.map((p: any, planIndex: number) => ({
          ...p,
          features: (typeof p.features === "string"
            ? JSON.parse(p.features || "[]")
            : p.features || []
          ).map((featureText: string, featureIndex: number) => ({
            id: `feature_${p.id || planIndex}_${featureIndex}`,
            text: featureText,
          })),
        })) || [],
      caseStudies:
        service.caseStudies?.map((cs: any) => ({
          ...cs,
          bannerImageFile: null,
          challengeImageFile: null,
          solutionImageFile: null,
          resultImageFile: null,
        })) || [],
      testimonials:
        service.testimonials?.map((ts: any) => ({
          ...ts,
          authorImageFile: null,
        })) || [],
      faqs: service.faqs || [],
    };
  }, [specificService]);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.plans.findIndex((p) => p.id === active.id);
        const newIndex = prev.plans.findIndex((p) => p.id === over.id);
        return { ...prev, plans: arrayMove(prev.plans, oldIndex, newIndex) };
      });
    }
  }

  // --- IMMUTABLE STATE HANDLERS ---
  const handleInputChange = (field: string, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  const handleFileChange = (
    section: "heroSection" | "blueprintSection",
    file: File | null,
  ) =>
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], imageFile: file },
    }));
  const handleSectionChange = (
    section: "heroSection" | "blueprintSection",
    field: string,
    value: string,
  ) =>
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));

  const handleVideoChange = (file: File | null) =>
    setFormData((prev) => ({ ...prev, onboardingVideoFile: file }));

  const addArrayItem = <T extends { id: string }>(
    field: keyof typeof formData,
    newItem: Omit<T, "id">,
  ) => {
    const itemWithId = { ...newItem, id: `new_${Date.now()}` } as T;
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any), itemWithId],
    }));
  };

  const removeArrayItem = <T,>(field: keyof typeof formData, index: number) =>
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as T[]).filter((_, i) => i !== index),
    }));

  const handleArrayItemChange = <T,>(
    field: keyof typeof formData,
    index: number,
    itemField: keyof T,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as T[]).map((item, i) =>
        i === index ? { ...item, [itemField]: value } : item,
      ),
    }));
  };

  const handleNestedArrayChange = (
    planIndex: number,
    featureIndex: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, pIndex) => {
        if (pIndex === planIndex) {
          return {
            ...plan,
            features: plan.features.map((feature, fIndex) =>
              fIndex === featureIndex ? { ...feature, text: value } : feature,
            ),
          };
        }
        return plan;
      }),
    }));
  };

  const addNestedArrayItem = (planIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, pIndex) => {
        if (pIndex === planIndex) {
          return {
            ...plan,
            features: [
              ...plan.features,
              { id: `new_feature_${Date.now()}`, text: "" },
            ],
          };
        }
        return plan;
      }),
    }));
  };

  const removeNestedArrayItem = (planIndex: number, featureIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, pIndex) => {
        if (pIndex === planIndex) {
          return {
            ...plan,
            features: plan.features.filter(
              (_, fIndex) => fIndex !== featureIndex,
            ),
          };
        }
        return plan;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating service...");
    const submissionData = new FormData();

    submissionData.append("title", formData.title);
    submissionData.append("isPublic", String(formData.visibility));
    submissionData.append("bannerText", formData.bannerText);
    submissionData.append("heroHeadline", formData.heroSection.headline);
    submissionData.append("heroParagraph", formData.heroSection.paragraph);
    submissionData.append(
      "blueprintHeadline",
      formData.blueprintSection.headline,
    );
    submissionData.append(
      "blueprintParagraph",
      formData.blueprintSection.paragraph,
    );
    submissionData.append(
      "plans",
      JSON.stringify(
        formData.plans.map((p) => ({
          ...p,
          features: p.features.map((f) => f.text),
        })),
      ),
    );
    submissionData.append("faqs", JSON.stringify(formData.faqs));
    submissionData.append(
      "caseStudies",
      JSON.stringify(
        formData.caseStudies.map(
          ({
            bannerImageFile,
            challengeImageFile,
            solutionImageFile,
            resultImageFile,
            ...rest
          }) => rest,
        ),
      ),
    );
    submissionData.append(
      "testimonials",
      JSON.stringify(
        formData.testimonials.map(({ authorImageFile, ...rest }) => rest),
      ),
    );

    if (formData.heroSection.imageFile)
      submissionData.append("heroImage", formData.heroSection.imageFile);
    if (formData.blueprintSection.imageFile)
      submissionData.append(
        "blueprintImage",
        formData.blueprintSection.imageFile,
      );
    if (formData.onboardingVideoFile) {
      submissionData.append("onboardingVideo", formData.onboardingVideoFile);
    }
    formData.caseStudies.forEach((cs, index) => {
      if (cs.bannerImageFile)
        submissionData.append(
          `caseStudy_${index}_bannerImage`,
          cs.bannerImageFile,
        );
      if (cs.challengeImageFile)
        submissionData.append(
          `caseStudy_${index}_challengeImage`,
          cs.challengeImageFile,
        );
      if (cs.solutionImageFile)
        submissionData.append(
          `caseStudy_${index}_solutionImage`,
          cs.solutionImageFile,
        );
      if (cs.resultImageFile)
        submissionData.append(
          `caseStudy_${index}_resultImage`,
          cs.resultImageFile,
        );
    });
    formData.testimonials.forEach((ts, index) => {
      if (ts.authorImageFile)
        submissionData.append(
          `testimonial_${index}_authorImage`,
          ts.authorImageFile,
        );
    });

    try {
      await updateService({ serviceId, data: submissionData }).unwrap();
      toast.success("Service updated successfully!", { id: toastId });
      router.push("/admin/service-management");
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  if (isServiceLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  if (serviceError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading service data.
      </div>
    );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-between">
        <Link href="/admin/service-management">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Service Management
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Edit Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={isUpdatingService} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="serviceTitle">Service Title *</Label>
                <Input
                  id="serviceTitle"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="visibility"
                  checked={formData.visibility}
                  onCheckedChange={(checked) =>
                    handleInputChange("visibility", checked)
                  }
                />
                <Label htmlFor="visibility">Service is Publicly Visible</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Headline</Label>
              <Input
                value={formData.heroSection.headline}
                onChange={(e) =>
                  handleSectionChange("heroSection", "headline", e.target.value)
                }
              />
              <Label>Paragraph</Label>
              <Textarea
                value={formData.heroSection.paragraph}
                onChange={(e) =>
                  handleSectionChange(
                    "heroSection",
                    "paragraph",
                    e.target.value,
                  )
                }
              />
              <Label>Image</Label>
              <ImageUpload
                file={formData.heroSection.imageFile}
                onFileChange={(file) => handleFileChange("heroSection", file)}
                previewUrl={formData.heroSection.imageUrl}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blueprint Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Headline</Label>
              <Input
                value={formData.blueprintSection.headline}
                onChange={(e) =>
                  handleSectionChange(
                    "blueprintSection",
                    "headline",
                    e.target.value,
                  )
                }
              />
              <Label>Paragraph</Label>
              <Textarea
                value={formData.blueprintSection.paragraph}
                onChange={(e) =>
                  handleSectionChange(
                    "blueprintSection",
                    "paragraph",
                    e.target.value,
                  )
                }
              />
              <Label>Image</Label>
              <ImageUpload
                file={formData.blueprintSection.imageFile}
                onFileChange={(file) =>
                  handleFileChange("blueprintSection", file)
                }
                previewUrl={formData.blueprintSection.imageUrl}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Onboarding Video (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <VideoUpload
                file={formData.onboardingVideoFile}
                onFileChange={handleVideoChange}
                previewUrl={formData.onboardingVideoUrl}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CTA Banner</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Banner Text</Label>
              <Input
                value={formData.bannerText}
                onChange={(e) =>
                  handleInputChange("bannerText", e.target.value)
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formData.plans.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4 pl-8">
                    {formData.plans.map((plan, planIndex) => (
                      <SortablePlan
                        key={plan.id}
                        plan={plan}
                        planIndex={planIndex}
                        removeArrayItem={removeArrayItem}
                        handleArrayItemChange={handleArrayItemChange}
                        handleNestedArrayChange={handleNestedArrayChange}
                        addNestedArrayItem={addNestedArrayItem}
                        removeNestedArrayItem={removeNestedArrayItem}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  addArrayItem("plans", {
                    name: "",
                    price: "",
                    priceUnit: "/month",
                    audience: "",
                    discountPercentage: 50, // Default 50% off
                    features: [],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Studies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.caseStudies.map((cs, index) => (
                <div
                  key={cs.id || `cs_${index}`}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeArrayItem("caseStudies", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Label>Title</Label>
                  <Input
                    value={cs.title}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Subtitle</Label>
                  <Input
                    value={cs.subtitle}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "subtitle",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Banner Image</Label>
                  <ImageUpload
                    file={cs.bannerImageFile}
                    onFileChange={(file) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "bannerImageFile",
                        file,
                      )
                    }
                    previewUrl={cs.bannerImageUrl}
                  />
                  <Label>Challenge Text</Label>
                  <Textarea
                    value={cs.challenge}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "challenge",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Challenge Image</Label>
                  <ImageUpload
                    file={cs.challengeImageFile}
                    onFileChange={(file) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "challengeImageFile",
                        file,
                      )
                    }
                    previewUrl={cs.challengeImageUrl}
                  />
                  <Label>Solution Text</Label>
                  <Textarea
                    value={cs.solution}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "solution",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Solution Image</Label>
                  <ImageUpload
                    file={cs.solutionImageFile}
                    onFileChange={(file) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "solutionImageFile",
                        file,
                      )
                    }
                    previewUrl={cs.solutionImageUrl}
                  />
                  <Label>Result Text</Label>
                  <Textarea
                    value={cs.result}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "result",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Result Image</Label>
                  <ImageUpload
                    file={cs.resultImageFile}
                    onFileChange={(file) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "resultImageFile",
                        file,
                      )
                    }
                    previewUrl={cs.resultImageUrl}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  addArrayItem("caseStudies", {
                    title: "",
                    subtitle: "",
                    bannerImageFile: null,
                    challenge: "",
                    challengeImageFile: null,
                    solution: "",
                    solutionImageFile: null,
                    result: "",
                    resultImageFile: null,
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Case Study
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.testimonials.map((ts, index) => (
                <div
                  key={ts.id || `ts_${index}`}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeArrayItem("testimonials", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Label>Quote</Label>
                  <Textarea
                    value={ts.quote}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "testimonials",
                        index,
                        "quote",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Author Name</Label>
                  <Input
                    value={ts.authorName}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "testimonials",
                        index,
                        "authorName",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Author Title/Company</Label>
                  <Input
                    value={ts.authorTitle}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "testimonials",
                        index,
                        "authorTitle",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Star Rating (1-5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={ts.stars}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "testimonials",
                        index,
                        "stars",
                        Number(e.target.value),
                      )
                    }
                  />
                  <Label>Author Image</Label>
                  <ImageUpload
                    file={ts.authorImageFile}
                    onFileChange={(file) =>
                      handleArrayItemChange(
                        "testimonials",
                        index,
                        "authorImageFile",
                        file,
                      )
                    }
                    previewUrl={ts.authorImageUrl}
                  />
                  <Label>Link (Optional)</Label>
                  <Input
                    placeholder="https://..."
                    value={ts.link || ""}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "testimonials",
                        index,
                        "link",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  addArrayItem("testimonials", {
                    quote: "",
                    authorName: "",
                    authorTitle: "",
                    stars: 5,
                    authorTitle: "",
                    stars: 5,
                    authorImageFile: null,
                    link: "",
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div
                  key={faq.id || `faq_${index}`}
                  className="p-4 border rounded-lg space-y-2 relative"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeArrayItem("faqs", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Label>Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "faqs",
                        index,
                        "question",
                        e.target.value,
                      )
                    }
                  />
                  <Label>Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "faqs",
                        index,
                        "answer",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  addArrayItem("faqs", { question: "", answer: "" })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/admin/service-management">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Link href={`/admin/service-management/${serviceId}/form-builder`}>
              <Button type="button" variant="outline">
                Skip and Go to Form Builder
              </Button>
            </Link>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isUpdatingService ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
