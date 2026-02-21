import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useCategories, { type Category } from "@/hooks/use-categories";
import { useEffect, useState } from "react";
import CreateCategoryDialog from "./create-category";
import { Trash } from "lucide-react";

interface AdminActionsProps {
    category: Category;
    refetchCategory: () => void;
}

const AdminActions = ({ category, refetchCategory }: AdminActionsProps) => {
    const {
        updateCategory,
        isUpdatingCategory,
        updateCategoryError,
        isUpdatingCategorySuccess,
        destroyCategory,
        deleteCategoryError,
        isDeletingCategory
    } = useCategories();

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isUpdatingCategorySuccess) {
            setOpen(false);
            refetchCategory();
        }
    }, [updateCategory, open, isUpdatingCategorySuccess])


    return (
        <div className="flex items-center gap-3 justify-end">
            <p className="text-sm text-muted-foreground">ID: {category?.id}</p>
            {/** TODO: <EditCategoryDialog category={category} /> */}
            <CreateCategoryDialog
                variant="edit"
                category={category}
                open={open}
                setOpen={setOpen}
                updateCategory={updateCategory}
                isUpdatingCategory={isUpdatingCategory}
                updateCategoryError={updateCategoryError}
                isUpdatingCategorySuccess={isUpdatingCategorySuccess}
                isEditing
            />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash className="size-4 mr-2" /> Delete category
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Deleting Category {category?.name}!
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Are you sure you want to delete this category? This action cannot be undone.
                        {deleteCategoryError && (
                            <p className="text-destructive mt-2">{deleteCategoryError.message}</p>
                        )}
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <Button onClick={() => destroyCategory(category?.id || 0)} disabled={isDeletingCategory} variant="destructive">
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AdminActions