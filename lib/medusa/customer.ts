import { supabase } from '@/lib/supabase/client'

export async function getCustomerModule() {
  return {
    listCustomers: async () => {
      const { data: customers, error } = await supabase
        .from('customer')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching customers:', error)
        return { customers: [] }
      }
      
      return { customers: customers || [] }
    },
    
    createCustomers: async (data: any[]) => {
      const { data: customers, error } = await supabase
        .from('customer')
        .insert(
          data.map(customer => ({
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            metadata: customer.metadata || {}
          }))
        )
        .select()
      
      if (error) throw error
      return customers || []
    }
  }
}