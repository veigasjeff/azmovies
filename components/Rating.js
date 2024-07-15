import React from 'react'
import { InlineReactionButtons } from 'sharethis-reactjs'

const Rating = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      
      <h2
        className='text-white text-center font-bold'
        style={{
          fontFamily: 'Poppins, sans-serif',
          color: '#000',
          textShadow: '2px 5px 5px #000000'
        }}
      >
        Add Your Ratings.{' '}
      </h2>
    
      <style
        dangerouslySetInnerHTML={{
          __html: `
        html, body {
          margin: 0;
          padding: 0;
          text-align: center;
        }
        h2 {
          font-size: 24px;
          font-weight: bold;
        }
        hr {
          margin-bottom: 40px;
          margin-top: 40px;
          width: 50%;
        }
      `
        }}
      />
      
      <InlineReactionButtons
        config={{
          alignment: 'center',
          enabled: true,
          language: 'en',
          min_count: 0,
          padding: 12,
          reactions: [
            'slight_smile',
            'heart_eyes',
            'laughing',
            'astonished',
            'sob',
            'rage'
          ],
          size: 48,
          spacing: 8
        }}
      />
    </div>
  )
}

export default Rating
