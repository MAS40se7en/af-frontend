import { queryClient } from "@/lib/tanstack";
import { updateProfilePhoto } from "@/services/imagesService";
import { atomWithMutation } from "jotai-tanstack-query";
import { toast } from "sonner";

export const updateAvatarAtom = atomWithMutation(
    () => ({
        mutationKey: ["update-avatar"],
        mutationFn: updateProfilePhoto,
        onSuccess: async () => {
            toast.success("Avatar updated successfully")

            await queryClient.invalidateQueries({ queryKey: ["fetch-user"] })
        },
        onError: (error: Error) => {
            console.error("Error updating avatar", error)
            toast.warning("Error updating avatar", {
                description: error.message,
            })
        }
    }),
    () => queryClient
)