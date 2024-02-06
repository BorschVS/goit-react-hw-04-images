import { ThreeDots } from 'react-loader-spinner';
export default function Loader() {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="rgb(134, 132, 248)"
      ariaLabel="triangle-loading"
      wrapperStyle={{
        display: 'block',
        margin: '0 auto',
      }}
      wrapperClass=""
    />
  );
}
