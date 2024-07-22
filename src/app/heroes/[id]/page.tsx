"use client"
import { usePathname, useSearchParams } from 'next/navigation'
import { useCharacterStore } from "@/store/character";
import { useEffect } from 'react';
import { CharacterTumbNail } from '@/types';
import Image from 'next/image'
import Chart from './components/Chart'
import ComicsTable from './components/ComicsTable';
import Link from 'next/link';
import SeriesTable from './components/SeriesTable';
import EventsTable from './components/EventsTable';
import { Flex, Spin } from 'antd';
import StoriesTable from './components/StoriesTable';
import { Breadcrumb } from 'antd';
export default function Heroe({ params, searchParams }: any) {
  const { getCharacter, character, loadingCharacter } = useCharacterStore()
  const queryCharacter = async () => {
    try {
      await getCharacter(params.id)
    } catch (e) {
      console.error(e)
    }
  }
  const characterThumbnailUrl = (thumbnail?: CharacterTumbNail): string => {
    if (!thumbnail) return ''
    return `${thumbnail.path}.${thumbnail.extension}`
  }
  const breadCrumbItems = [
    {
      title: 'Characters',
      href: '/heroes'
    },
    {
      title: character?.name,
    },
  ]
  useEffect(() => {
    queryCharacter()
  }, [])
  if (loadingCharacter) {
    return (
      <div className='container mx-auto flex h-full items-center justify-center'><Flex align="center" gap="middle">
        <Spin fullscreen={false} size="large"><div className='mt-14'>
          <span className=''>Loading Character...</span></div></Spin>
      </Flex></div>
    )
  }
  else if (!character) return (
    <div>Personagem nao encontrado</div>
  )
  return (
    <div className='container m-auto p-6 ro'>
      <div className='mb-4'>
        <Breadcrumb className='text-lg' items={breadCrumbItems} />
      </div>
      <div className={'flex flex-col  md:flex-row border-grey-50 border-2 shadow-lg rounded-lg p-6 '}>
        <Image
          width={250}
          height={50}
          className='rounded-lg'
          alt="example"
          src={characterThumbnailUrl(character.thumbnail)}
        />
        <div className='flex flex-col ml-4 p-4 md:w-5/12'>
          <span className='text-2xl text-gray-600'>{character.name}</span>
          <div className='p-4'>
            <span className='text-gray-800 text-lg'>{character.description}</span>
          </div>
          <div className='self-start grow flex items-end'>
            {character.urls?.map((url, index) => {
              return (
                <div className='p-2' key={index}>
                  <Link className='text-xl capitalize' target='_blank' href={new URL(url.url || '')}>{url.type}</Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className='grow flex justify-center md:justify-end'>
          <Chart character={character} />
        </div>
      </div>
      <div className={'flex flex-col border-grey-50 border-2 shadow-lg rounded-lg p-6 mt-6'}>
        <h2 className='p-4 text-2xl'>Events</h2>
        <EventsTable character={character} loading={loadingCharacter}></EventsTable>
      </div>
      <div className={'flex flex-col border-grey-50 border-2 shadow-lg rounded-lg p-6 mt-6'}>
        <h2 className='p-4 text-2xl'>Comics</h2>
        <ComicsTable character={character} loading={loadingCharacter}></ComicsTable>
      </div>
      <div className={'flex flex-col border-grey-50 border-2 shadow-lg rounded-lg p-6 mt-6'}>
        <h2 className='p-4 text-2xl'>Series</h2>
        <SeriesTable character={character} loading={loadingCharacter}></SeriesTable>
      </div>
      <div className={'flex flex-col border-grey-50 border-2 shadow-lg rounded-lg p-6 mt-6'}>
        <h2 className='p-4 text-2xl'>Stories</h2>
        <StoriesTable character={character} loading={loadingCharacter}></StoriesTable>
      </div>
    </div>
  )
}