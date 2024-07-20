import { Character, CharacterSearchparams, PaginatedResponse } from '@/types'
import { create } from 'zustand'
import CharactersService from '@/services/characters'
import { count } from 'console'
export const useCharacterStore = create<CharacterStore>()((set, get) => ({
  characters: null,
  loading: false,
  paginator: {
    limit: 20,
    offset: 0,
    count: 0,
    total: 0
  },


  getCharacters: async () => {
    try {
      set({ loading: true })
      const { paginator } = get()
      const payload: CharacterSearchparams = {
        apikey: '288e3a93efaadff9479bb5f550035783',
        limit: paginator.limit,
        orderBy: 'name'
      }
      const { data } = await CharactersService.getCharacters(payload)
      set({ characters: data.data.results })
      return data
    } catch (e) {
      Promise.reject(e)
    } finally {
      set({ loading: false })
    }
  }
}))




interface CharacterStore {
  characters: Character[] | null
  loading: boolean
  getCharacters(): Promise<PaginatedResponse<Character> | undefined>
  paginator: {
    limit: number
    offset: number
    count: number
    total: number
  }
}