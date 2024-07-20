import instance from '@/plugins/axios'
import { CharacterSearchparams, PaginatedResponse, Character } from '@/types'

export default {
  async getCharacters(searchParams: CharacterSearchparams) {
    return await instance.get<PaginatedResponse<Character>>('/characters', {
      params: { ...searchParams }
    })
  }
}
