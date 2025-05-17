import { CourseDTO } from "@/schemas/CourseSchema";

export function FilterBySearchQuery(
    course: CourseDTO,
    searchQuery: string | undefined
) {
    const searchQuery_ = searchQuery?.trimAll();
    if (searchQuery_ == null || searchQuery_ == "") {
        return true;
    }

    const terms = searchQuery_.toLowerCase().split(" ");
    return terms.some(
        (term) =>
            course.title.toLowerCase().includes(term) ||
            course.tags.some((tag) =>
                tag
                    .toLocaleLowerCase()
                    .split(" ")
                    .some((word) => word.includes(term))
            )
    );
}
