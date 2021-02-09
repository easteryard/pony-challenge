import { useCallback, useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

export default function useGetJsonWithIntervalAndCallback (url, body, interval = 3000, callback, deps = [], shouldGet = true) {
    const [res, setRes] = useState({ data: {}, loading: true, error: null })

    const controllerRef = useRef(null)
    const timeoutRef = useRef(null)

    const get = useCallback(() => {
        if (!shouldGet) return
        controllerRef.current = new AbortController()
        return wretch(url)
            .signal(controllerRef.current)
            .json(body)
            .post()
            .json(res => {
                setRes({ data: res, loading: false, error: null })
                // callback()
                timeoutRef.current = window.setTimeout(get, 5000)
            })
            .catch(err => setRes({ data: {}, loading: false, error: err }))
    }, [url, body, shouldGet])

    const cleanup = useCallback(() => {
        controllerRef.current.abort()
        window.clearTimeout(timeoutRef.current)
    }, [controllerRef, timeoutRef])

    useEffect(() => {
        if (shouldGet) get()
        return cleanup
    }, [get, cleanup, shouldGet, ...deps])

    return [res.data, res.loading, res.error, get]
}
