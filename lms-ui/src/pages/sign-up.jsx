'use client'
import styles from '@/app/page.module.css'
import '@/app/globals.css'
import SignUp from '@/app/components/SignUp'

const SignUpPage = () => {
  return (
    <main className={styles.main}>
      <SignUp />
    </main>
  )
}

export default SignUpPage