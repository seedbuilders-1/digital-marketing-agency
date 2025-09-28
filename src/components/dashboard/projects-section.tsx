/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Helper function to map backend status to UI-friendly text and color
const getStatusDetails = (status: any) => {
  switch (status) {
    case "PENDING_APPROVAL":
      return { text: "Pending", color: "bg-orange-100 text-orange-800" };
    case "ACTIVE":
      return { text: "In Progress", color: "bg-blue-100 text-blue-800" };
    case "COMPLETED":
      return { text: "Completed", color: "bg-green-100 text-green-800" };
    case "CANCELLED":
    case "DECLINED":
      return { text: "Cancelled", color: "bg-red-100 text-red-800" };
    default:
      return { text: "Unknown", color: "bg-gray-100 text-gray-800" };
  }
};

// Helper to calculate a mock progress
const calculateProgress = (project: any) => {
  if (project.status === "COMPLETED") return 100;
  if (project.status === "ACTIVE") return 60; // Or calculate based on milestones
  if (project.status === "PENDING_APPROVAL") return 10;
  return 0;
};

const ProjectCard = ({ project }: { project: any }) => {
  const router = useRouter();
  const statusDetails = getStatusDetails(project.status);
  const progress = calculateProgress(project);

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge className={statusDetails.color}>{statusDetails.text}</Badge>
            <h3 className="font-semibold text-gray-900 mt-2 mb-1">
              {project.service.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/projects/${project.id}`)}
            className="text-[#7642FE] border-[#7642FE] hover:bg-[#7642FE] hover:text-white"
          >
            View Project
            <ExternalLink size={14} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsSection = ({ projects }: { projects: any }) => {
  // Show only the 2 most recent projects on the dashboard
  const recentProjects = projects.slice(0, 2);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Your Projects</CardTitle>
        <Button
          variant="outline"
          className="text-[#7642FE] border-[#7642FE] hover:bg-[#7642FE] hover:text-white"
        >
          <Link href={"/dashboard/projects"}> View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentProjects.length > 0 ? (
          recentProjects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            You have no active projects yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
