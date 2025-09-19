import { Skeleton } from "@/components/ui/skeleton";

export default function UserManagementLoading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
