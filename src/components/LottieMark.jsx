// lottie-react wrapper. Loads a JSON placeholder by URL; if it 404s or fails,
// renders the provided fallback (so the layout never breaks before real JSON arrives).
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

export function LottieMark({ src, className = '', loop = true, autoplay = true, fallback = null }) {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error('missing lottie')
        return r.json()
      })
      .then((json) => alive && setData(json))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [src])

  if (failed || (!data && fallback)) return <span className={className}>{fallback}</span>
  if (!data) return <span className={className} aria-hidden="true" />
  return (
    <Lottie animationData={data} loop={loop} autoplay={autoplay} className={className} />
  )
}
