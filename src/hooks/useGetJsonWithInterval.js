import { useCallback, useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

export default function useGetJsonWithInterval (url, interval = 3000, deps = [], shouldGet = true) {
    const [res, setRes] = useState({ data: {}, loading: true, error: null })

    const controllerRef = useRef(null)
    const timeoutRef = useRef(null)

    const get = useCallback(() => {
        if (!shouldGet) return
        controllerRef.current = new AbortController()
        return wretch(url)
            .signal(controllerRef.current)
            .get()
            .json(res => {
                setRes({ data: res, loading: false, error: null })
                timeoutRef.current = window.setTimeout(get, interval)
            })
            .catch(err => setRes({ data: {}, loading: false, error: err }))
    }, [url, interval, shouldGet])

    const cleanup = useCallback(() => {
        controllerRef.current.abort()
        window.clearTimeout(timeoutRef.current)
    }, [controllerRef, timeoutRef])

    useEffect(() => {
        if (shouldGet) get()
        return cleanup
    }, [get, cleanup, shouldGet, ...deps])

    return [res.data, res.loading, res.error]
}
