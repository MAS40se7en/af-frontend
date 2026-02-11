import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useCategories from "@/hooks/use-categories";

interface AdminActionsProps {
    categoryId: number;
    categoryName: string;
}

const AdminActions = ({ categoryId, categoryName }: AdminActionsProps) => {
    const { destroyCategory, deleteCategoryError, isDeletingCategory } = useCategories();


  return (
    <div className="flex items-center gap-3">
                            <p className="text-sm text-muted-foreground">ID: {categoryId}</p>
                            <Button variant="secondary">
                                Edit category
                                {/** TODO: <EditCategoryDialog category={category} /> */}
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        Delete category
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Deleting Category {categoryName}!
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
                                        <Button onClick={() => destroyCategory(categoryId)} disabled={isDeletingCategory} variant="destructive">
                                            Confirm
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
  )
}

export default AdminActions