import { useState } from "react";
import { ChevronRightIcon, ChevronsLeftIcon } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";




interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;

};

export const CategoriesSidebar = ({ open, onOpenChange, }: Props) => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.categories.getMany.queryOptions())


    const router = useRouter();

    // A list of categories (array) vs a single category item
    type CategoryList = CategoriesGetManyOutput;
    type CategoryItem = CategoriesGetManyOutput[number];

    const [parentCategory, setParentCategory] = useState<CategoryList | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

    const currentCategories = parentCategory ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setParentCategory(null);
        setSelectedCategory(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CategoryItem) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategory(category.subcategories as CategoryList);
            setSelectedCategory(category);
        } else {
            //This is a leaf category (no subcategories) 
            if (parentCategory && selectedCategory) {
                //This is a subcategory -navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            }
            else {
                //This is a main category - navigate to /category
                if (category.slug === "all") {
                    router.push("/");
                } else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    }

    const handleBackClick = () => {
        if (parentCategory) {
            setParentCategory(null);
            setSelectedCategory(null);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";


    return (
        <Sheet open={open} onOpenChange={handleOpenChange} >
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}>
                <SheetHeader
                    className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategory && (
                        <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center
                        text-base font-medium cursor-pointer"
                        >
                            <ChevronsLeftIcon className="size-4 mr-2" />
                            Back
                        </button>

                    )}
                    {currentCategories.map((category) => (
                        <button
                            onClick={() => handleCategoryClick(category)}
                            key={category.slug}

                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer">
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4" />
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}