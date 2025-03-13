import {apiClient, CanceledError } from "./api-client";

export { CanceledError }

export interface Comment {
    comment: string;
    owner: string;
    isOwnerDoctor: boolean;
}

const getPostComments = (postId: string) => {
    const abortController = new AbortController()
    const request = apiClient.get<Comment[]>(`/comments/${postId}`
        , { signal: abortController.signal })
    return { request, abort: () => abortController.abort() }
}

export default {getPostComments} 