"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  title: string;
  time: string;
  type: "login" | "project" | "message";
}

const RecentActivities = () => {
  const activities: Activity[] = [
    {
      id: "1",
      title: "Recent login",
      time: "9:30",
      type: "login",
    },
    {
      id: "2",
      title: "Your UI/UX project is completed!",
      time: "9:30",
      type: "project",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return "🔐";
      case "project":
        return "✅";
      case "message":
        return "💬";
      default:
        return "📝";
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
          >
            <div className="text-lg">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
            </div>
            <div className="text-xs text-gray-500">{activity.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
