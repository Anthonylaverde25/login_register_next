import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserUseCase } from '../application/usecase/useCase'
import { toast } from 'sonner'
import { UserType } from 'app/types'

export function useCreateUser() {
    const queryClient = useQueryClient()
    const useCase = new UserUseCase()

    const mutation = useMutation({
        mutationFn: async (userData: UserType) => {
            const { user, message } = await useCase.create(userData) // Corrección: envolviendo el bloque en llaves {}
            return { user, message } // Debes retornar el objeto con los datos
        },
        onSuccess: ({ user, message }) => {
            queryClient.invalidateQueries({
                queryKey: ['users'], // Usa queryKey explícito
            })

            // Opcional: actualizar el cache directamente
            queryClient.setQueryData(['users'], (oldData: any) => [
                ...(oldData || []),
                user,
            ])
            toast.success(`${message}`)
        },
        onError: (error: any) => {
            console.error('Error creating user:', error)
        },
    })

    const handleUserCreated = async (values: UserType) => {
        try {
            mutation.mutate(values)
        } catch (error) {
            console.log('Error al crear el banco', error)
        }
    }

    return {
        ...mutation,
        handleUserCreated,
    }
}
