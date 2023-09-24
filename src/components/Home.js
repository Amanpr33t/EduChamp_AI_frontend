
import { Fragment, useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ViewStoryModal from "./ViewStoryModal"
import { useDispatch } from "react-redux";
import { TopStoriesActions } from "../store/slices/topStoriesSlice";
import Card from "./Card";
import Leaderboard from "./Leaderboard";
import AlertModal from "./AlertModal";
import { ErrorActions } from "../store/slices/errorSlice";

/*
This component is our home page. It has the following functions:
1) Its fetches all the stories saved in the database and shows them to the user by feeding each story to the Card component.
2) For screen with width larger than 768px, it shows the leaderboard on the left side of the page. The leaderboard contains top 10 most liked stories.
*/
function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isBlur, setIsBlur] = useState(false) //This state is used too blur the background when we want to show the AlertModal component or the ViewStoryModal component.

    const blurFunction = () => {
        setIsBlur(false)
    }
    const [allStories, setAllStories] = useState() // This state contains all the stories fetched from the database
    const [topStories, setTopStories] = useState() // This state contains top 10 stories fetched most liked stories
    const [loading, setLoading] = useState(true) // This satte is used to set the loading spinner when our stories are being fetched from the database
    const [error, setError] = useState(false) // This state is used to show an error message when some error occurs while fetching stories.
    const [singleStory, setSingleStory] = useState() // This state contains the story user wants to open in the ViesStoryModal
    const [alert, setAlert] = useState({
        isAlert: false,
        message: '',
        type: ''
    }) // This state is used to show AlertModal when the user clicks on the like button in the Card component and an error occurs.

    //This function is used to remove the AlertModal from the screen
    const alertModalRemover = () => {
        setAlert({
            isAlert: false,
            message: '',
            type: ''
        })
    }

    //This function is passed as a prop to the Card component. It managed the state used to show the AlertModal to the user.
    const alertSetter = (data) => {
        setAlert(data)
    }

    //This function is used to fetch stories from the database
    const fetchStories = useCallback(async () => {
        setLoading(true)
        setError(false)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/story/get_stories`)
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            if (data.status === 'ok') {
                setAllStories(data.stories)
                try {
                    await fetchTopStories()
                } catch (error) {
                    throw new Error('Some error occured')
                }
                setError(false)
                setLoading(false)
                dispatch(ErrorActions.setError(false))
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setError(true)
            setLoading(false)
            dispatch(ErrorActions.setError(true))
        }
    }, [dispatch])

    //This function is used to fetch top 10 most liked stories from the database
    const fetchTopStories = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/story/get_top_stories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Some error occured')
        }
        const data = await response.json()
        if (data.status === 'ok') {
            setTopStories(data.stories)
        } else {
            throw new Error('Some error occured')
        }
    }

    //useEffect hook is use to run the fetchStories function whenever the Home component is re-evaluated
    useEffect(() => {
        fetchStories()
    }, [fetchStories])

    //The following function is used to manage error and loading states. It is passed as props to Card component
    const errorLoadingSetter = () => {
        setError(true)
        setLoading(false)
        dispatch(ErrorActions.setError(true))
    }

    return (
        <Fragment>

            {/* AlertModal is used to show alert when the user clicks on the like button and some error occurs */}
            {alert.isAlert && <AlertModal type={alert.type} message={alert.message} alertModalRemover={alertModalRemover} />}

            {/*ViewStoryModal is used to show a single story on which user has clicked */}
            {isBlur && !alert.isAlert && <ViewStoryModal blurFunction={blurFunction} prompt={singleStory.prompt} story={singleStory.story} theme={singleStory.theme} />}


            {/*The following code is used to show a spinner when the stories are being fetched from the database */}
            {!error && loading &&
                < div className="fixed top-40 w-full flex justify-center" >
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div>
                </div>
            }

            {/*The following code is used to show an error message to the user when an error occurs while fetching stories from the database */}
            {error && !loading &&
                <div className="fixed top-40 w-full flex flex-col place-items-center">
                    <p >Some error occured.</p>
                    <p className="text-red-500 cursor-pointer" onClick={fetchStories}>Reload</p>
                </div>}

            <div className='w-full z-20 bg-gray-100 fixed top-14 flex justify-start md:hidden gap-3 pt-4 pb-2 pl-2'>
                {/*The following button navigates the user to a form where the user can add get a new story from the openAi and then save it*/}
                <button type="button" className=" bg-blue-500 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => navigate('/form')}>Add Story</button>
                {/*The following buttons is shown only on screens with width smaller than 768px. It routes the user to the a leaderBoard that shows top 10 stories */}
                <button type="button" className="md:hidden bg-blue-500 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => {
                    dispatch(TopStoriesActions.setTopStories(topStories)) //We add the top stories to the redux store
                    navigate('/leader_board')
                }}>Top Stories</button>
            </div>


            {/*The following code contains a LeaderBoard and Cards shown the user when stories have been successfully fetched from the database */}
            {!error && !loading && <div className={`flex justify-center md:flex-row ${isBlur || alert.isAlert ? 'blur' : ''} bg-gray-100`} onClick={alertModalRemover}>

                {/*The LeaderBoard component is used to show the top 10 stories to the user */}
                <Leaderboard blurSetter={() => setIsBlur(true)} singleStorySetter={(data) => setSingleStory(data)} topStories={topStories} />

                <div className="  w-1/3 lg:w-1/4  h-screen "></div>
                <div className=" pt-36  md:w-2/3 lg:w-3/4 min-h-screen flex flex-col place-items-center">
                    {/*The following code is used to feed all to stories to the Card component */}
                    {allStories && allStories.length > 0 && allStories.map(story => {
                        return <Card key={story._id} story={story} blurSetter={() => setIsBlur(true)} singleStorySetter={(data) => setSingleStory(data)} alertSetter={alertSetter} fetchTopStories={fetchTopStories} errorLoadingSetter={errorLoadingSetter} />
                    })}
                </div>
            </div>}
        </Fragment >
    )
}

export default Home