import './index.scss'

const Loading = () => (
  <div className="lds-spinner">
    {[...new Array(12).keys()].map((item) => {
      return <div key={item} />
    })}
  </div>
)

export default Loading
