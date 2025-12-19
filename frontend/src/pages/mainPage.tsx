import {Header} from "./header.tsx";
import {Post} from "./post.tsx";

export const MainPage = () => {
    return (
        <div id="root">
            <Header/>
            <div className="content-container">
                <Post/>
            </div>
        </div>
    )
}
