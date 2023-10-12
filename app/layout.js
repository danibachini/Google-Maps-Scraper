
import './globals.css'
import Form from './components/Form'
import Image from 'next/image'

export const metadata = {
  title: 'Foodie Mapper | Find Restaurants In Any City Around The World !',
  description: 'Foodie Mapper scrapes Google Maps to find restaurants in the city of your destination',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-gradient-to-r from-sky-700 to-teal-700'>
      <body className='my-14 md:my-20 w-4/5 max-w-6xl mx-auto '>

        <div className='max-w-4xl m-auto'>
          <Image
          src='/foodie-mapper-white-logo.webp' 
          alt='Foodie Mapper Logo' 
          width={800}
          height={180} 
          className="m-auto drop-shadow-lg" 
          />
        </div>

        <Form />
        
        <div className='my-16 rounded-lg'>{children}</div>

      </body>
    </html>
  )
}
