'use client'
import React from 'react'
import { Button } from '../ui/button'
import authApiRequest from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import styles from "@/app/header/header.module.css"
import { useLoading } from '@/app/context/loading-provider'
import { useAppContext } from '@/app/context/app-provider'

export default function ButtonLogout() {
    const {setLoading} = useLoading()
    // const {setAccessToken, setRefreshToken} = useAppContext();
    const {setIsLoggedIn} = useAppContext()
    const handleLogout = async() => {
        try {
            setLoading(true)
            await authApiRequest.logoutFromNextClientToNextServer()
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            setIsLoggedIn(false);
            // router.refresh()
            // router.push('/login')
        } catch (error) {
            handleErrorApi(
                {error}
            )
        } finally{
            setLoading(false)
        }
    }
  return (
    <Button variant="ghost" onClick={handleLogout} className={styles.dropdownItem}>
        Đăng xuất
    </Button>
  )
}
