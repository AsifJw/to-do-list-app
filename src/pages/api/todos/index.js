import { supabase } from '../../../../lib/supabaseClient'

/* Database works*/
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(data)
  }
  if (req.method === 'POST') {
    console.log('POST request received', req.body)
    const { task } = req.body
    if (!task) {
      console.log('No task provided!')
      return res.status(400).json({ error: 'Task is required' })
    }
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, completed: false }])
      .select()
    if (error) {
      console.log('DB Error:', error)
      return res.status(500).json({ error: error.message })
    }
    res.status(201).json(data[0])
  }
  
}
