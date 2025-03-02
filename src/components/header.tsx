import React from 'react'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import ButtonLogout from './buttonEffect/ButtonLogout'


export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href='/dang-nhap' >Login</Link>
        </li>
        <li>
          <Link href='/dang-ky' >Register</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  )
}
