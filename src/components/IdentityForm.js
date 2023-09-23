
import { Fragment } from "react"

function IdentityForm() {
    return (
        <Fragment>
            <div className="fixed top-32 w-full">
                <form>
                    <label for="email">First name:</label>
                    <input type="text" id="email" name="email" />
                    <div className='mt-3 mb-3 flex justify-center'>
                        <button type="button" className=" bg-blue-400 text-white font-medium p-1.5 rounded-lg flex flex-row gap-2">Close</button>
                    </div>
                </form>

            </div>
        </Fragment>
    )
}
export default IdentityForm