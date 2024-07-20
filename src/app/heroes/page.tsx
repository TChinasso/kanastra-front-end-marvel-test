'use client'
import { useCharacterStore } from "@/store/character";
import { useEffect } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { Pagination } from 'antd';
const { Meta } = Card;

import { Character, CharacterTumbNail } from "@/types";
export default function Heroes() {
  const { push } = useRouter()

  const { getCharacters, characters, loading } = useCharacterStore()

  const queryChars = async () => {
    try {
      await getCharacters()
    } catch (e) {
      console.error(e)
    }
  }

  const gotoCharacterPage = (character: Character) => { 
    push(`/heroes/${character.id}`)
  }
  console.log('Montou a pagina fora do use Effect')

  useEffect(() => {
    queryChars()
  }, [])


  const characterThumbnailUrl = (thumbnail?: CharacterTumbNail): string => {
    if (!thumbnail) return ''
    return `${thumbnail.path}.${thumbnail.extension}`
  }

  if (loading) {
    return (
      <div className="text-3xl"> Carregando</div>
    )
  } else if (!characters) {
    return (
      <div>
        <span className="text-3xl"> Nenhum heroi encontrado </span>
      </div>
    )
  }
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="flex container flex-wrap gap-1 m-8">
        {characters?.map((character) => {
          return (
            <Card
            key={character.id}
              onClick={() => gotoCharacterPage(character)}
              style={{ width: 250, height: '300px' }}
              cover={
                <img
                  width={250}
                  height={'80%'}
                  alt="example"
                  src={characterThumbnailUrl(character.thumbnail)}
                />
              }
            >
              <Meta
                title={character.name}
              />
            </Card>
          )
        })}

      </div>
      <Pagination
        total={85}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={20}
        defaultCurrent={1}
      />
    </div>
  );
}
