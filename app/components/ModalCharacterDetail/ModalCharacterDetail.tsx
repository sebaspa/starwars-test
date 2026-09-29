import { Descriptions, Modal, Skeleton, Space, Tag } from 'antd'
import { ModalCharacterDetailProps } from './ModalCharacterDetail.types'

const ModalCharacterDetail = (props: ModalCharacterDetailProps) => {
  const { isModalOpen, handleClose, loading, error, data } = props

  return (
    <Modal
      title={data?.name ?? 'Character detail'}
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      okText='Close'
      cancelButtonProps={{ style: { display: 'none' } }}
      width={720}
      destroyOnHidden
    >
      {loading && <Skeleton active paragraph={{ rows: 6 }} />}

      {error && !loading && (
        <p style={{ color: '#cf1322' }}>
          Error loading character detail: {error.message}
        </p>
      )}

      {!loading && !error && data && (
        <Space orientation='vertical' size='middle' style={{ width: '100%' }}>
          <Descriptions title='Attributes' bordered column={2} size='small'>
            <Descriptions.Item label='Name'>{data.name}</Descriptions.Item>
            <Descriptions.Item label='Gender'>
              {data.gender ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Birth year'>
              {data.birthYear ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Height'>
              {data.height ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Mass'>
              {data.mass ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Hair color'>
              {data.hairColor ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Skin color'>
              {data.skinColor ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Eye color'>
              {data.eyeColor ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Homeworld'>
              {data.homeworld?.name ?? 'unknown'}
            </Descriptions.Item>
            <Descriptions.Item label='Species'>
              {data.species?.name ?? 'unknown'}
            </Descriptions.Item>
          </Descriptions>

          <div>
            <h4 style={{ marginBottom: 8 }}>Films</h4>
            {data.filmConnection.films.length === 0 ? (
              <p>No films available.</p>
            ) : (
              <Space
                size='small'
                style={{ width: '100%' }}
              >
                {data.filmConnection.films.map(film => (
                  <div key={film.id}>
                    <strong>{film.title}</strong>
                    {film.director && (
                      <span> — directed by {film.director}</span>
                    )}
                    {film.releaseDate && <span> ({film.releaseDate})</span>}
                    <div style={{ marginTop: 4 }}>
                      {film.planetConnection.planets.map(planet => (
                        <Tag key={planet.id} color='blue'>
                          {planet.name}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </Space>
            )}
          </div>

          <div>
            <h4 style={{ marginBottom: 8 }}>Vehicles</h4>
            {data.vehicleConnection.vehicles.length === 0 ? (
              <p>No vehicles available.</p>
            ) : (
              <Space wrap>
                {data.vehicleConnection.vehicles.map(vehicle => (
                  <Tag key={vehicle.id} color='green'>
                    {vehicle.name}
                  </Tag>
                ))}
              </Space>
            )}
          </div>

          <div>
            <h4 style={{ marginBottom: 8 }}>Starships</h4>
            {data.starshipConnection.starships.length === 0 ? (
              <p>No starships available.</p>
            ) : (
              <Space wrap>
                {data.starshipConnection.starships.map(starship => (
                  <Tag key={starship.id} color='purple'>
                    {starship.name}
                  </Tag>
                ))}
              </Space>
            )}
          </div>
        </Space>
      )}
    </Modal>
  )
}

export default ModalCharacterDetail
