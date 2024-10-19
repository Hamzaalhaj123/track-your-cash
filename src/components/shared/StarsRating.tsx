"use client";

import cn from "@/utils/cn";
import { LucideProps, StarHalfIcon, StarIcon } from "lucide-react";

type StarsRatingProps = {
  rating: number;
  maximumRating?: number;
  emptyStarProps?: LucideProps;
  halfStarProps?: LucideProps;
  fullStarProps?: LucideProps;
};

export default function StarsRating({
  rating,
  maximumRating = 5,
  emptyStarProps,
  halfStarProps,
  fullStarProps,
}: StarsRatingProps) {
  // rating = 2.5
  const flooredRating = Math.floor(rating); // 2
  const ceiledRating = Math.ceil(rating); // 3
  const ratingFraction = rating - flooredRating; // 0.5
  const stars = [];

  for (let i = 0; i < flooredRating; i++)
    stars.push(<FullStar key={`full-${i}`} {...emptyStarProps} />);
  if (ratingFraction) {
    if (ratingFraction >= 0.75) {
      stars.push(<FullStar key={`full-${flooredRating}`} {...fullStarProps} />);
    } else if (ratingFraction >= 0.25) {
      stars.push(<HalfStar key="half" {...halfStarProps} />);
    } else {
      stars.push(<EmptyStar {...emptyStarProps} />);
    }
  }
  for (let i = 0; i < maximumRating - ceiledRating; i++)
    stars.push(<EmptyStar key={`empty-${i}`} {...fullStarProps} />);

  return <div className="flex gap-2">{stars}</div>;
}

function FullStar({ className, ...props }: LucideProps) {
  return (
    <StarIcon
      size={16}
      className={cn("fill-secondary stroke-secondary", className)}
      {...props}
    />
  );
}

function HalfStar({ className, ...props }: LucideProps) {
  return (
    <div className="relative rtl:-scale-x-100">
      <StarHalfIcon
        size={16}
        className={cn("fill-secondary stroke-secondary", className)}
        {...props}
      />
      <StarHalfIcon
        size={16}
        className={cn(
          "absolute top-0 -scale-x-100 stroke-secondary",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function EmptyStar({ className, ...props }: LucideProps) {
  return (
    <StarIcon
      size={16}
      className={cn("stroke-secondary", className)}
      {...props}
    />
  );
}
