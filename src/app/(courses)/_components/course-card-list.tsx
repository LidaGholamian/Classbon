import { CourseSummary } from "@/types/course-summary.interface"
import { CourseCard } from "./course-card";

type CourseCardListProp = {
    courses: CourseSummary[]
}

export const CourseCardList: React.FC<CourseCardListProp> = async ({ courses }) => {
  return (
    <div className="flex justify-center xl:jusify-start gap-6 mt-10">
      {courses.map((course) => (
        <CourseCard key={`course-${course.slug}`} {...course} />
      ))}
    </div>
  );
};
