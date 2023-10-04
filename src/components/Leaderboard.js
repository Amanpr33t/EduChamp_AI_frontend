import { Fragment, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa"

/*This component is used to show top 10 most liked stories to the user.
  It get the following props:
  1) blurSetter: This function is used to blur the background when user clicks on a story in this component to open it in the ViesStoryModal component
  2) singleStorySetter: This function is run when the user clicks oa story. It is used to send data regarding the story to the ViewStoryModal component
  3) topStories: Top 10 most liked stories
  4) setLeaderBoardOnscreen: This function is used to not show the leaderBoard on the home page when the screen has smaller width.
  5) isLeaderBoardOnFullScreen: If it is true, then the leaderBoard is not shown on the home page, rather it is shown on the full screen
  6) isBlur: If set to true, the LeaderBoard component will be blurred
  */
function Leaderboard(props) {
    const { blurSetter, topStories, singleStorySetter, setLeaderBoardOnFullScreen, isLeaderBoardOnFullScreen, isBlur} = props
    const navigate = useNavigate()

    useEffect(() => {
        if (topStories.length === 0) {
            navigate('/')
        }
    }, [navigate, topStories.length])

    let index = 0 //This variable is used to add an index number to the top 10 stories

    // This function is used to define how the number of likes stories have will be shown to the user. 
    const votesSetter = (votes) => {
        if (+votes >= 100000) {
            return `${(+votes / 1000000).toFixed(2)}m`
        } else if (+votes >= 1000) {
            return `${(+votes / 1000).toFixed(2)}k`
        } else {
            return +votes
        }
    }
    return (
        <Fragment>
            {/*ViewStoryModal is used to show a single story on which user has clicked */}


            <div  className={`${isBlur ? 'blur' : ''} ${isLeaderBoardOnFullScreen ? 'w-full pt-20  flex justify-center' : ' hidden md:flex flex-col place-items-center w-1/3 lg:w-1/4  pt-16  h-screen fixed top-0 left-0   z-40'} `}>

                {/*The following button when clicked, takes the user to the home page */}
                {isLeaderBoardOnFullScreen && <button type="button" className="z-50 w-fit fixed top-16 left-2 bg-blue-500  mt-2 md:mt-2   text-white font-medium p-1 rounded-lg flex flex-row gap-2" onClick={() => {
                    setLeaderBoardOnFullScreen()
                }}>
                    <FaHome className=" bg-blue-500 fill-white text-2xl -mr-1.5" />
                    <p className=" text-lg">Home</p>
                </button>}

                {!isLeaderBoardOnFullScreen && <div className='absolute -right-24 top-14  flex justify-center gap-3 mt-4 z-50'>
                    {/*This button to used to navigate to StoryForm component */}
                    <button type="button" className=" bg-blue-500 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => navigate('/form')}>Add Story</button>
                </div>}

                <div className={`border-t-4 border-white pb-2 w-full text-center ${isLeaderBoardOnFullScreen ? 'pt-12 fixed top-16  z-40  bg-white' : 'pt-4 bg-gray-800'} `}>
                    <h1 className={!isLeaderBoardOnFullScreen ? 'text-2xl font-semibold text-white' : 'text-3xl font-semibold text-gray-700'}>Top 10 Stories</h1>
                </div>

                <div className={isLeaderBoardOnFullScreen ? 'mt-20 sm:ml-0 sm:mr-0  w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 pb-10 ' : 'h-full w-full overflow-y-auto overflow-x-hidden shadow-xl'}>
                    <table className={`table-auto ${isLeaderBoardOnFullScreen ? 'w-full' : ''}`}>
                        <thead className={`shadow-md h-16  ${isLeaderBoardOnFullScreen ? 'bg-gray-700' : 'bg-gray-500'} `} >
                            <tr className="text-xl font-bold">
                                {isLeaderBoardOnFullScreen && <th></th>}
                                <th className={isLeaderBoardOnFullScreen ? 'text-white' : 'text-white'}>Story Prompt</th>
                                <th className={`${isLeaderBoardOnFullScreen ? 'w-20 md:w-36 text-white' : 'pr-1 pl-1 text-white'}`}>Likes</th>
                            </tr>
                        </thead>
                        {topStories && topStories.length > 0 && <tbody className={`${isLeaderBoardOnFullScreen ? 'bg-gray-50' : ''}`}>
                            {topStories.map(story => {
                                isLeaderBoardOnFullScreen && index++
                                return <tr key={story._id} className={`  transition ease-in-out delay-75 hover:-translate-y-1  duration-150 hover:bg-gray-300 cursor-pointer ${isLeaderBoardOnFullScreen ? ' hover:scale-110 shadow' : 'hover:scale-105 shadow-md'}`} onClick={() => {
                                    blurSetter()
                                    singleStorySetter({
                                        prompt: story.prompt,
                                        story: story.story,
                                        theme: story.theme
                                    })
                                }}>
                                    {isLeaderBoardOnFullScreen && <td className="text-lg font-bold text-center pt-4 pb-4 pr-2">{index}</td>}
                                    <td className={`text-lg font-medium ${isLeaderBoardOnFullScreen ? ' pl-1 sm:pl-2 sm:pr-2' : 'pr-1.5 pl-1.5  '}   pt-4 pb-4 `}>{story.prompt} </td>
                                    <td className="text-center text-lg font-semibold pt-6 pb-6">{votesSetter(story.upVotes.length)}</td>
                                </tr>
                            })}
                        </tbody>}
                    </table>
                </div>
            </div>

        </Fragment>
    )
}
export default Leaderboard




