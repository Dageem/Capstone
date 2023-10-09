import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGetPostsQuery} from "./reducers/api";
function App() {

    const me = useSelector((state) => state.auth.credentials.user);
    const posts = useGetPostsQuery()

    const [load,setLoad]=useState(true)

    useEffect(()=>{
        setLoad(posts.isLoading)
    }, [posts])

    const loggedIn = me.userId;
    return load? <h1>Loading Data</h1>:loggedIn !== null ? <h1>Hello User</h1> : <h1>Hello guest</h1>;
}

export default App;
