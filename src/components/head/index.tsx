'use client'
import React from 'react'
import Head from 'next/head'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { datadogRum } from '@datadog/browser-rum'

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
      <title></title>
      <meta
        name='naver-site-verification'
        content='e93f4294a35ed224f628eaaa4058953906be709f'
      />
      <meta
        name='viewport'
        content='minimum-scale=1.0, initial-scale=1.0, maximun-scale=1.0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
    </Head>
  )
}

export default CustomHead
