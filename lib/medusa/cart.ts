import { supabase } from '@/lib/supabase/client'

export async function getCartModule() {
  return {
    createCarts: async (data: any) => {
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
    
    retrieveCart: async (id: string, options?: any) => {
      const { data: cart, error } = await supabase
        .from('cart')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return cart
    },
    
    addLineItems: async ({ cartId, items }: any) => {
      const { data: lineItems, error } = await supabase
        .from('cart_line_item')
        .insert(
          items.map((item: any) => ({
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