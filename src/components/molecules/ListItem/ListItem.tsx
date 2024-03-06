import {
  ListItem as MuiListItem,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ITodo } from '../../../interfaces/todo';
import { DeleteOutlined } from '@mui/icons-material';

interface ListItemProps {
  todo: ITodo;
  handleClick: (id: ITodo['id']) => void;
  handleDelete: (id: ITodo['id']) => void;
}

export default function ListItem({
  todo,
  handleClick,
  handleDelete,
}: ListItemProps) {
  return (
    <MuiListItem key={todo.id} disablePadding>
      <ListItemButton onClick={() => handleClick(todo.id)}>
        <ListItemText
          sx={{
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}
          primary={todo.text}
        />
      </ListItemButton>

      <IconButton size="small" onClick={() => handleDelete(todo.id)}>
        <DeleteOutlined />
      </IconButton>
    </MuiListItem>
  );
}
