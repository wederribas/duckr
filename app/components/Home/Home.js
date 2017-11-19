import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>
        {
          'The real time, cloud based, modular, growth hacks, social platform. In the cloud'
        }
      </p>
    </div>
  )
}
