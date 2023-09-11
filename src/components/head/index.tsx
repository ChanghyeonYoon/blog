'use client'
import React from 'react'
import Head from 'next/head'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import Script from 'next/script'
import { datadogRum } from '@datadog/browser-rum'

const CLARITY_SCRIPT = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_KEY}")`

const CustomHead = () => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Init Firebase
      const app = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      })
      getAnalytics(app)
      // Init Datadog
      datadogRum.init({
        applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || '',
        clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
        site: 'us5.datadoghq.com',
        service: 'blog',
        env: process.env.NODE_ENV,
        sessionSampleRate: 100,
        premiumSampleRate: 100,
        trackUserInteractions: true,
        defaultPrivacyLevel: 'mask-user-input'
      })
    }
  }, [])
  return (
    <Head>
      <Script
        id='ms-clarity'
        strategy='afterInteractive'
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: CLARITY_SCRIPT
        }}
      />
    </Head>
  )
}

export default CustomHead
