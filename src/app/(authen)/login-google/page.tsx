import React from "react";
import LoadingAnimation from "@/components/common/LoadingAnimation";
import UeGoogleLogin from "@/app/header/useGoogleLogin";
import {auth} from "@/auth"
import LoginGoogle from "./login-google";

import styles from './google.module.css'
export default async function page() {
  const accountGoogle = await auth();
  console.log(accountGoogle)
  return (
    <div className={`${styles.background} bg-background `}>
       {!accountGoogle &&<LoginGoogle />}
      <LoadingAnimation />
      {accountGoogle && <UeGoogleLogin accountGoogle = {accountGoogle} />}
    </div>
  );
}
