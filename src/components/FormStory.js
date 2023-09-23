import { FaSearch, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Fragment, useState, useRef, useEffect } from "react";
import ModalAlert from "./ModalAlert";
import ThemeModal from "./ThemeModal";
import AIResponseForm from "./AIResponseForm";

function FormStory() {
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [allData, setAllData] = useState([])
    const [promiseResolved, setPromiseResolved] = useState(true)
    const [alert, setAlert] = useState({
        isAlert: false,
        message: '',
        type: ''
    })
    const [showThemeModal, setShowThemeModal] = useState(false)
    const [theme, setTheme] = useState('')
    const [initialMessage, setInitialMessage] = useState(true)

    const ref = useRef(null)

    const alertModalRemover = () => {
        setAlert({
            isAlert: false,
            message: '',
            type: ''
        })
    }

    useEffect(() => {
        if (allData.length > 0) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            })
        }
    }, [allData.length])

    useEffect(() => {
        if (allData.length === 0) {
            setInitialMessage(true)
        } else {
            setInitialMessage(false)
        }
    }, [allData.length])


    const storyGenerator = async () => {
        setInitialMessage(false)
        setShowThemeModal(false)
        let promptData = []
        allData && allData.length > 0 && allData.forEach(item => {
            promptData.push(item.prompt + ' ')
        })
        promptData.push(prompt + ' ')
        setAllData(allData => [...allData, { prompt, response: null }])
        setPromiseResolved(false)
        try {
            const response = await fetch('https://educhamp-ai-backend.onrender.com/story/create_story', {
                method: 'POST',
                body: JSON.stringify({
                    promptInput: promptData.toString(),
                    theme
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            if (data.response) {
                setPromiseResolved(true)
                setAllData(allData => [...allData.slice(0, -1), { prompt, response: data.response, theme: data.theme }])
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setAllData(allData => [...allData.slice(0, -1)])
            setPromiseResolved(true)
            setAlert({
                isAlert: true,
                message: 'Some error occured. Try again.',
                type: 'warning'
            })
        }
    }
    const saveStory = async () => {
        if (!promiseResolved || saveLoading) {
            return
        }
        let prompt = allData[0].prompt.charAt(0).toUpperCase() + allData[0].prompt.slice(1)
        let story = allData[allData.length - 1].response
        let theme = allData[allData.length - 1].theme
        setSaveLoading(true)
        try {
            const response = await fetch('https://educhamp-ai-backend.onrender.com/story/add_story', {
                method: 'POST',
                body: JSON.stringify({ prompt, story, theme }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            if (data.status === 'ok') {
                setSaveLoading(false)
                setAlert({
                    isAlert: true,
                    message: 'Story has been successfully saved.',
                    type: 'success'
                })
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setSaveLoading(false)
            setAlert({
                isAlert: true,
                message: 'Some error occured. Try again.',
                type: 'warning'
            })
        }
    }

    const searchClick = () => {
        if (!prompt || !promiseResolved || saveLoading) {
            return
        }
        setShowThemeModal(true)
    }

    return (
        <Fragment>
            {alert.isAlert && <ModalAlert type={alert.type} message={alert.message} alertModalRemover={alertModalRemover} />}

            {showThemeModal && <ThemeModal themeSetter={data => setTheme(data)} showThemeModalSetter={() => setShowThemeModal(false)} theme={theme} storyGenerator={storyGenerator} />}

            <div className={`flex flex-col place-content-center ${alert.isAlert || showThemeModal ? 'blur' : ''}`} onClick={alertModalRemover}>
                <button type="button" className="z-50 w-fit fixed top-3.5 md:top-16 right-2 md:left-2 bg-blue-400  mt-0 md:mt-2  text-white font-medium p-1 rounded-lg flex flex-row gap-2" onClick={() => navigate('/')}>
                    <FaHome className=" bg-blue-400 fill-white text-3xl " />
                    <p className=" text-lg">Home</p>
                </button>
                <div className="z-10 fixed  top-14 pb-4 w-full flex flex-row place-items-center place-content-center">
                    <input className="w-3/4 sm:w-2/3 md:w-1/2 mt-4 h-14 pl-2 pr-10 border-2 border-gray-300 rounded-xl" type="text" id="prompt" name="prompt" placeholder='Enter story prompt' value={prompt} onChange={e => {
                        setPrompt(e.target.value.trimStart())
                    }} />
                    <FaSearch className=" fill-gray-400 text-4xl h-full mt-3 pl-1 pr-1 pb-2 pt-3 -ml-10 cursor-pointer" onClick={searchClick} />
                </div>
                {initialMessage && <div className="w-full flex justify-center fixed top-48 ">
                    <p className="ml-4 mr-4 text-center">Enter a prompt to get exciting stories.</p>
                </div>}

                <div className="w-full mt-36" >

                    {allData && allData.length > 0 && allData.map(item => {
                        return <AIResponseForm item={item} />
                    })
                    }

                    <div ref={ref} className="h-16" />
                </div>

                {allData && allData.length > 0 && allData[0].response &&
                    <div className=' fixed bottom-0 w-full pt-2 pb-2 flex justify-center bg-white'>
                        <div className="h-10 bg-blue-500 flex flex-row rounded-lg ">
                            {saveLoading && <div role="status">
                                <svg aria-hidden="true" className="mt-1.5 ml-1 w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>}
                            <button type="button" className="text-white font-medium p-1 " onClick={saveStory}>Save Story </button>
                        </div>
                    </div>}

            </div >
        </Fragment>
    );
}

export default FormStory;



