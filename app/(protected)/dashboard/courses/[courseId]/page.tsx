"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { courses } from "@/lib/data";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Star,
  Clock,
  UsersRound,
  Signal,
  Languages,
  Check,
  PlayCircle,
  Heart,
  Radio,
  BookCopy,
  Download,
  MonitorPlay,
  Infinity,
  GanttChartSquare,
  Video
} from "lucide-react";

// Helper to render star ratings (consistent with listing page)
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 0.5 : 0;
  const emptyStars = 5 - fullStars - (halfStar > 0 ? 1 : 0);
  return (
    <>
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-4 w-4 text-yellow-500 fill-current" />)}
      {halfStar > 0 && <Star key="half" className="h-4 w-4 text-yellow-500 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />} 
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />)}
    </>
  );
};

// Format currency (replace with your preferred library/method if needed)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
}

export default function CourseDetailsPage() {
  const params = useParams();
  const courseIdParam = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
  const courseId = parseInt(courseIdParam || "", 10);
  
  const course = courses.find((c) => c.id === courseId);

  if (!course || isNaN(courseId)) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-xl text-red-500">Course not found.</p>
        </div>
      </div>
    );
  }

  const totalCourseDuration = course.courseContent.reduce((acc, section) => {
    let hours = 0;
    let minutes = 0;
    const parts = section.totalDuration.split(' ');
    parts.forEach(part => {
      if (part.includes('hr')) hours += parseInt(part.replace('hr', ''));
      if (part.includes('min')) minutes += parseInt(part.replace('min', ''));
    });
    return acc + hours * 60 + minutes;
  }, 0);
  const totalHours = Math.floor(totalCourseDuration / 60);
  const totalMinutes = totalCourseDuration % 60;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="bg-gray-900 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-purple-300 mb-2">
              {course.category?.split(' > ').join(' › ') || 'Courses'}
            </div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-lg text-gray-300 mb-3">{course.subtitle}</p>
            {course.isBestseller && (
              <Badge variant="secondary" className="bg-yellow-200 text-yellow-800 hover:bg-yellow-200 px-2 py-0.5 text-xs mr-2 mb-2">Bestseller</Badge>
            )}
            <span className="text-sm mr-2">Created by <a href="#" className="text-purple-300 underline">{course.instructor}</a></span>
            <div className="flex flex-wrap items-center text-sm text-gray-300 mt-1">
              <span className="mr-3 flex items-center"><Clock size={16} className="mr-1"/> Last updated {course.lastUpdated}</span>
              <span className="mr-3 flex items-center"><Languages size={16} className="mr-1"/> {course.language}</span>
              {course.subtitleLanguages && (
                <span className="flex items-center"><Radio size={16} className="mr-1"/> {course.subtitleLanguages.join(', ')}</span>
              )}
            </div>
            <div className="flex items-center mt-2">
              <span className="text-lg font-semibold text-yellow-500 mr-1">{course.rating.toFixed(1)}</span>
              <div className="flex mr-1">{renderStars(course.rating)}</div>
              <a href="#reviews" className="text-sm text-purple-300 underline mr-3">({course.enrolled.toLocaleString()} ratings)</a>
              <span className="text-sm text-gray-300">{course.enrolled.toLocaleString()} learners</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {course.whatYoullLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="mr-3 mt-1 text-gray-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Course content</h2>
              <div className="text-sm text-gray-600 mb-4">
                {course.courseContent.length} sections • {course.totalLectures} lectures • {totalHours}h {totalMinutes}m total length
              </div>
              <Accordion type="single" collapsible className="w-full">
                {course.courseContent.map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:bg-gray-100 px-4 py-3 text-left font-semibold">
                      <div className="flex justify-between w-full">
                        <span>{section.sectionTitle}</span>
                        <span className="text-sm font-normal text-gray-600 pr-4">{section.lectureCount} lectures • {section.totalDuration}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="divide-y divide-gray-200">
                        {section.lectures.map((lecture, lecIndex) => (
                          <li key={lecIndex} className="flex justify-between items-center px-4 py-3 text-sm">
                            <div className="flex items-center">
                              <Video size={16} className="mr-3 text-gray-500" />
                              <span>{lecture.title}</span>
                              {lecture.isPreviewable && (
                                <a href="#" className="text-purple-600 underline ml-4">Preview</a>
                              )}
                            </div>
                            <span>{lecture.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mb-8">
               <h2 className="text-2xl font-bold mb-4">Description</h2>
               <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                 {course.description}
               </p>
             </div>

          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 border border-gray-200 shadow-lg rounded-md overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                <Image
                  src={course.image}
                  alt={`${course.title} preview`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <button className="text-white flex flex-col items-center">
                    <PlayCircle size={64} />
                    <span className="mt-2 text-sm font-semibold">Preview this course</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                 <div className="mb-4">
                    <span className="text-3xl font-bold mr-2">{formatCurrency(course.price)}</span>
                    <span className="text-lg text-gray-500 line-through mr-2">{formatCurrency(course.originalPrice)}</span>
                    <span className="text-lg text-red-600 font-semibold">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                    </span>
                 </div>
                 <p className="text-red-600 text-sm font-semibold mb-4">6 hours left at this price!</p>
                 <div className="flex gap-2 mb-4">
                    <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                       Add to cart
                    </Button>
                    <Button size="lg" variant="outline" className="px-3">
                       <Heart size={20} />
                    </Button>
                 </div>
                 <Button size="lg" variant="outline" className="w-full mb-4">Buy now</Button>
                 <p className="text-xs text-gray-500 text-center mb-4">30-Day Money-Back Guarantee</p>
                 
                 <h3 className="font-semibold mb-2">This course includes:</h3>
                 <ul className="space-y-2 text-sm text-gray-700 mb-6">
                   {course.courseIncludes.map((item, index) => (
                     <li key={index} className="flex items-center">
                       <item.icon size={16} className="mr-2 text-gray-600"/>
                       <span>{item.text}</span>
                     </li>
                   ))}
                 </ul>
                 <div className="flex justify-between text-sm">
                    <a href="#" className="font-semibold underline hover:text-purple-700">Share</a>
                    <a href="#" className="font-semibold underline hover:text-purple-700">Gift this course</a>
                    <a href="#" className="font-semibold underline hover:text-purple-700">Apply Coupon</a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 