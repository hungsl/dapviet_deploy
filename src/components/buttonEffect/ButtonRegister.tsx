'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
 
export default function ButtonRegister() {
    const router = useRouter()
    const redirectClickHere =() => {
      router.push('/register')
    }
 
  return (
    <Button className="ml-4" onClick={redirectClickHere}>click here Register</Button>
  )
}