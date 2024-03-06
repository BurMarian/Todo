import { useState } from 'react';
import { connect } from 'react-redux';

// Redux
import { todoActions } from '../../../store/reducers/todo';
import { StateType } from '../../../store';

// Interfaces
import { ITodo } from '../../../interfaces/todo';

// Components
import ListItem from '../../molecules/ListItem/ListItem';
import { Box, Button, List } from '@mui/material';
import Form from '../Form/Form';

interface MapStateToProps {
  todos: Array<ITodo>;
}

interface MapDispatchToProps {
  addTodo: typeof todoActions.addTodo;
  deleteTodo: typeof todoActions.deleteTodo;
  handleTodoStatus: typeof todoActions.handleTodoStatus;
}

type todoFiltersType = 'all' | 'completed' | 'current';

const todoFilters: Array<todoFiltersType> = ['all', 'completed', 'current'];

function Todo({
  todos,
  deleteTodo,
  handleTodoStatus,
}: MapStateToProps & MapDispatchToProps) {
  console.log(todos);

  const [filterByStatus, setFilterByStatus] = useState<todoFiltersType>('all');

  const handleClick = (id: ITodo['id']) => {
    handleTodoStatus(id);
  };

  const handleDelete = (id: ITodo['id']) => {
    deleteTodo(id);
  };

  const handleFilter = (value: todoFiltersType) => {
    setFilterByStatus(value);
  };

  return (
    <Box
      maxHeight="100%"
      height="400px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      border={'1px solid grey'}
      p={2}
      gap={2}
    >
      {/* header */}
      <Box display="flex" gap={2}>
        {todoFilters.map((value, index) => (
          <Button
            variant={value === filterByStatus ? 'contained' : 'outlined'}
            key={`${value}-${index}`}
            onClick={() => handleFilter(value)}
          >
            {value}
          </Button>
        ))}
      </Box>

      <Form />

      {/* body */}
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'scroll',
        }}
      >
        {todos.length > 0 ? (
          todos
            .filter((todo) =>
              filterByStatus === 'all'
                ? todo
                : filterByStatus === 'completed'
                ? todo.completed
                : !todo.completed
            )
            ?.map((todo) => (
              <ListItem
                key={todo.id}
                todo={todo}
                handleClick={handleClick}
                handleDelete={handleDelete}
              />
            ))
        ) : (
          <Box>Empty</Box>
        )}
      </List>
    </Box>
  );
}

const mapStateToProps = (state: StateType): MapStateToProps => ({
  todos: state.todo.todos,
});

export default connect<MapStateToProps, MapDispatchToProps, {}, StateType>(
  mapStateToProps,
  {
    addTodo: todoActions.addTodo,
    deleteTodo: todoActions.deleteTodo,
    handleTodoStatus: todoActions.handleTodoStatus,
  }
)(Todo);
