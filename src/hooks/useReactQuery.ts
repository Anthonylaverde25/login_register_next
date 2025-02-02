import { useQuery, UseQueryOptions } from '@tanstack/react-query'

interface useEntityQueryOptions<T> {
    queryKey: string[]
    queryFn: () => Promise<T>
    staleTime?: number
    cacheTime?: number
}

export const useReactQuery = <T>({
    queryKey,
    queryFn,
    staleTime,
}: //cacheTime,
useEntityQueryOptions<T>) => {
    const queryOptions: UseQueryOptions<T, Error> = {
        queryKey, // Clave única para el cache
        queryFn, // Función que obtiene los datos
        staleTime: staleTime || 1000 * 60 * 5, // Datos frescos durante 5 minutos por defecto
        //cacheTime: cacheTime || 1000 * 60 * 10, // Los datos se guardan en cache por 10 minutos por defecto
    }

    const { data, isLoading, error } = useQuery(queryOptions)

    return { data, isLoading, error }
}
