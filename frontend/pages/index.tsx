import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useState} from 'react'
import styles from '../styles/components/Glitch.module.css'
import {useRouter} from 'next/router'

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

const Home: NextPage = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [number, setNumber] = useState('')

  const handleParam = setValue => e => setValue(e.target.value)

  const handleSubmit = preventDefault(() => {
    console.log(query)
    router.push({
      pathname: '/' + query,
      query: {data: JSON.stringify(query)},
    })
  })

  const startProcess = async (event: FormEvent<HTMLFormElement>) => {
    const data = {
      query: {
        'From': number
      }
    }

    const response = await fetch('/api/firstmessage',{
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <div>
        <div id='padding' className='pt-20'></div>
        <div className='text-8xl font-heading text-center'>
          <div className={styles.glitchDiv}> Schwordle </div>
        </div>
        <div className='flex flex-col justify-center items-center h-screen'>

        <form onSubmit={handleSubmit}>
          <input className='outline-none w-32 text-center bg-transparent text-black placeholder-black' onChange={handleParam(setQuery)} type='text' placeholder='enter code...'/>
          <button type="submit" hidden>Submit</button>
        </form>
        <div id='padding' className='pt-8'></div>
        <form onSubmit={startProcess}>
          <input className='outline-none w-64 text-center bg-transparent text-black placeholder-black' id="number" name="number" onChange={handleParam(setNumber)} type='text' placeholder='enter number to start the process...'/>
          <button type="submit" hidden>Submit</button>
        </form>
        <div id='padding' className='pb-96'></div>
      </div>
    </div>
    
  )
}

export default Home
