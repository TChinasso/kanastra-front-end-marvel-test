'use client'
import { useCharacterStore } from "@/store/character";
import { useEffect, useState } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { Pagination } from 'antd';
import Image from 'next/image'
const { Meta } = Card;
import style from './Heroes.module.scss'
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Character, CharactersFieldsSearchParams, CharacterTumbNail } from "@/types";
import { SearchProps } from "antd/es/input";
export default function Heroes() {
  const { push } = useRouter()
  const [characterAppearsOn, setCharacterAppearsOn] = useState('')
  const [characterNameSearch, setCharacterNameSearch] = useState('')

  const { getCharacters, characters, loading, paginator } = useCharacterStore()

  const queryChars = async (params?: CharactersFieldsSearchParams) => {
    try {
      await getCharacters(params)
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

  const pageChange = function (page: number, limit: number) {
    paginator.page = page
    paginator.offset = (page - 1) * limit
    queryChars({ page: page })
  }

  const characterThumbnailUrl = (thumbnail?: CharacterTumbNail): string => {
    if (!thumbnail) return ''
    return `${thumbnail.path}.${thumbnail.extension}`
  }

  function searchCharacter() {
    const payload: any = {
      nameStartsWith: characterNameSearch
    }
    queryChars(payload)
  }

  if (loading) {
    return (
      <div className='container mx-auto flex h-full items-center justify-center'><Flex align="center" gap="middle">
        <Spin fullscreen={false} size="large"><div className='mt-14'>
          <span className=''>Loading Characters...</span></div></Spin>
      </Flex></div>
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
      <div className="flex ">
        <Space.Compact size="large">
          <Input value={characterNameSearch} onChange={(e) => setCharacterNameSearch(e.target.value)} addonBefore={<SearchOutlined onClick={() => searchCharacter()} />} placeholder="Nome do heroi" />
          <Input value={characterAppearsOn} onChange={(e) => setCharacterAppearsOn(e.target.value)} placeholder="Quadrinho / serie / filme" />
        </Space.Compact>
      </div>
      <div className="flex container flex-wrap gap-6 m-8 justify-center">
        {characters?.map((character) => {
          return (
            <Card
              className={style['kn-card']}
              key={character.id}
              onClick={() => gotoCharacterPage(character)}
              cover={
                <Image
                  className={style['kn-card__image']}
                  width={250}
                  height={230}
                  alt="example"
                  src={characterThumbnailUrl(character.thumbnail)}
                />
              }
            >
              <Meta

                className={style['kn-card__meta']}
                title={character.name}
              />
            </Card>
          )
        })}

      </div>
      <Pagination
        total={paginator.total}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={paginator.limit}
        defaultCurrent={paginator.page}
        onChange={pageChange}
      />
    </div>
  );
}
