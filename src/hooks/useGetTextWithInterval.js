import { useCallback, useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

export default function useGetTextWithInterval (url, interval = 3000, deps = [], shouldGet) {
    const [res, setRes] = useState({ data: '', loading: true, error: null })

    const timeoutRef = useRef(null)

    const get = useCallback(() => {
        if (!shouldGet) return
        return wretch(url)
            .get()
            .text(res => {
                setRes({ data: res, loading: false, error: null })
                timeoutRef.current = window.setTimeout(get, interval)
            })
            .catch(err => setRes({ data: '', loading: false, error: err }))
    }, [url, interval, shouldGet])

    useEffect(() => {
        if (shouldGet) get()
    }, [get, shouldGet, ...deps])

    return res
}
