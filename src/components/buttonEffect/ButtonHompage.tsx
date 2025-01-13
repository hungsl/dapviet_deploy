'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
 
export default function ButtonHompage() {
    const router = useRouter()
    const redirectClickHere =() => {
      router.push('/')
    }
 
  return (
    <Button className="ml-4" onClick={redirectClickHere}>click here Hompage</Button>
  )
}