import { Link } from "react-router-dom"
import { Fragment } from "react"
import { FaThumbsUp } from "react-icons/fa"

function Card(props) {
    const { story, blurSetter, singleStorySetter } = props

    return (
        <Fragment>
            < div key={story._id} className="relative w-11/12 sm:w-4/5 lg:w-3/4 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow mb-16 ">
                <p className="absolute left-0 -top-6 pl-1 pr-1 text-white font-semibold z-10 bg-orange-400 rounded-md">{story.theme.charAt(0).toUpperCase() + story.theme.slice(1)}</p>

                <Link to="/" onClick={() => {
                    blurSetter()
                    singleStorySetter({
                        prompt: story.prompt,
                        story: story.story,
                        theme: story.theme
                    })
                }}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{story.prompt}</h5>
                </Link>
                <p className="max-h-36 mb-3 font-normal text-gray-700 dark:text-gray-400 text-clip overflow-hidden ">{story.story}</p>
                <div className=' flex justify-center gap-10 mt-3'>
                    <div>
                        <FaThumbsUp className={`text-4xl text-blue-300 cursor-pointer`} />
                    </div>
                    <button type="button " className=" bg-green-500 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => {
                        blurSetter(true)
                        singleStorySetter({
                            prompt: story.prompt,
                            story: story.story,
                            theme: story.theme
                        })
                    }}>Read more</button>
                </div>
            </div>
        </Fragment>
    )
}
export default Card