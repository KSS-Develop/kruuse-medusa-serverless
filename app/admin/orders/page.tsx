"use client"

import { useEffect, useState } from "react"

interface Order {
  id: string
  customer_id?: string
  currency_code?: string
  total?: number
  created_at?: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Por ahora simulamos que no hay órdenes
    setTimeout(() => {
      setOrders([])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Órdenes</h2>
        <p className="mt-1 text-sm text-gray-600">
          Gestiona las órdenes de tu tienda
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="text-gray-600">Cargando órdenes...</div>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay órdenes</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aún no se han recibido órdenes en tu tienda.
          </p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Aquí irían las filas de órdenes */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}