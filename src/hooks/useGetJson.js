import { useCallback, useEffect, useState } from 'react'
import wretch from 'wretch'

export default function useGetJson (url, deps = [], shouldGet = true) {
    const [res, setRes] = useState({
        data: {},
        loading: true,
        error: null
    })

    const get = useCallback(() => {
        wretch(url)
            .get()
            .json(res => setRes({ data: res, loading: false, error: null }))
            .catch(err => setRes({ data: {}, loading: false, error: err }))
    }, [url])

    useEffect(() => {
        if (shouldGet) get()
    }, [get, shouldGet, ...deps])

    return [res.data, res.loading, res.error]
}
