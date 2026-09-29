'use client'

import { Suspense } from 'react'
import { Typography } from 'antd'
import { CharacterTable } from './components'

const { Title } = Typography

const HomeClient = () => {
  return (
    <div className='container px-4 mx-auto'>
      <Title level={2}>Star Wars characters</Title>
      <Suspense fallback={<p>Loading…</p>}>
        <CharacterTable />
      </Suspense>
    </div>
  )
}

export default HomeClient
