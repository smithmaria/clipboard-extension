import '../FolderClips.css'
import LayoutBlock from '../../../assets/layout-block.svg?react'
import LayoutList from '../../../assets/layout-list.svg?react'

const LayoutToggle = ({ layout, setLayout }) => {
  return (
    <>
      <div className='layout-toggle'>
        <LayoutBlock 
          className={layout === 'grid' ? 'active' : ''} 
          onClick={() => {setLayout('grid')}}
        />
        <LayoutList 
          className={layout === 'list' ? 'active' : ''} 
          onClick={() => {setLayout('list')}}
        />
      </div>
    </>
  )
}

export default LayoutToggle;