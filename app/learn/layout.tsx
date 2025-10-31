import React from 'react'

const Layout = ({ children}:{children: React.ReactNode}) => {
  return (
    <div className='text-brand-dark'>{children}</div>
  )
}

export default Layout