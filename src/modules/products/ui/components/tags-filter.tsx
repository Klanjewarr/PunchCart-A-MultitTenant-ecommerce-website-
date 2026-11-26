import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface TagsFilterProps{
    value?:string[] | null;
    onChange: (value:string[])=> void;
}

export const TagsFilter = ({value, onChange}: TagsFilterProps)=>{
    const trpc = useTRPC();
    const{data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage}= useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions(
        {
            limit:DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) =>{
                return lastPage.docs.length>0?lastPage.nextPage: undefined;
            }
        }
    ))

    const onClick = (tag:string)=>{
        if(value?.includes(tag)){
            onChange(value?.filter((t)=>t!==tag)||[]);
        }else{
            onChange([...(value || []),tag])
        }
    }
    
    return(
        <div className="flex flex-col gap-y-1.5" >
            {isLoading ? (
                <div className="flex items-center justify-center p-4">
                    <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
                </div>
            ):(
                data?.pages.map((page)=>
                page.docs.map((tag)=>(
                    <div
                    key={tag.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-pink-50/20 px-2 py-1 rounded-sm transition-colors group"
                    onClick={()=>onClick(tag.name)}
                    >
                        <p className="text-sm font-medium text-neutral-800 group-hover:text-black transition-colors">{tag.name}</p>
                        <Checkbox
                        checked={value?.includes(tag.name)}
                        onCheckedChange={()=>onClick(tag.name)}
                        className="border-2 border-black data-[state=checked]:bg-pink-400 data-[state=checked]:text-black shrink-0 size-4.5 rounded-xs shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                        />
                    </div>
                )))
            )}
            {hasNextPage && (
                <button
                disabled={isFetchingNextPage}
                onClick={()=>fetchNextPage()}
                className="underline font-bold text-xs uppercase text-neutral-600 hover:text-pink-600 transition-colors justify-start text-start disabled:opacity-50 cursor-pointer pt-2 pl-2"
                >
                    Load more...
                </button>
            )}
        </div>
    );
}