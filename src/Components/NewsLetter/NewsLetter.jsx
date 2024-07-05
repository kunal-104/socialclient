import React from 'react'
import './newsletter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Emaill</h1>
      <p>Subscribe To Our NewsLetter And Stay Updated</p>
      <div className='subscribe'>
        <input type="email" placeholder='Your Email id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
