import {Link} from "react-router-dom";
import AuthContext from "../authContext.ts";
import {useContext} from "react";

export const Header = () => {

    const {username} = useContext(AuthContext);

    return (
        <header id="header" className="flex align-center">
            <div id="app-logo">
                <img src="/assets/dddforumlogo.png" alt="DDD Forum Logo"/>
            </div>
            <div id="title-container">
                <h1>Domain-Driven Designers</h1>
                <h3>Where awesome domain driven designers are made</h3>
                <a href="/submit">submit</a>
            </div>
            <div className="header-actions-container">
                {!username && (
                    <div className="header-action-button">
                        <Link to="/register">Join</Link>
                    </div>
                )}
                {username && (
                    <>
                        <div className="header-login-name">
                            {username}
                        </div>
                        <div className="header-action-button">
                            <Link to="/logout">Logout</Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    )
}
