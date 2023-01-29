import { ProgressCircle } from 'react-desktop/macOs'
import './index.scss'

export default () => (
  <div className="lds-spinner">
    <ProgressCircle size={25} />
  </div>
)
