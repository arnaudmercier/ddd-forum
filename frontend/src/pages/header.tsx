import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header id="header" className="flex align-center">
            <div id="app-logo">
                <img src="../assets/dddforumlogo.png"/>
            </div>
            <div id="title-container">
                <h1>Domain-Driven Designers</h1>
                <h3>Where awesome domain driven designers are made</h3>
                <a href="/submit">submit</a>
            </div>
            <div id="header-action-button">
                <Link to="/register">Join</Link>
            </div>
        </header>
    )
}
