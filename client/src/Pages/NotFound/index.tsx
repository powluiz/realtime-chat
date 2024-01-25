import { Button } from '@/components'
import defaultBackground from '@assets/default_background_green.jpg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const backgroundImage = defaultBackground
  return (
    <div
      className="flex h-dvh w-dvw items-center justify-center bg-slate-200 p-10"
      style={
        backgroundImage
          ? {
              background: `url(${backgroundImage})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '80vh',
            }
          : {}
      }
    >
      <div className="flex w-full max-w-[32rem] flex-col justify-center rounded-xl bg-white p-10 drop-shadow-md">
        <h1 className="text-center text-[7rem] font-black text-emerald-500">
          404
        </h1>
        <h1 className="text-center text-[2rem] font-extrabold text-slate-800">
          Ops, page not found!
        </h1>
        <h1 className="text-center text-[1.25rem] text-slate-800">
          I think you got lost along the way 🤔
        </h1>
        <Link to="/">
          <Button
            type="button"
            onClick={() => {}}
            className="mt-8 w-full rounded-full bg-emerald-500 px-8 py-3 text-white hover:bg-emerald-700 active:bg-emerald-600"
          >
            <h3 className="text-base font-medium text-white">Return to Home</h3>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
