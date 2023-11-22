import React from 'react'
import AdminNavbar from './admin.navbar'
import AdminSidebar from './admin.sidebar'
import AdminContent from './admin.content'
import AdminFooter from './admin.footer'

const AdminDashboard = ({title, children, preImageRoute=''}) => {
  return (
    <div className="wrapper">
      <AdminNavbar />
      <AdminSidebar  preImageRoute={preImageRoute} />
      <AdminContent title={title}>
        {children}
      </AdminContent>
      <AdminFooter />
    </div>
  )
}

export default AdminDashboard