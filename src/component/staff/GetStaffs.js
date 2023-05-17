import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../constant/constants";

export default function GetStaffs(query) {

    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(false);
    const [staffs, setStaffs]=useState([]);
    const [hasMore, setHasMore]=useState(false);

    useEffect(() => {
        setStaffs([]);
    },[query])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let controller = new AbortController();

        axios({
            method: 'GET',
            url: baseUrl+"get-staffs",
            params: query,
            //cancelToken: new axios.CancelToken(c => cancel=c)
            signal: controller.signal
        }).then(res => {
            console.log(res)
            setStaffs(prevData => {
                console.log("😀");
                console.log(prevData);
                console.log("*😀");
                console.log(res.data.data.results);
                return [...new Set([...prevData, ...res.data.data.results])]
            });

            console.log("DOCUMENT COUNT"+res.data.data.documentCount);
            setHasMore(res.data.data.documentCount>0);
            setLoading(false);
        }).catch(e => {
            console.log("ERROR HAPPANED IN AXIOS")
            if(axios.isCancel(e)) return;
            setError(true);
        })
        return () =>controller.abort()
            //cancel()
    }, [query,query.page]);

    console.log("😍😎😍"+loading, error, staffs, hasMore);

    return {loading, error, staffs, hasMore}
}