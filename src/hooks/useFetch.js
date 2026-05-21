import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get(url, options)
      setData(res.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useMutate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (method, url, body = null) => {
    setLoading(true)
    setError(null)
    try {
      const config = { method, url }
      if (body !== null) config.data = body
      const res = await api(config)
      return res.data
    } catch (err) {
      const msg = err.response?.data?.message || err.message
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
