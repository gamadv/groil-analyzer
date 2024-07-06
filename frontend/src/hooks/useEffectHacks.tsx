import { useEffect } from 'react'

export function useOnMount(callback: any) {
    useEffect(callback, [])
}