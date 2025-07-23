import { QueryClient, type QueryFunction } from "@tanstack/react-query"

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText
    throw new Error(`${res.status}: ${text}`)
  }
}

export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Something went wrong")
  }
  return response.json()
}

type UnauthorizedBehavior = "returnNull" | "throw"
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    })

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null
    }

    await throwIfResNotOk(res)
    return await res.json()
  }

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Number.POSITIVE_INFINITY,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
})
