import { Suspense } from 'react'
import { CharacterTable } from './components'

export default function Home () {
  return (
    <div className='container px-4 mx-auto py-6'>
      <h1 className='text-center font-bold text-2xl md:text-3xl lg:text-5xl mb-4'>Star Wars characters</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <CharacterTable />
      </Suspense>
    </div>
  )
}
