import { supabase } from '@/lib/supabase/client'

interface CartData {
  currency_code?: string
  metadata?: Record<string, unknown>
}

interface LineItem {
  product_id: string
  quantity?: number
  metadata?: Record<string, unknown>
}

export async function getCartModule() {
  return {
    createCarts: async (data: CartData) => {
      const { data: cart, error } = await supabase
        .from('cart')
        .insert({
          currency_code: data.currency_code || 'USD',
          metadata: data.metadata || {}
        })
        .select()
        .single()
      
      if (error) throw error
      return [cart]
    },
    
    retrieveCart: async (id: string) => {
      const { data: cart, error } = await supabase
        .from('cart')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return cart
    },
    
    addLineItems: async ({ cartId, items }: { cartId: string; items: LineItem[] }) => {
      const { data: lineItems, error } = await supabase
        .from('cart_line_item')
        .insert(
          items.map((item) => ({
            cart_id: cartId,
            product_id: item.product_id,
            quantity: item.quantity || 1,
            metadata: item.metadata || {}
          }))
        )
        .select()
      
      if (error) throw error
      
      return { id: cartId, items: lineItems }
    }
  }
}