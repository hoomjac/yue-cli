import { useBaseUrl } from '@/framework/useBaseUrl'
import { useFetch } from '@vueuse/core'

const { baseUrl } = useBaseUrl()
console.log('baseUrl', baseUrl)

export function useUserData(userId: string) {
  return useFetch(baseUrl + '/user' + userId)
}
