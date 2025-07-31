import { supabase } from '@/lib/supabase/client'
import type { Product } from '@/lib/supabase/client'

export async function getProductModule() {
  return {
    listProducts: async () => {
      try {
        const { data: products, error } = await supabase
          .from('product')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching products:', error)
          return { products: [] }
        }
        
        return { products: products || [] }
      } catch (error) {
        console.error('Unexpected error:', error)
        return { products: [] }
      }
    },
    
    createProducts: async (data: Partial<Product>[]) => {
      try {
        const { data: products, error } = await supabase
          .from('product')
          .insert(data.map(item => ({
            title: item.title || 'Untitled Product',
            description: item.description,
            handle: item.handle || item.title?.toLowerCase().replace(/\s+/g, '-'),
            status: item.status || 'draft',
            metadata: item.metadata || {}
          })))
          .select()
        
        if (error) {
          console.error('Error creating products:', error)
          throw error
        }
        
        return products || []
      } catch (error) {
        console.error('Unexpected error:', error)
        throw error
      }
    }
  }
}