'use client'
import styles from '@/app/page.module.css'
import '@/app/globals.css'
import SignIn from '@/app/components/SignIn'

const SignInPage = () => {
  return (
    <main className={styles.main}>
      <SignIn/>
    </main>
  )
}

export default SignInPage