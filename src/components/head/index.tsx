'use client'
import React from 'react'
import Head from 'next/head'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../config'
import { getAnalytics } from 'firebase/analytics'

const CLARITY_SCRIPT = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "itcjwzkk56")`

const CustomHead = () => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // INIT FIREBASE
      const app = initializeApp(firebaseConfig)
      getAnalytics(app)
    }
  }, [])
  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: CLARITY_SCRIPT
        }}
      />
    </Head>
  )
}

export default CustomHead
