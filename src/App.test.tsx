import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

const queryClient = new QueryClient()

const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

export function useCustomHook() {
	return useQuery({ queryKey: ['customHook'], queryFn: () => 'api' })
}

test('renders learn react link', async () => {
	const { result } = renderHook(() => useCustomHook(), { wrapper })

	await waitFor(() => expect(result.current.isSuccess).toBe(true))
})
