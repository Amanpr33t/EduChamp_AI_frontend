
import { Fragment } from "react"

//This component is used to show a story which has been clicked on by the user
function ViewStoryModal(props) {
    /*
    The following props are passed to this component:
    1) blurFunction: A function used to blur the background when this component is active
    2) prompt: Pompt of the story
    3) story: The entire story
    4) theme: Theme of the story
    */
    const { blurFunction, prompt, story, theme } = props

    return (
        <Fragment>
            <div className="fixed top-14 flex justify-center w-full max-h-screen z-10" onClick={blurFunction}>

                <div className="mt-5 w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 h-4/5  flex flex-col border-4 shadow-sm rounded-xl border-gray-200 bg-white" onClick={e => e.stopPropagation()}>
                    <p className="w-fit pl-1 pr-1 text-white font-semibold z-10 bg-orange-400 rounded-md ml-4 mt-2 mb-2">{theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
                    <div className="flex flex-shrink-0 items-center justify-between pb-2 pl-4 pr-4 ">
                        <p className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">{prompt}</p>
                    </div>
                    <div >
                        <p className="overflow-y-scroll max-h-96 pt-2 pb-2 pl-4 pr-4 mb-3"> {story}</p>
                    </div>
                    <div className='mt-3 mb-3 flex justify-center'>
                        <button type="button" className=" bg-blue-500 text-white font-medium p-1.5 rounded-lg flex flex-row gap-2" onClick={blurFunction}>Close </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ViewStoryModal