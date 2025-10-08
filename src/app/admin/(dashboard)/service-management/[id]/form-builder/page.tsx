/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useUpdateServiceFormMutation,
  useGetServiceByIdQuery,
} from "@/api/servicesApi";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Save, ArrowLeft, Loader2, GripVertical } from "lucide-react";

// Define the shape of a form field
interface FormField {
  id: string;
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio" | "file" | "date";
  required: boolean;
  fromUser: boolean;
  step: number;
  groupName: string;
  options?: string[];
}

// A constant for the common user profile fields with updated generic naming
const USER_PROFILE_FIELDS: FormField[] = [
  {
    id: uuidv4(),
    name: "user_name", // Changed from org_name
    label: "Name",
    type: "text",
    required: true,
    fromUser: true,
    step: 1,
    groupName: "User Details",
  },
  {
    id: uuidv4(),
    name: "user_address",
    label: "Address",
    type: "text",
    required: true,
    fromUser: true,
    step: 1,
    groupName: "User Details",
  },
  {
    id: uuidv4(),
    name: "user_phone",
    label: "Phone No",
    type: "text",
    required: true,
    fromUser: true,
    step: 1,
    groupName: "User Details",
  },
  {
    id: uuidv4(),
    name: "user_email",
    label: "Email",
    type: "text",
    required: true,
    fromUser: true,
    step: 1,
    groupName: "User Details",
  },
];

export default function FormBuilderPage({ params }: any) {
  const router = useRouter();
  const { id: serviceId } = params;

  // --- API HOOKS ---
  const [fields, setFields] = useState<FormField[]>([]);
  const [updateServiceForm, { isLoading: isSaving }] =
    useUpdateServiceFormMutation();

  // Fetch the service data, including any existing form
  const {
    data: specificService,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useGetServiceByIdQuery(serviceId);

  // --- EFFECT TO POPULATE FORM ---
  useEffect(() => {
    // Check if data is loaded and if there are existing form fields
    if (specificService?.data?.form?.formFields?.length > 0) {
      setFields(specificService.data.form.formFields);
    }
  }, [specificService]); // Dependency array ensures this runs when data arrives

  // --- FIELD HANDLERS ---
  const addField = () => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        name: "",
        label: "",
        type: "text",
        required: false,
        fromUser: false,
        step: 1,
        groupName: "User Details",
      },
    ]);
  };

  const addProfileBlock = () => {
    const existingNames = new Set(fields.map((f) => f.name));
    const fieldsToAdd = USER_PROFILE_FIELDS.filter(
      (pf) => !existingNames.has(pf.name)
    );
    setFields([...fields, ...fieldsToAdd]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, prop: keyof FormField, value: any) => {
    if (prop === "options") {
      const optionsArray =
        typeof value === "string" ? value.split(",").map((s) => s.trim()) : [];
      setFields(
        fields.map((field) =>
          field.id === id ? { ...field, options: optionsArray } : field
        )
      );
    } else {
      setFields(
        fields.map((field) =>
          field.id === id ? { ...field, [prop]: value } : field
        )
      );
    }
  };

  // --- SAVE HANDLER ---
  const handleSaveForm = async () => {
    const toastId = toast.loading("Saving request form...");
    try {
      for (const field of fields) {
        if (!field.label.trim() || !field.name.trim()) {
          throw new Error(
            "All fields must have a Label and a unique Name attribute."
          );
        }
      }
      await updateServiceForm({ serviceId, formFields: fields }).unwrap();
      toast.success("Form saved successfully!", { id: toastId });
      router.push("/admin/service-management");
    } catch (err) {
      console.error("Failed to save form:", err);
      const errorMessage =
        (err as any)?.data?.message ||
        (err as Error).message ||
        "An unexpected error occurred.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  // --- RENDER LOGIC ---

  // Show a loading state while fetching initial data
  if (isServiceLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show an error message if fetching fails
  if (serviceError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading service form data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Service Request Form Builder</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/service-management")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Build the Form</CardTitle>
          <div className="flex gap-2 pt-4">
            <Button onClick={addField}>
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Field
            </Button>
            <Button variant="secondary" onClick={addProfileBlock}>
              <Plus className="h-4 w-4 mr-2" />
              Add User Profile Block
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="p-4 border rounded-lg flex items-start gap-4"
            >
              <GripVertical className="mt-8 text-gray-400 cursor-grab" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                <div>
                  <Label>Field Label</Label>
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, "label", e.target.value)
                    }
                    placeholder="e.g., Your Company Website"
                  />
                </div>
                <div>
                  <Label>Field Name Attribute</Label>
                  <Input
                    value={field.name}
                    onChange={(e) =>
                      updateField(
                        field.id,
                        "name",
                        e.target.value.toLowerCase().replace(/\s+/g, "_")
                      )
                    }
                    placeholder="e.g., company_website (no spaces)"
                  />
                </div>
                <div>
                  <Label>Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateField(field.id, "type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="radio">Yes/No</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Group Name</Label>
                  <Input
                    value={field.groupName}
                    onChange={(e) =>
                      updateField(field.id, "groupName", e.target.value)
                    }
                    placeholder="e.g., User Details"
                  />
                </div>
                <div>
                  <Label>Step Number</Label>
                  <Input
                    type="number"
                    value={field.step}
                    min="1"
                    onChange={(e) =>
                      updateField(
                        field.id,
                        "step",
                        parseInt(e.target.value, 10) || 1
                      )
                    }
                  />
                </div>
                {field.type === "select" && (
                  <div>
                    <Label>Dropdown Options</Label>
                    <Input
                      value={field.options?.join(", ") || ""}
                      onChange={(e) =>
                        updateField(field.id, "options", e.target.value)
                      }
                      placeholder="e.g., Option A, Option B, Option C"
                    />
                  </div>
                )}

                <div className="flex items-center pt-8 gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        updateField(field.id, "required", checked)
                      }
                    />
                    <Label>Required</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(field.id)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSaveForm}
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving Form...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save and Finish
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
