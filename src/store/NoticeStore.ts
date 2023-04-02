import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type NoticeStore = {
    success: string,
    setGlobalSuccess: (value: string) => void,
    error: string,
    setGlobalError: (value: string) => void
}

export const useNoticeStore = create(subscribeWithSelector<NoticeStore>(set => ({
    success: '',
    setGlobalSuccess: (value: string) => set({ success: value }),
    error: '',
    setGlobalError: (value: string) => set({ error: value })
})))
