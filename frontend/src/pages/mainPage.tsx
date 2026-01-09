import {Layout} from "./layout.tsx";
import {PostList} from "./postList.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../config.json";

export const MainPage = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(config.API_URL + "/posts")
            .then((response) => {
                setPosts(response.data.data);
            })
    }, []);

    return (
        <Layout>
            <PostList posts={posts}/>
        </Layout>
    )
}
