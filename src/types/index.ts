export interface CharacterSearchparams {
  name?: string
  nameStartsWith?: string
  modifiedSince?: string
  comics?: string
  limit?: number | string
  offset?: number | string
  apikey: string
  orderBy: string
}
export interface PaginatedResponse<type> {
  data: {
    results: type[]
    offset: number
    total: number
    count: number
    limit: number
  }
}
export interface CharacterTumbNail {
  path: string
  extension: string
}
export interface Colection<type> {
  avaliable: number
  returned: number
  items: type
}
export interface ComicsCollection {
  resourceURI: string
  name: string
}
export interface SeriesCollection {
  resourceURI: string
  name: string
}
export interface EventsCollection {
  resourceURI: string
  name: string
}
export interface StoriesCollection {
  resourceURI: string
  name: string
  type: string
}
export interface CharacterUrl {
  type?: string
  url?: string
}
export interface Character {
  id?: number
  name?: string
  modified?: string
  thumbnail?: CharacterTumbNail
  resourceURI?: string
  comics?: Colection<ComicsCollection[]>
  series?: Colection<SeriesCollection[]>
  stories?: Colection<StoriesCollection[]>
  events?: Colection<EventsCollection[]>
  urls?: CharacterUrl[],
  description: string
}
