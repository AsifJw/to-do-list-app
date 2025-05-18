import { useEffect, useState } from 'react'

type Todo = {
  id: number | string
  task: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [task, setTask] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch todos from API
  const fetchTodos = async () => {
    setLoading(true)
    const res = await fetch('/api/todos')
    const data: Todo[] = await res.json()
    setTodos(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add a new todo
  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!task) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    })
    if (res.ok) {
      setTask('')
      fetchTodos()
    }
  }

  // Toggle completed
  const toggleTodo = async (id: number | string, completed: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    fetchTodos()
  }

  // Delete todo
  const deleteTodo = async (id: number | string) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  return (
    <main style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Simple To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ width: '80%', padding: 8, marginRight: 8 }}
        />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {loading ? (
          <li>Loading...</li>
        ) : todos.length === 0 ? (
          <li>No tasks yet!</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} style={{ marginTop: 12 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  marginLeft: 8,
                }}
              >
                {todo.task}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: 12 }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  )
}
