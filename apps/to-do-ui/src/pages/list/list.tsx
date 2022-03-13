import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/session-context';
import { List as MuiList } from '@mui/material';
import TodoListItem from '../../components/todo-list-item/index.';
import { useNavigate } from 'react-router-dom';
import {
  TodoDetailType,
  TodoStatusDetailType,
} from '@to-do/api-schemas/todo-schema';
import todoService from '@to-do/services/to-do-service-fe';
import { UserDetailType } from '@to-do/api-schemas/user-schema';
import userService from '@to-do/services/user-service-fe';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListProps {}

const List = () => {
  const { assumeLoggedIn, loadingStoredAuth, auth } = useContext(AppContext);
  const loggedIn = assumeLoggedIn();
  const navigate = useNavigate();

  const [items, setItems] = useState<TodoDetailType[]>([]);
  const [users, setUsers] = useState<UserDetailType[]>([]);
  const [statuses, setStatueses] = useState<TodoStatusDetailType[]>([]);

  useEffect(() => {
    const getItems = async (token: string) => {
      setItems(await todoService.getTodoList(token));
    };
    if (auth?.authToken) {
      getItems(auth.authToken);
    }
  }, [auth]);

  useEffect(() => {
    const getUsers = async (token: string) => {
      setUsers(await userService.getUsers(token));
    };
    if (auth?.authToken) {
      getUsers(auth.authToken);
    }
  }, [auth]);

  useEffect(() => {
    const getStatuses = async (token: string) => {
      setStatueses(await todoService.getStatuses(token));
    };
    if (auth?.authToken) {
      getStatuses(auth.authToken);
    }
  }, [auth]);

  // If the context tells that the local data has been loaded and
  // there's nothing to suggest that the user is authenticated,
  // redirect them to the login page to authenticate
  useEffect(() => {
    if (!loggedIn && !loadingStoredAuth) {
      navigate('/login');
    }
  }, [loggedIn, navigate, loadingStoredAuth]);

  return (
    <MuiList sx={{ width: '100%', maxWidth: '100%' }}>
      {items.map((item) => (
        <TodoListItem data={item} users={users} statuses={statuses} />
      ))}
    </MuiList>
  );
};
export default List;
