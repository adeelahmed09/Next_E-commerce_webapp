import React from 'react'
import AdminProvider from './AdminProvider'
function layout({ children }) {

  return (
    <div className='bg-zinc-200'>
      <AdminProvider >
        {children}
      </AdminProvider>
    </div>
  )
}

export default layout
