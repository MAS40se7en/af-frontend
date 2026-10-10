import { queryClient } from '@/lib/tanstack'
import {
  fetchUserProfile,
  signInUser,
  signOutUser,
} from '@/services/authService'
import { isAxiosError, type AxiosError } from 'axios'
import { atom } from 'jotai'
import { atomWithQuery, atomWithMutation } from 'jotai-tanstack-query'
import { toast } from 'sonner'

type User = {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  fullName: string
  roleName: string
  imageUrl: string
}

export const userAtom = atom<User | null>(
  (get) => get(userQueryAtom).data ?? null,
)

export const isAdminAtom = atom((get) => {
  const user = get(userAtom)
  return user?.roleName === 'ROLE_ADMIN' || user?.roleName === 'ROLE_TESTER'
})

export const userQueryAtom = atomWithQuery(
  () => ({
    queryKey: ['fetch-user'],
    queryFn: async () => {
      try {
        return await fetchUserProfile()
      } catch (error) {
        if (
          isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          return null
        }
        throw error
      }
    },
    retry: false,
  }),
  () => queryClient,
)

export const isUserLoadingAtom = atom((get) => get(userQueryAtom).isPending)
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null)

export const signInAtom = atomWithMutation(
  () => ({
    mutationKey: ['sign-in'],
    mutationFn: signInUser,
    onSuccess: async ({ data }) => {
      console.log('Sign in successful, user data:', data)
      await queryClient.invalidateQueries({ queryKey: ['fetch-user'] })

      toast.success('Successfully signed in.')
    },
    onError: (error: AxiosError) => {
      console.error('Sign in error:', error.message)
      toast.error('Failed to sign in.')
    },
  }),
  () => queryClient,
)

export const signOutAtom = atomWithMutation(
  () => ({
    mutationKey: ['sign-out'],
    mutationFn: signOutUser,
    onSuccess: async () => {
      toast.success('Successfully signed out.')

      queryClient.setQueryData(['fetch-user'], null)
    },
    onError: (error: AxiosError) => {
      console.error('Sign out error:', error.message)
      toast.error('Failed to sign out.')
    },
  }),
  () => queryClient,
)
