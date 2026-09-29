import { Suspense } from 'react'
import { CharacterTable } from './components'

export default function Home () {
  return (
    <div className='container px-4 mx-auto'>
      <h1>Home</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <CharacterTable />
      </Suspense>
    </div>
  )
}
