import { supabase } from '../../../lib/supabaseClient'
/* Supabase */
export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'PUT') {
    const { completed } = req.body
    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)
      .select()
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(data[0])
  }
  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    res.status(204).end()
  }
}
