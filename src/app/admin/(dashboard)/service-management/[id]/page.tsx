"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Edit, Trash2, Save, X, Plus } from "lucide-react";
import Link from "next/link";

const mockService = {
  id: "000001",
  name: "Digital Marketing Audit",
  description:
    "Comprehensive analysis of your digital marketing efforts including SEO, social media, content marketing, and paid advertising performance.",
  price: "₦50,000",
  duration: "2-3 weeks",
  visibility: "Public",
  category: "Marketing",
  features: [
    "SEO Analysis",
    "Social Media Audit",
    "Content Review",
    "Competitor Analysis",
    "Performance Report",
  ],
  lastUpdated: "12/06/25 - 10:03 pm",
  createdDate: "01/01/25",
  status: "Active",
};

export default function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockService);

  const handleSave = () => {
    console.log("[v0] Saving service changes:", formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this service?")) {
      console.log("[v0] Deleting service:", params.id);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/service-management">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Service Management
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Service
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Service
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEditing ? "Edit Service" : "Service Details"}
        </h1>
        <Badge
          variant="outline"
          className={
            formData.visibility === "Public"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }
        >
          {formData.visibility}
        </Badge>
      </div>

      {/* Service Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="serviceName">Service Name</Label>
              {isEditing ? (
                <Input
                  id="serviceName"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="text-gray-900 mt-1">{formData.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="mt-1"
                  rows={4}
                />
              ) : (
                <p className="text-gray-900 mt-1">{formData.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                {isEditing ? (
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{formData.price}</p>
                )}
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                {isEditing ? (
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{formData.duration}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                {isEditing ? (
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-900 mt-1">{formData.category}</p>
                )}
              </div>
              <div>
                <Label htmlFor="visibility">Visibility</Label>
                {isEditing ? (
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) =>
                      handleInputChange("visibility", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-900 mt-1">{formData.visibility}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
            {isEditing && (
              <Button
                variant="outline"
                className="mt-4 text-purple-600 border-purple-600 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Service Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Service Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Service ID
              </Label>
              <p className="text-gray-900 mt-1">{formData.id}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Created Date
              </Label>
              <p className="text-gray-900 mt-1">{formData.createdDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Last Updated
              </Label>
              <p className="text-gray-900 mt-1">{formData.lastUpdated}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
