import { useBaseUrl } from '@/framework/useBaseUrl'
import { useFetch } from '@vueuse/core'

const { baseUrl } = useBaseUrl()

export function useGetRequest() {
  return useFetch(baseUrl + '/get')
    .get()
    .json()
}
