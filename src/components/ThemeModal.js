
import { Fragment } from "react"

//This modal is used to provide a list of themes for the user to choose from
function ThemeModal(props) {
    /*
    The component gets the following props:
    1) themeSetter: A function used to select the theme chosen by the user
    2)  showThemeModalSetter: A function used to close the modal when a user clicks outside the modal
    3) theme: The theme selected by the user
    4) storyGenerator: A function used to generate a story once a user has selected a theme
    */
    const { themeSetter, showThemeModalSetter, theme, storyGenerator } = props

    return (
        <Fragment>
            <div className="z-30 fixed top-0 pb-4 w-full h-screen flex justify-center" onClick={showThemeModalSetter}>
                <div className="p-3 mt-24 bg-white  border border-gray-200  rounded-lg shadow-xl mb-8 h-fit" onClick={e => e.stopPropagation()}>
                    <p className="text-lg font-semibold mb-2">Select a theme for the story</p>
                    <div>
                        <div className="flex items-center mb-1">
                            <input name="theme" id="Humor" type="radio" value="humor" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => themeSetter(e.target.value)} />
                            <label htmlFor="Humor" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300" >Humor</label>
                        </div>
                        <div className="flex items-center mb-1">
                            <input name='theme' id="Suspense" type="radio" value="suspense" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => themeSetter(e.target.value)} />
                            <label htmlFor="Suspense" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">Suspense</label>
                        </div>
                        <div className="flex items-center mb-1">
                            <input name="theme" id="Humor" type="radio" value="thriller" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => themeSetter(e.target.value)} />
                            <label htmlFor="Humor" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">Thriller</label>
                        </div>
                        <div className="flex items-center mb-1">
                            <input name="theme" id="Suspense" type="radio" value="romantic" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => themeSetter(e.target.value)} />
                            <label htmlFor="Suspense" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">Romantic</label>
                        </div>
                        <div className="flex items-center mb-1">
                            <input name="theme" id="Humor" type="radio" value="drama" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => themeSetter(e.target.value)} />
                            <label htmlFor="Humor" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">Drama</label>
                        </div>
                        <div className="flex items-center mb-1">
                            <input name="theme" id="Suspense" type="radio" value="none" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => themeSetter(e.target.value)} />
                            <label htmlFor="Suspense" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">None</label>
                        </div>
                    </div>
                    <div className='mt-2 flex justify-center'>
                        <button type="button" className=" bg-blue-500 text-white font-medium p-1 rounded-lg" onClick={theme ? storyGenerator : null}>Search</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ThemeModal