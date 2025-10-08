/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useCreateServiceMutation } from "@/api/servicesApi";

// --- Type Definitions for our complex form state ---
interface Plan {
  name: string;
  price: string;
  priceUnit: string;
  audience: string;
  features: string[];
}
interface CaseStudy {
  title: string;
  subtitle: string;
  bannerImageFile: File | null;
  challenge: string;
  challengeImageFile: File | null;
  solution: string;
  solutionImageFile: File | null;
  result: string;
  resultImageFile: File | null;
}
interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  stars: number;
  authorImageFile: File | null;
}
interface Faq {
  question: string;
  answer: string;
}

// --- NEW Draggable Plan Sub-Component ---
// This component renders a single, draggable pricing plan form.
const SortablePlan = ({
  plan,
  planIndex,
  removeArrayItem,
  handleArrayItemChange,
  handleNestedArrayChange,
  addNestedArrayItem,
  removeNestedArrayItem,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: plan.name + planIndex }); // A unique ID for dnd-kit

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
      {/* Drag Handle: This is the element you grab to reorder */}
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
              handleArrayItemChange("plans", planIndex, "name", e.target.value)
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
                e.target.value
              )
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            value={plan.price}
            onChange={(e) =>
              handleArrayItemChange("plans", planIndex, "price", e.target.value)
            }
          />
        </div>
        <div>
          <Label>Price Unit (e.g., /month)</Label>
          <Input
            value={plan.priceUnit}
            onChange={(e) =>
              handleArrayItemChange(
                "plans",
                planIndex,
                "priceUnit",
                e.target.value
              )
            }
          />
        </div>
      </div>
      <div>
        <Label>Features</Label>
        <div className="space-y-2 mt-2">
          {plan.features.map((feature: string, featureIndex: number) => (
            <div key={featureIndex} className="flex items-center gap-2">
              <Input
                value={feature}
                onChange={(e) =>
                  handleNestedArrayChange(
                    planIndex,
                    featureIndex,
                    e.target.value
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
};

export default function CreateServicePage() {
  const router = useRouter();
  const [createService, { isLoading: isCreatingService }] =
    useCreateServiceMutation();

  const [formData, setFormData] = useState({
    title: "",
    visibility: true,
    heroSection: {
      headline: "",
      paragraph: "",
      imageFile: null as File | null,
    },
    blueprintSection: {
      headline: "",
      paragraph: "",
      imageFile: null as File | null,
    },
    bannerText: "",
    plans: [] as Plan[],
    caseStudies: [] as CaseStudy[],
    testimonials: [] as Testimonial[],
    faqs: [] as Faq[],
  });

  // --- Drag and Drop Setup for Plans ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.plans.findIndex(
          (p, i) => p.name + i === active.id
        );
        const newIndex = prev.plans.findIndex((p, i) => p.name + i === over.id);
        // Use the arrayMove utility from dnd-kit to update the state
        return { ...prev, plans: arrayMove(prev.plans, oldIndex, newIndex) };
      });
    }
  }

  // --- All other state handlers remain unchanged ---
  const handleInputChange = (field: string, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  const handleFileChange = (
    section: "heroSection" | "blueprintSection",
    file: File | null
  ) =>
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], imageFile: file },
    }));
  const handleSectionChange = (
    section: "heroSection" | "blueprintSection",
    field: string,
    value: string
  ) =>
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  const addArrayItem = <T,>(field: keyof typeof formData, newItem: T) =>
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as T[]), newItem],
    }));
  const removeArrayItem = <T,>(field: keyof typeof formData, index: number) =>
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as T[]).filter((_, i) => i !== index),
    }));
  const handleArrayItemChange = <T,>(
    field: keyof typeof formData,
    index: number,
    itemField: keyof T,
    value: any
  ) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] as T[])];
      newArray[index] = { ...newArray[index], [itemField]: value };
      return { ...prev, [field]: newArray };
    });
  };
  const handleNestedArrayChange = (
    planIndex: number,
    featureIndex: number,
    value: string
  ) => {
    const newPlans = [...formData.plans];
    newPlans[planIndex].features[featureIndex] = value;
    setFormData((prev) => ({ ...prev, plans: newPlans }));
  };
  const addNestedArrayItem = (planIndex: number) => {
    const newPlans = [...formData.plans];
    newPlans[planIndex].features.push("");
    setFormData((prev) => ({ ...prev, plans: newPlans }));
  };
  const removeNestedArrayItem = (planIndex: number, featureIndex: number) => {
    const newPlans = [...formData.plans];
    newPlans[planIndex].features = newPlans[planIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    setFormData((prev) => ({ ...prev, plans: newPlans }));
  };

  // --- Form Submission (unchanged) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Creating new service...");
    const submissionData = new FormData();
    // Append all fields just like in the create function
    submissionData.append("title", formData.title);
    submissionData.append("isPublic", String(formData.visibility));
    submissionData.append("bannerText", formData.bannerText);
    submissionData.append("heroHeadline", formData.heroSection.headline);
    submissionData.append("heroParagraph", formData.heroSection.paragraph);
    submissionData.append(
      "blueprintHeadline",
      formData.blueprintSection.headline
    );
    submissionData.append(
      "blueprintParagraph",
      formData.blueprintSection.paragraph
    );

    formData.plans.forEach((plan, index) => {
      submissionData.append(`plans[${index}][name]`, plan.name);
      submissionData.append(`plans[${index}][price]`, plan.price);
      submissionData.append(`plans[${index}][priceUnit]`, plan.priceUnit);
      submissionData.append(`plans[${index}][audience]`, plan.audience);
      submissionData.append(
        `plans[${index}][features]`,
        JSON.stringify(plan.features)
      );
    });

    formData.faqs.forEach((faq, index) => {
      submissionData.append(`faqs[${index}][question]`, faq.question);
      submissionData.append(`faqs[${index}][answer]`, faq.answer);
    });

    formData.caseStudies.forEach((cs, index) => {
      submissionData.append(`caseStudies[${index}][title]`, cs.title);
      submissionData.append(`caseStudies[${index}][subtitle]`, cs.subtitle);
      submissionData.append(`caseStudies[${index}][challenge]`, cs.challenge);
      submissionData.append(`caseStudies[${index}][solution]`, cs.solution);
      submissionData.append(`caseStudies[${index}][result]`, cs.result);
    });

    formData.testimonials.forEach((ts, index) => {
      submissionData.append(`testimonials[${index}][quote]`, ts.quote);
      submissionData.append(
        `testimonials[${index}][authorName]`,
        ts.authorName
      );
      submissionData.append(
        `testimonials[${index}][authorTitle]`,
        ts.authorTitle
      );
      submissionData.append(`testimonials[${index}][stars]`, String(ts.stars));
    });

    // Append new files if they have been selected
    if (formData.heroSection.imageFile) {
      submissionData.append("heroImage", formData.heroSection.imageFile);
    }
    if (formData.blueprintSection.imageFile) {
      submissionData.append(
        "blueprintImage",
        formData.blueprintSection.imageFile
      );
    }

    formData.caseStudies.forEach((cs, index) => {
      if (cs.bannerImageFile)
        submissionData.append(
          `caseStudy_${index}_bannerImage`,
          cs.bannerImageFile
        );
      if (cs.challengeImageFile)
        submissionData.append(
          `caseStudy_${index}_challengeImage`,
          cs.challengeImageFile
        );
      if (cs.solutionImageFile)
        submissionData.append(
          `caseStudy_${index}_solutionImage`,
          cs.solutionImageFile
        );
      if (cs.resultImageFile)
        submissionData.append(
          `caseStudy_${index}_resultImage`,
          cs.resultImageFile
        );
    });

    formData.testimonials.forEach((ts, index) => {
      if (ts.authorImageFile)
        submissionData.append(
          `testimonial_${index}_authorImage`,
          ts.authorImageFile
        );
    });

    try {
      const res = await createService(submissionData).unwrap();
      const newServiceId = res.data.service.id;
      toast.success("Step 1 Complete! Redirecting...", { id: toastId });
      router.push(`/admin/service-management/${newServiceId}/form-builder`);
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage, { id: toastId });
    }
  };

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
        <h1 className="text-2xl font-semibold">Create New Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={isCreatingService} className="space-y-6">
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
                    e.target.value
                  )
                }
              />
              <Label>Image</Label>
              <ImageUpload
                file={formData.heroSection.imageFile}
                onFileChange={(file) => handleFileChange("heroSection", file)}
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
                    e.target.value
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
                    e.target.value
                  )
                }
              />
              <Label>Image</Label>
              <ImageUpload
                file={formData.blueprintSection.imageFile}
                onFileChange={(file) =>
                  handleFileChange("blueprintSection", file)
                }
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
              {/* --- DND-KIT IMPLEMENTATION --- */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formData.plans.map((p, i) => p.name + i)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4 pl-8">
                    {" "}
                    {/* Added padding for the drag handle */}
                    {formData.plans.map((plan, planIndex) => (
                      <SortablePlan
                        key={plan.name + planIndex}
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
                    features: [""],
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
                  key={index}
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
                        e.target.value
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
                        e.target.value
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
                        file
                      )
                    }
                  />
                  <Label>Challenge Text</Label>
                  <Textarea
                    value={cs.challenge}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "challenge",
                        e.target.value
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
                        file
                      )
                    }
                  />
                  <Label>Solution Text</Label>
                  <Textarea
                    value={cs.solution}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "solution",
                        e.target.value
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
                        file
                      )
                    }
                  />
                  <Label>Result Text</Label>
                  <Textarea
                    value={cs.result}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "caseStudies",
                        index,
                        "result",
                        e.target.value
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
                        file
                      )
                    }
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
                  key={index}
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
                        e.target.value
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
                        e.target.value
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
                        e.target.value
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
                        Number(e.target.value)
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
                        file
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
                    authorImageFile: null,
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
                  key={index}
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
                        e.target.value
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
                        e.target.value
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
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isCreatingService ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save & Continue
                </>
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
