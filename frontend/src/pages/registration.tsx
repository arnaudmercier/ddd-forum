import {Layout} from "./layout"
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../config.json"

export const Registration = () => {
    const navigate = useNavigate();
    const timeoutInMsBeforeSuccessfulRedirect = 3000;

    function register(formData: FormData) {
        const email = formData.get("email") as string
        const username = formData.get("username") as string
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string

        if (!email || !username || !firstName || !lastName) {
            toast.error('Missing required fields', {'position': 'top-right'});
            return
        }

        const user = {email: email, username: username, firstName: firstName, lastName: lastName}
        console.log("Receive registration request for:" + user)
        axios
            .post(config.API_URL + "/users/new", user)
            .then((response) => {
                console.log("registration ok", response);
                toast.success("Registration successful", {
                    'position': 'top-right',
                    removeDelay: timeoutInMsBeforeSuccessfulRedirect
                });
                setTimeout(() => {
                    navigate('/');
                }, timeoutInMsBeforeSuccessfulRedirect);
            })
            .catch((err) => {
                console.log("registration ko", err);
                toast.error('Error from API: ' + err.message, {'position': 'top-right'});
            });
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
