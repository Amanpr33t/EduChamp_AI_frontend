import { Link } from "react-router-dom"
import { Fragment } from "react"

function Navbar() {
    return (
        <Fragment>
            <div className="fixed z-40 top-0 w-full">
                <nav className=" flex flex-row justify-between items-center bg-gray-600 h-16 w-full " >
                    <div>
                        <Link to='/' className='text-white font-semibold text-4xl pl-4 pr-2 italic' >AI Story</Link>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}
export default Navbar