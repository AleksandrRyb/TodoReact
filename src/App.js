import React from 'react';
import TodoList from './TodoList';
import { Provider } from 'react-redux';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
