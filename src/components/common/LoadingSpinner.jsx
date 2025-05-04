import { Oval } from 'react-loader-spinner'

const LoadingSpinner = ({ size = 40, color = '#0066CC' }) => {
  return (
    <div className="flex justify-center items-center">
      <Oval
        height={size}
        width={size}
        color={color}
        visible={true}
        secondaryColor="#CCE0FF"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  )
}

export default LoadingSpinner