import { Link } from "react-router-dom"
import { Fragment, useState, useEffect } from "react"
import { FaThumbsUp } from "react-icons/fa"

//This is the card that holds the content of a story
function Card(props) {
    /*We get the following data from props:
    1) story: The story to be passed intomthis card.
    2) blurSetter: This function blurs the background when we click on a story to open it in a modal.
    3) singleStorySetter: This function is activated when we click on a story to open it in a modal. It is used to send the story data to the modal
    4) alertSetter: This function is used to show the alert modal when an error occurs when we run the upVote function.
    5) fetchTopStories: This function is used to fetch top 10 stories
    6) errorLoadingSetter: This function is used to manage error and loading states when error occurs while executing fetchTopStories function
    */
    const { story, blurSetter, singleStorySetter, alertSetter, fetchTopStories, errorLoadingSetter } = props

    const [liked, setLiked] = useState(false) //This state manages the like button. If it is true, the story has been liked and the button turns red.

    // In  this useEffect hook, we set the current state of the like button based on the story fetched from the database.
    useEffect(() => {
        if (story.upVotes.find(email => email === localStorage.getItem('email_AI_story')) === localStorage.getItem('email_AI_story')) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [story])

    // This function runa when the user presses the like button. It increses or decreases the number of likes on a story by updating them on the database.
    const upVote = async () => {
        try {
            /*We use these query paramaeters in the url:
              1)id: MongoDB database ID of the story.
              2)email: Email of the user
              3)operation: It tells the backend app to either decrease or increse the number of upVotes by one*/
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/story/up_vote?id=${story._id}&email=${localStorage.getItem('email_AI_story')}&operation=${liked ? 'dec' : 'inc'}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            if (data.status === 'ok') {
                //If we get the desired response from the backend, we toggle the state that manages the like button.
                if (liked) {
                    setLiked(false)
                } else {
                    setLiked(true)
                }
                try {
                    await fetchTopStories()
                } catch (error) {
                    errorLoadingSetter()
                }
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            //alertModal function is used to show the alert modal when an error occurs
            alertSetter({
                isAlert: true,
                message: 'Some error occured',
                type: 'warning'
            })
        }
    }

    return (
        <Fragment>
            < div key={story._id} className="relative w-11/12 sm:w-4/5 lg:w-3/4 p-6 bg-gray-100 rounded-lg shadow-2xl mb-16 ">
                <p className="absolute left-0 -top-6 pl-1 pr-1 text-white font-semibold z-10 bg-rose-400 rounded-md">{story.theme.charAt(0).toUpperCase() + story.theme.slice(1)}</p>

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
                        <FaThumbsUp className={`text-3xl ${liked ? 'text-red-600' : 'text-gray-500'}  cursor-pointer`} onClick={upVote} />
                    </div>
                    <button type="button " className=" bg-green-500 text-white font-semibold p-1.5 rounded-lg flex flex-row gap-2" onClick={() => {
                        blurSetter()
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