"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "pending" | "ongoing" | "completed";
  progress: number;
  category: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(project.status)}>
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <Progress value={project.progress} className="flex-1 h-2" />
              <span className="text-sm text-gray-500">
                {project.progress}% complete
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{project.category}</span>
          <Button
            variant="outline"
            size="sm"
            className="text-[#7642FE] border-[#7642FE] hover:bg-[#7642FE] hover:text-white"
          >
            View Order
            <ExternalLink size={14} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: "1",
      title: "UI/UX Design",
      description: "Brief description of the project",
      status: "pending",
      progress: 60,
      category: "WEB DESIGN",
    },
    {
      id: "2",
      title: "SEO",
      description: "Brief description of the project",
      status: "ongoing",
      progress: 80,
      category: "SEO COMPLETE",
    },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Your Projects</CardTitle>
        <Button
          variant="outline"
          className="text-[#7642FE] border-[#7642FE] hover:bg-[#7642FE] hover:text-white"
        >
          View more
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
