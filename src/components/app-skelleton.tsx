import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-xl shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 p-3 border-b">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Table Rows (Repeatable) */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-3 border-b last:border-none items-center">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      ))}
    </div>
  );
}
