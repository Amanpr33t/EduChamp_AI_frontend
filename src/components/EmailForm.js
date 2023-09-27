import { useNavigate } from "react-router-dom"
import { Fragment, useState } from "react"
import * as EmailValidator from 'email-validator';

// This component is used to get user email. This user email is used when the user likes or unlikes a story to store that like on the database. The email is used as a reference
function EmailForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('') //This state stores the email that user types in the input box. 
    const [emailValid, setEmailValid] = useState(true) //This state shows an alert message when the email typed by the user is not valid.

    //This function run when the user clicks on the login button.
    const emailSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            //If the user provides no email, the returns without doing anything.
            return
        }
        if (!EmailValidator.validate(email)) {
            //If the email provided by the user has an invalid format, an alert message is shown to the user
            return setEmailValid(false)
        }
        localStorage.setItem('email_AI_story', email) //Here we save the user email in our local storage
        navigate('/') //The user is routed to the home page on successful login
    }
    return (
        <Fragment>
            <div className="w-full h-screen flex justify-center bg-gray-100">
                <form className="w-11/12 sm:w-96  h-fit p-4 mt-28 flex flex-col rounded-lg border-2 border-gray-200 shadow-2xl bg-white" onSubmit={emailSubmit}>
                    <label className="text-lg font-semibold mb-1" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="border-2 border-gray-400 p-1 rounded-lg" placeholder="abc@gmail.com" autoComplete="off" value={email}
                        onChange={e => {
                            setEmail(e.target.value.trimEnd())
                            setEmailValid(true)
                        }} onBlur={() => {
                            if (!EmailValidator.validate(email)) {
                                return setEmailValid(false)
                            }
                        }} />
                    {!emailValid && <p className="text-red-500">Enter a valid email</p>}
                    <div className="w-full h-10  flex justify-center  mt-5">
                        <button type="submit" className="bg-blue-500 text-white font-medium rounded-lg pl-2 pr-2 h-8" >Login</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}
export default EmailForm