"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivities = () => {
  const activities = [
    {
      id: "1",
      title: "You sent a project request",
      time: "12:36",
    },
    {
      id: "2",
      title: "Your Digital Marketing Project is 20% done!",
      time: "12:36",
    },
    {
      id: "3",
      title: "Your Digital Marketing Project is 50% done!",
      time: "12:35",
    },
    {
      id: "4",
      title: "Your Digital Marketing project is complete!",
      time: "12:35",
    },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold">
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start justify-between gap-2"
          >
            <p className="text-sm text-gray-700 flex-1 leading-relaxed">
              {activity.title}
            </p>
            <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">
              {activity.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
