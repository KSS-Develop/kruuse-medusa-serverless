"use client"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Kruuse Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('adminAuth')
                    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                    window.location.href = '/admin/login'
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white shadow-sm">
          <nav className="mt-8 px-4">
            <a href="/admin" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Dashboard
            </a>
            <a href="/admin/products" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Productos
            </a>
            <a href="/admin/orders" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Órdenes
            </a>
            <a href="/admin/customers" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Clientes
            </a>
          </nav>
        </aside>
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}