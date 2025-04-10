/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Ratings from "@/app/utils/Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  course: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ course, isProfile }) => {
  return (
    <Link
      href={
        !isProfile
          ? `/course/${course.id || course._id}`
          : `course-access/${course.id || course._id}`
      }
    >
      <Card className="group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 border-muted hover:border-primary/20">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={
                course?.thumbnail?.url ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              }
              alt={course.name}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {course.name}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <Ratings rating={course.ratings} />
            {!isProfile && (
              <Badge
                variant="secondary"
                className="bg-secondary/20 text-secondary hover:bg-secondary/30"
              >
                {course.purchased} Students
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </span>
              {course.estimatedPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${course.estimatedPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <AiOutlineUnorderedList className="h-4 w-4" />
              <span>{course.level || "All Levels"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
