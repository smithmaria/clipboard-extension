import '../FolderClips.css'
import LayoutBlock from '../../../assets/layout-block.svg?react'
import LayoutList from '../../../assets/layout-list.svg?react'

const LayoutToggle = () => {
  return (
    <>
      <div className='layout-toggle'>
        <LayoutBlock />
        <LayoutList className='active' />
      </div>
    </>
  )
}

export default LayoutToggle;