import { useEffect, useState } from 'react'
import wretch from 'wretch'

export default function useGetJson (url, deps = [], shouldGet) {
    const [res, setRes] = useState({
        data: null,
        loading: true,
        error: null
    })

    function get () {
        wretch(url)
            .get()
            .json(res => setRes({
                data: res,
                loading: false,
                error: null
            }))
            .catch(err => setRes({
                data: null,
                loading: false,
                error: err
            }))
    }

    useEffect(() => {
        if (shouldGet) get()
    }, [get, ...deps])

    return res
}