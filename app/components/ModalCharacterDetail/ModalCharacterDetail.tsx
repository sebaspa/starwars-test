import { Modal } from 'antd'
import { ModalCharacterDetailProps } from './ModalCharacterDetail.types'

const ModalCharacterDetail = (props: ModalCharacterDetailProps) => {
  const { isModalOpen, handleClose } = props
  return (
    <Modal
      title='Basic Modal'
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default ModalCharacterDetail
