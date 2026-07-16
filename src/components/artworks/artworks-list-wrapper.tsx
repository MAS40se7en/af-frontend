import { useAuth } from "@/contexts/AuthContext";
import { useArtworks, type ArtworkList } from "@/hooks/use-artworks";
import ArtworkCard from "./artwork-card";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { sortItemsByDate, type sortOptions } from "@/lib/utils";
import { useState, useTransition } from "react";
import useCategories from "@/hooks/use-categories";
import { Input } from "../ui/input";

const ArtowksListWrapper = () => {
    const { isAdmin } = useAuth();
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [startTransition] = useTransition();
    const { artworks, artworksError } = useArtworks(search);
    const { categories } = useCategories();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        startTransition(() => {
            setSearch(value);
        });
    }


    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sort, setSort] = useState<sortOptions>({
        value: "latest",
        label: "Latest"
    });

    if (!artworks || artworksError) {
        return (
            <div>
                <p>Something went wrong while fetching your art works</p>
                {artworksError ? <p>{artworksError.message}</p> : ""}
            </div>
        )
    }

    const filteredArtworks =
        !selectedCategory || selectedCategory === "All"
            ? artworks
            : artworks.filter(
                artwork => artwork.category?.code === selectedCategory
            );

    const sortedArtworks = sortItemsByDate({ items: filteredArtworks, sortOptions: sort }) as ArtworkList[];

    return (
        <div className="mt-10 flex flex-col items-center justify-center w-full md:w-4/5 px-6 md:px-0 mx-auto">
            <div className="lg:w-4/5 ">
                <div className="w-full flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-semibold">Artworks</h2>
                        <p className="text-sm text-muted-foreground">Artworks are grouped in the categories they are assigned to.</p>
                    </div>
                    {isAdmin && (
                        <Link
                            className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-md"
                            to="/create-artwork">
                            Create
                        </Link>
                    )}
                </div>
                <div className="flex justify-start items-center w-full mb-5 gap-10">
                    <div className="flex gap-3 justify-between items-center">
                        <Select
                            value={selectedCategory ?? undefined}
                            onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>categories</SelectLabel>
                                    <SelectItem value="All">Show all</SelectItem>
                                    {categories?.map((category) =>
                                        <SelectItem key={category.code} value={category.code}>
                                            {category.name}
                                        </SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={sort.value ?? undefined}
                            onValueChange={(value: "latest" | "oldest") => setSort({ value, label: value === "latest" ? "Latest" : "Oldest" })}>
                            <SelectTrigger>
                                <SelectValue placeholder="sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>sort by</SelectLabel>
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Input
                            placeholder="Search artworks..."
                            className="md:w-70"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {sortedArtworks?.map((a) => (
                    <ArtworkCard key={a.id} artwork={a} />
                ))}
            </div>
        </div>
    )
}

export default ArtowksListWrapper