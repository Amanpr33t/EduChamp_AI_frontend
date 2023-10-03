
import { Fragment, useState } from "react"

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

    const [inputElement, setInputElement] = useState(false)

    return (
        <Fragment>
            <div className="z-30 fixed top-0 pb-4 w-full h-screen flex justify-center" onClick={showThemeModalSetter}>
                {!inputElement && <div className="p-2 mt-20 bg-white  border border-gray-200  rounded-lg shadow-xl mb-8 h-fit" onClick={e => e.stopPropagation()}>
                    <p className="text-lg font-semibold mb-2">Select a theme for the story</p>
                    <div>
                        <div className="flex items-center mb-1">
                            <input name="theme" id="Humor" type="radio" value="humor" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={e => {
                                themeSetter(e.target.value)
                            }} />
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
                    <div className="mt-3 border border-gray-300"></div>
                    <div className="flex flex-row w-64 h-fit mt-1 mb-1 ">
                        <p className="text-red-500 pr-1 font-semibold cursor-pointer" onClick={()=>{
                            setInputElement(true)
                            themeSetter('')
                        }}>Click here</p>
                        <p >to add a custom theme</p>
                    </div>
                    
                </div>}

                {inputElement && <form className="flex flex-col p-8 mt-20 bg-white  border border-gray-200  rounded-lg shadow-xl mb-8 h-fit" onClick={e => e.stopPropagation()}>
                    <label htmlFor="themeInput" className="text-lg font-semibold mb-1">Add your own theme</label>
                    <input className="w-64  border-2 border-gray-400 rounded-md p-1" type="text" id="themeInput" name="themeInput" placeholder='Enter a theme...' autoComplete="off" value={theme} onChange={e => themeSetter(e.target.value.trimStart())} />
                    <div className='mt-4 flex justify-center'>
                        <button type="submit" className=" bg-blue-500 text-white font-medium p-1 rounded-lg" onClick={theme ? storyGenerator : null} >Search</button>
                    </div>
                </form>}
            </div>
        </Fragment>
    )
}
export default ThemeModal