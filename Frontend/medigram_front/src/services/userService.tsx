import {apiClient, CanceledError} from './api-client'

export { CanceledError }

const getUserName = (userId: string) => {
    const abortController = new AbortController()
    const request = apiClient.post<string>(`/users/username`
        , {userId},{ signal: abortController.signal })
    return { request, abort: () => abortController.abort() }
}

const isUserDoctor = (userId: string) => {
    const abortController = new AbortController()
    const request = apiClient.post<boolean>(`/users/is-doctor`
        ,{userId}, { signal: abortController.signal })
    return { request, abort: () => abortController.abort() }
}

export default { getUserName, isUserDoctor }