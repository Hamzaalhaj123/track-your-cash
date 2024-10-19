import cn from "@/utils/cn";
import { LoaderCircleIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef } from "react";

type LoadingSpinnerProps = {
  isLoading: boolean;
} & ComponentPropsWithoutRef<"div">;

export default function LoadingSpinner({
  isLoading,
  className,
  ...rest
}: LoadingSpinnerProps) {
  return (
    <div
      style={{ borderRadius: "inherit" }}
      className={cn(
        "bg-inherit rounded-inherit pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity",
        { "opacity-100": isLoading },
        className,
      )}
      {...rest}
    >
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );
}
