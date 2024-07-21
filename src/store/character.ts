import { Character, CharacterSearchparams, CharactersFieldsSearchParams, PaginatedResponse } from '@/types'
import { create } from 'zustand'
import CharactersService from '@/services/characters'
import { count } from 'console'
import fallbackCharacters from '@/apiMock/characters.json'
export const useCharacterStore = create<CharacterStore>()((set, get) => ({
  characters: null,
  character: null,
  loading: false,
  loadingCharacter: false,
  paginator: {
    limit: 20,
    offset: 0,
    count: 0,
    total: 0,
    page: 1
  },


  getCharacters: async (params) => {
    const { paginator } = get()
    try {
      set({ loading: true })
      const payload: CharacterSearchparams = {
        apikey: '288e3a93efaadff9479bb5f550035783',
        limit: paginator.limit,
        offset: paginator.offset,
        orderBy: '-name',
        ...params
      }
      const { data } = await CharactersService.getCharacters(payload)
      set({ characters: data.data.results })
      return data
    } catch (e) {
      const index = (params?.page || 1) - 1
      const { data } = fallbackCharacters[index]
      console.log(data)
      set({ characters: data.results })
      set({ paginator: {
        ...paginator,
        total: data.total,
        offset: data.offset,
        limit: data.limit,
        count: data.count,
      }})
      Promise.reject(e)
    } finally {
      set({ loading: false })
    }
  },
  getCharacter: async (characterId) => {
    try {
      set({loadingCharacter: true})
      const payload: any = {
        apikey: '288e3a93efaadff9479bb5f550035783',
      }
      const { data } = await CharactersService.getCharacter(payload, characterId)
      set({ character: data.data.results[0] })
      return data
    } catch (e) {
      Promise.reject(e)
    } finally {
      set({loadingCharacter: false})
    }
  }

}))




interface CharacterStore {
  characters: Character[] | null
  character: Character | null
  loading: boolean
  loadingCharacter: boolean
  getCharacters(params?: CharactersFieldsSearchParams): Promise<PaginatedResponse<Character> | undefined>
  getCharacter(characterId: string | number): Promise<PaginatedResponse<Character> | undefined>
  paginator: {
    limit: number
    offset: number
    count: number
    total: number
    page: number
  }
}