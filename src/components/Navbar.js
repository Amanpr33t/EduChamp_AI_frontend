import { Link } from "react-router-dom"
import { Fragment } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaPen } from "react-icons/fa"
//This component is the navigation bar
function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const isError = useSelector(state => state.Error.isError) //It is true if an error occurs while fetching stories in the Home component
    return (
        <Fragment>
            <div className="fixed z-40 top-0 w-full">
                <nav className=" flex flex-row justify-between items-center  h-16 w-full bg-white border-b shadow" >
                    <div className="flex flex-row pl-2 sm:pl-12">
                        <Link to='/' className='font-semibold text-3xl sm:text-4xl italic text-gray-600' >Story Sculptor </Link>
                        <FaPen role="svg" className="font-semibold text-3xl text-gray-600 mt-2" />
                    </div>
                    {!isError && location.pathname !== '/form' && localStorage.getItem('email_AI_story') && <button type="button" className=" bg-blue-500 text-white font-semibold p-1.5 rounded-lg mr-2" onClick={() => {
                        localStorage.removeItem('email_AI_story')
                        navigate('/')
                    }}>Logout </button>}
                </nav>
            </div>
        </Fragment>
    )
}
export default Navbar