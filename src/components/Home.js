
import { Fragment, useState, useCallback, useEffect } from "react"
import {  useNavigate } from "react-router-dom"
import ViewStoryModal from "./ViewStoryModal"
import { useDispatch } from "react-redux";
import { TopStoriesActions } from "../store/slices/topStoriesSlice";
import Card from "./Card";
import Leaderboard from "./Leaderboard";
function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isBlur, setIsBlur] = useState(false)
    const blurFunction = (boolean) => {
        setIsBlur(boolean)
    }
    const [allStories, setAllStories] = useState()
    const [topStories, setTopStories] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [singleStory, setSingleStory] = useState()

    const fetchStories = useCallback(async () => {
        setLoading(true)
        setError(false)
        try {
            const response = await fetch('https://educhamp-ai-backend.onrender.com/story/get_stories')
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            if (data.status === 'ok') {
                setAllStories(data.stories)
                await fetchTopStories()
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStories()
    }, [fetchStories])

    const fetchTopStories = async () => {
        try {
            const response = await fetch('https://educhamp-ai-backend.onrender.com/story/get_top_stories', {
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
                setError(false)
                setLoading(false)
                setTopStories(data.stories)
                return
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <Fragment>
            {isBlur && <ViewStoryModal blurFunction={blurFunction} prompt={singleStory.prompt} story={singleStory.story} theme={singleStory.theme} />}

            {!error && loading &&
                <div className="fixed top-40 w-full flex justify-center">
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

            {error && !loading &&
                <div className="fixed top-40 w-full flex flex-col place-items-center">
                    <p >Some error occured.</p>
                    <p className="text-red-500 cursor-pointer" onClick={fetchStories}>Reload</p>
                </div>
            }

            {!error && !loading && <div className={`flex justify-center md:flex-row ${isBlur || alert.isAlert ? 'blur' : ''}`}>

                <Leaderboard blurSetter={() => setIsBlur(true)} singleStorySetter={(data) => setSingleStory(data)} topStories={topStories} />

                <div className=" pt-36  md:w-2/3 lg:w-3/4 min-h-screen flex flex-col place-items-center">
                    <div className=' absolute left-2 top-14 flex  md:hidden justify-center gap-3 mt-4'>
                        <button type="button" className=" bg-blue-400 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => navigate('/form')}>AddStory</button>
                        <button type="button" className="md:hidden bg-blue-400 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => {
                            dispatch(TopStoriesActions.setTopStories(topStories))
                            navigate('/leader_board')
                        }}>Top Stories</button>
                    </div>
                    {allStories && allStories.length > 0 && allStories.map(story => {
                        return <Card key={story._id} story={story} blurSetter={() => setIsBlur(true)} singleStorySetter={(data) => setSingleStory(data)} />
                    })}
                </div>
            </div>}
        </Fragment >
    )
}

export default Home