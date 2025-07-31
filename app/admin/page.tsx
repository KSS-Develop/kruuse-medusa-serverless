export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido al panel de administración de Kruuse
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-semibold text-gray-900">151</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Órdenes Hoy</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a 
            href="/admin/products/new" 
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h4 className="font-medium text-blue-900">Agregar Producto</h4>
            <p className="text-sm text-blue-700 mt-1">Crear un nuevo producto en el catálogo</p>
          </a>
          
          <a 
            href="/admin/orders" 
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h4 className="font-medium text-green-900">Ver Órdenes</h4>
            <p className="text-sm text-green-700 mt-1">Gestionar órdenes pendientes</p>
          </a>
        </div>
      </div>
    </div>
  )
}