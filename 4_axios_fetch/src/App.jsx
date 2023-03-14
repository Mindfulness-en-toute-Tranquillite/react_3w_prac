import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: '',
  });
  const [targetId, setTargerId] = useState('');
  const [contents, setContents] = useState('');

  // 조회 함수
  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:4000/todos')
    console.log('data', data);
    setTodos(data);
  };
//Post로 쓸 거니 async함수. async함수는 항상 인자를 받는다(무슨 todo를 inser할 것인지, 무슨
//Todo를 POST로 보낼 것인지) newTodo를 받으려 했는데 컴포넌트 전체 이미state로 저장돼 있는 값
//을 활용하면 되니까

  // 추가 함수
  const onSubmitHandler = async () => {
    axios.post('http://localhost:4000/todos', inputValue);
                                            //inputValue는 우리가 입력하려는 값
    // setTodos([...todos, inputValue]); <- db에는 Id가 자동입력 되지만 state는 11이라는 값 알 수 없음 그래서 갱신안되 
    fetchTodos(); //<- 다시 db를 이걸 이용해서 읽어와서 setTodos를 다시 하게끔 하면 자동으로 아이디 부여되
  };                                
  //이렇게 했는데 추가는 돼. 근데 새로고침 따로 해야해. 그 이유는 state가 안 변해서 랜더링되는 조건x.
  
  //삭제 함수
  const onDeleteButtonClickHandler = async (id) => {
    axios.delete(`http://localhost:4000/todos/${id}`)
    setTodos(
      todos.filter(item=> {
        return item.id !== id
      })
    );
  };
  
  //수정 함수
  const onUpdateButtonClickHandler = async () => {
                                    //id랑contents인자로 안 받는 이유는 위에서 state로 활용하고 있으니. 즉 및에
                                    //onClick에서도 인자 없이 써도 된다는 말.
    axios.patch(`http://localhost:4000/todos/${targetId}`, {
      title: contents,
    })
    setTodos(todos.map(item => {
      //item.id와 targetId type 다르다. 그래서 일치연산자말고 동등연산자로
      if (item.id == targetId) {
        return {...item, title: contents};
      } else {
        return item;
      }
    }))
  }



  useEffect(() => {
    //마운트 됐을 때. 
    //db로 부터 값을 가져 올 것이다. 
    fetchTodos()
  }, [])
  return (
    //언마운트 됐을 때 실행
    <>
    <div>
      {/* 수정 영역 */}
      <input type="text" placeholder='수정할 아이디' 
      value={targetId}
      onChange={(e)=> {
      setTargerId(e.target.value)
      }}
      />
      <input type="text" placeholder='수정할 내용'
      value={contents}
      onChange={(e)=>{
        setContents(e.target.value)
      }}
      />
      <button onClick={onUpdateButtonClickHandler}>수정</button>
      <br />
      <br />
    </div>

      <div>
        {/* INPUT 영역 */}
        <form onSubmit={(e) => {
          e.preventDefault();
          //버튼 클릭 시, input에 들어있는 값(state)을 이용하여 DB에 저장(post 요청)
          //근데 inputValue에 title만 있으니 굳이 newTodo 안 만들고 axios만 써도 되는데 너무
          //길어지니 함수를 하나 만들자
          // axios
          // const newTodo = {
          //   title: 
          // }
          onSubmitHandler();
        }}>
          <input type="text" 
          value={inputValue.title}
          onChange={(e) => {
            setInputValue({
              title: e.target.value,
            });
          }}
          />
          <button type="submit">추가</button> 
        </form>
      </div>
      <div>
        {/* 데이터 영역 */}
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp;<button onClick={() => onDeleteButtonClickHandler(item.id)}>삭제</button>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default App;
