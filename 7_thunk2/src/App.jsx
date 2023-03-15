import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { __getTodos } from './redux/modules/todosSlice';

function App() {
  //(1)
  const dispatch = useDispatch();
  //(3)
  const { isLoading, error, todos } = useSelector(state => {
    return state.todos;
  });
  //(2)
  useEffect(() => {
    //__getTodos에는 인자없어도 된다. __getTodosd에 axios.get하는데 payload사용 안했으나.
    dispatch(__getTodos())
  }, [])

  //(4)
  if ( isLoading ) {
    return <div>로딩 중...</div>
  }
  if ( error ) {
    return <div>{error.message}</div>
  }
  return (
    <div>
      {todos.map((todo) => {
        return <div key={todo.id}>{todo.title}</div>;
      })}
    </div>
  );
};

export default App;
