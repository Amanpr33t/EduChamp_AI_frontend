import { Fragment } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { FaHome } from "react-icons/fa"

function Leaderboard(props) {
    const { blurSetter, singleStorySetter, topStories: stories } = props
    const location = useLocation()
    const navigate = useNavigate()
    let index = 0
    const getTopStories = useSelector(state => state.TopStories.topStories)
    const topStories = location.pathname === '/leader_board' ? getTopStories : stories

    const votesSetter = (votes) => {
        if (+votes >= 100000) {
            return `${(+votes / 1000000).toFixed(2)}m`
        } else {
            return `${(+votes / 1000).toFixed(2)}k`
        }
    }

    return (
        <Fragment>
            <div className={` ${location.pathname === '/leader_board' ? 'w-full pt-20  flex justify-center' : ' relative hidden md:flex flex-col place-items-center w-1/3 lg:w-1/4  pt-16  h-screen'} `}>

                {location.pathname === '/leader_board' && <button type="button" className="z-50 w-fit fixed top-16 left-2 bg-blue-400  mt-2 md:mt-2 z-50  text-white font-medium p-1 rounded-lg flex flex-row gap-2" onClick={() => navigate('/')}>
                    <FaHome className=" bg-blue-400 fill-white text-3xl " />
                    <p className=" text-lg">Home</p>
                </button>}


                <div className={`pb-2 w-full text-center ${location.pathname === '/leader_board' ? 'pt-12 fixed top-16  z-40  bg-white' : 'pt-4 bg-gray-300'} `}>
                    <h1 className={`${location.pathname !== '/leader_board' ? 'text-2xl' : 'text-xl'} font-semibold`}>Top 10 Stories</h1>
                </div>


                {location.pathname !== '/leader_board' && <div className='absolute -right-24 top-14  flex justify-center gap-3 mt-4'>
                    <button type="button" className=" bg-blue-400 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => navigate('/form')}>Add Story</button>
                </div>}


                <div className={location.pathname === '/leader_board' ? 'mt-20 sm:ml-0 sm:mr-0  w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 pb-10 ' : 'h-full w-full overflow-y-auto overflow-x-hidden bg-gray-100'}>
                    <table className={`table-auto ${location.pathname === '/leader_board' ? 'w-full' : ''}`}>
                        <thead className={`h-16  ${location.pathname === '/leader_board' ? 'bg-gray-200' : ''} `} >
                            <tr className="text-xl font-bold">
                                {location.pathname === '/leader_board' && <th></th>}
                                <th >Story Prompt</th>
                                <th className={`${location.pathname === '/leader_board' ? 'w-20 md:w-36' : 'pr-1 pl-1'}`}>Votes</th>
                            </tr>
                        </thead>
                        <tbody className={`${location.pathname === '/leader_board' ? 'bg-gray-100' : ''}`}>
                            {topStories && topStories.length > 0 && topStories.map(story => {
                                location.pathname === '/leader_board' && index++
                                return <tr key={story._id} className={`transition ease-in-out delay-75 hover:-translate-y-1  duration-150 hover:bg-gray-200 cursor-pointer ${location.pathname === '/leader_board' ? ' hover:scale-110' : 'hover:scale-105 '}`} onClick={() => {
                                    if (location.pathname === '/leader_board') {
                                        return
                                    }
                                    blurSetter()
                                    singleStorySetter({
                                        prompt: story.prompt,
                                        story: story.story,
                                        theme: story.theme
                                    })
                                }}>
                                    {location.pathname === '/leader_board' && <td className="text-lg font-bold text-center pt-4 pb-4 pr-2">{index}</td>}
                                    <td className={`${location.pathname === '/leader_board' ? ' pl-1 sm:pl-2 sm:pr-2' : 'pr-1.5 pl-1.5  '}   pt-4 pb-4`}>{story.prompt} </td>
                                    <td className="text-center text-lg font-semibold pt-6 pb-6">{votesSetter(story.upvotes)}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </Fragment>
    )
}
export default Leaderboard




