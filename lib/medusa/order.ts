import { supabase } from '@/lib/supabase/client'

export async function getOrderModule() {
  return {
    listOrders: async () => {
      const { data: orders, error } = await supabase
        .from('order')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching orders:', error)
        return { orders: [] }
      }
      
      return { orders: orders || [] }
    },
    
    createOrders: async (data: Array<{
      cart_id?: string
      customer_id?: string
      currency_code?: string
      metadata?: Record<string, unknown>
    }>) => {
      const { data: orders, error } = await supabase
        .from('order')
        .insert(
          data.map(order => ({
            cart_id: order.cart_id,
            customer_id: order.customer_id,
            currency_code: order.currency_code || 'USD',
            metadata: order.metadata || {}
          }))
        )
        .select()
      
      if (error) throw error
      return orders || []
    }
  }
}