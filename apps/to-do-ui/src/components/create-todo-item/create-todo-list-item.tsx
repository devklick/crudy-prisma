import { zodResolver } from '@hookform/resolvers/zod';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  StatusIds,
  todoCreateSchema,
  TodoCreateType,
  TodoStatusDetailType,
} from '@to-do/api-schemas/todo-schema';
import { UserDetailType } from '@to-do/api-schemas/user-schema';
import todoService from '@to-do/services/to-do-service-fe';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AppContext } from '../../context/app-context';

export interface CreateTodoListItemProps {
  todoCreated: () => void;
  users: UserDetailType[];
  statuses: TodoStatusDetailType[];
}

const stopProp = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) =>
  e?.stopPropagation();

export const getUserAvatarSelectList = (
  users: UserDetailType[],
  current: number,
  handleAssignedToChange: (event: SelectChangeEvent<number>) => void
) => {
  return (
    <Tooltip title='Assigned to'>
      <ListItemAvatar onClick={(e) => e.stopPropagation()}>
        <Select
          variant='standard'
          value={current}
          disableUnderline
          onChange={handleAssignedToChange}
          onClick={stopProp}
          IconComponent={() => null}
          inputProps={{ sx: { padding: '0 !important' } }}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              <Tooltip title={user.username}>
                <Avatar alt={user.username}>
                  {user.username.substring(0, 1)}
                </Avatar>
              </Tooltip>
            </MenuItem>
          ))}
        </Select>
      </ListItemAvatar>
    </Tooltip>
  );
};

export const getStatusSelectList = (
  statuses: TodoStatusDetailType[],
  current: number,
  handleStatusChange: (event: SelectChangeEvent<number>) => void
) => {
  return (
    <Select
      variant='standard'
      disableUnderline
      value={current}
      onChange={handleStatusChange}
      onClick={stopProp}
    >
      {statuses.map((status) => (
        <MenuItem key={status.id} value={status.id}>
          {status.name}
        </MenuItem>
      ))}
    </Select>
  );
};

const CreateTodoListItem = (props: CreateTodoListItemProps) => {
  const { auth, session } = useContext(AppContext);
  const [expanded, setExpanded] = useState<boolean>(false);
  const defaultData: Partial<TodoCreateType> = {
    status: StatusIds.ToDo,
    assignedToId: session?.userId,
    title: undefined,
    deadline: undefined,
    description: undefined,
    session: undefined,
  };
  const [data, setData] = useState<Partial<TodoCreateType>>(defaultData);

  useEffect(() => {
    if (session) {
      setData((currentData) => ({
        ...currentData,
        assignedToId: session.userId,
        session,
      }));
    }
  }, [session]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoCreateType>({
    mode: 'onChange',
    resolver: zodResolver(todoCreateSchema),
    defaultValues: data,
  });

  const [submitted, setSubhmitted] = useState<boolean>(false);
  useEffect(() => {
    if (submitted) {
      reset(defaultData);
      props.todoCreated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const handleStatusChange = async (event: SelectChangeEvent<number>) => {
    const newStatus = event.target.value as number;
    setData({ ...data, status: newStatus });
  };

  const handleAssignedToChange = async (event: SelectChangeEvent<number>) => {
    const newUser = event.target.value as number;
    setData({ ...data, assignedToId: newUser });
  };

  const onSubmit = async (todoCreate: TodoCreateType) => {
    auth?.authToken &&
      (await todoService.createTodo(auth.authToken, todoCreate));
    setSubhmitted(true);
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{ width: '100%' }}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              {props.users?.length &&
                getUserAvatarSelectList(
                  props.users,
                  data.assignedToId ?? 0,
                  handleAssignedToChange
                )}
              <Controller
                name='title'
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    label='Title'
                    type='text'
                    fullWidth
                    variant='standard'
                    autoComplete='title'
                    autoFocus
                    onClick={stopProp}
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
              {props.statuses?.length &&
                getStatusSelectList(
                  props.statuses,
                  data.status ?? StatusIds.ToDo,
                  handleStatusChange
                )}
            </AccordionSummary>

            <AccordionDetails>
              <Controller
                name='description'
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    label='Description'
                    type='text'
                    fullWidth
                    variant='standard'
                    autoFocus
                    multiline
                    onClick={stopProp}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
              {expanded && (
                <Box textAlign='right' sx={{ paddingBottom: 2 }}>
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={(e) => {
                      stopProp(e);
                      setExpanded(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={(e) => {
                      stopProp(e);
                    }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </ListItem>
      <Divider variant='middle' component='li' />
    </>
  );
};

export default CreateTodoListItem;
