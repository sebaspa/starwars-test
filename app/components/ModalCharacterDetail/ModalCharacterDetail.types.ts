import type { GetCharacterDetailData } from '@/app/graphql/types'

export type ModalCharacterDetailProps = {
  isModalOpen: boolean
  handleClose: () => void
  loading: boolean
  error: Error | undefined
  data: GetCharacterDetailData['person'] | null
}
