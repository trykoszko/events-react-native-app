import axios from 'axios'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { apiConfig } from '../config/variables'
import { UserData } from '../types/User.type'

type AuthStore = {
    isAuthenticated: boolean,
    apiToken: string | undefined,
    setApiToken: (value: string) => void,
    userData: UserData | undefined,
}

export const useAuthStore = create(subscribeWithSelector<AuthStore>((set, get) => ({
    isAuthenticated: false,
    apiToken: undefined,
    setApiToken: (value: string) => set(() => ({ apiToken: value, isAuthenticated: true })),
    userData: undefined,
})))

useAuthStore.subscribe(state => state.apiToken, async (apiToken) => {
    if (apiToken && apiToken !== '') {
        let data = await axios.get(`${apiConfig.url}/user`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })

        useAuthStore.setState({
            isAuthenticated: true,
            userData: data.data
        })
    } else {
        useAuthStore.setState({
            isAuthenticated: false,
            userData: undefined
        })
    }
})
