import {Layout} from "./layout"
import toast, {Toaster} from "react-hot-toast";

export const Registration = () => {
    function register(formData: FormData) {
        const email = formData.get("email") as string
        const username = formData.get("username") as string
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string

        if (!email || !username || !firstName || !lastName) {
            toast.error('Missing required fields', {'position': 'top-right'});
            return
        }

        console.log("Receive registration request for:" + {email, username, firstName, lastName})
    }

    return (
        <Layout>
            <Toaster/>
            <form action={register}>
                <div className="registration-form">
                    <div>Create Account</div>
                    <input className="registration email"
                           type="email" placeholder="email"
                           name="email"/>
                    <input
                        className="registatation-input username"
                        type="text"
                        placeholder="username"
                        name="username"
                    />
                    <input
                        className="registatation-input username"
                        type="text"
                        placeholder="first name"
                        name="firstName"
                    />
                    <input
                        className="registatation-input username"
                        type="text"
                        placeholder="last name"
                        name="lastName"
                    />
                    <div>
                        <button className="submit-button" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
