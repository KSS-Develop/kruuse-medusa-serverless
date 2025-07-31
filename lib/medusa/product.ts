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
    
    createProducts: async (data: Partial<Product>) => {
      try {
        const { data: product, error } = await supabase
          .from('product')
          .insert({
            title: data.title || 'Untitled Product',
            description: data.description,
            handle: data.handle || data.title?.toLowerCase().replace(/\s+/g, '-'),
            status: data.status || 'draft',
            metadata: data.metadata || {}
          })
          .select()
          .single()
        
        if (error) {
          console.error('Error creating product:', error)
          throw error
        }
        
        return product
      } catch (error) {
        console.error('Unexpected error:', error)
        throw error
      }
    }
  }
}