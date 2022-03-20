import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/system';
import {
  TodoDetailType,
  TodoStatusDetailType,
  todoUpdateSchema,
  TodoUpdateType,
} from '@to-do/api-schemas/todo-schema';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserDetailType } from '@to-do/api-schemas/user-schema';
import todoService from '@to-do/services/to-do-service-fe';
import { AppContext } from '../../context/app-context';

const stopProp = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) =>
  e?.stopPropagation();

export interface TodoListItemProps {
  data: TodoDetailType;
  users: UserDetailType[];
  statuses: TodoStatusDetailType[];
}

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

const TodoListItem = (props: TodoListItemProps) => {
  const { auth } = useContext(AppContext);
  const [status, setStatus] = useState<number>(props.data.status);
  const [assignedTo, setAssignedTo] = useState<number>(props.data.assignedToId);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [data, setData] = useState<TodoUpdateType>({
    title: props.data.title,
    status: props.data.status,
    assignedToId: props.data.assignedToId,
    createdById: props.data.assignedToId,
    deadline: props.data.deadline,
    description: props.data.description,
    id: props.data.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoUpdateType>({
    mode: 'onChange',
    resolver: zodResolver(todoUpdateSchema),
    defaultValues: data,
  });

  const handleStatusChange = async (event: SelectChangeEvent<number>) => {
    const newStatus = event.target.value as number;
    if (newStatus !== status) {
      const apiResult = await todoService.updateTodo(auth?.authToken ?? '', {
        ...data,
        status: newStatus,
      });
      setData(apiResult);
      setStatus(apiResult.status);
    }
  };
  const handleAssignedToChange = async (event: SelectChangeEvent<number>) => {
    const newUser = event.target.value as number;
    if (newUser !== assignedTo) {
      const apiResult = await todoService.updateTodo(auth?.authToken ?? '', {
        ...data,
        assignedToId: newUser,
      });
      setData(apiResult);
      setAssignedTo(apiResult.assignedToId);
    }
  };

  const onSubmit = async (todoUpdate: TodoUpdateType) => {
    setEditMode(false);
    const apiResult = await todoService.updateTodo(
      auth?.authToken ?? '',
      todoUpdate
    );
    setData(apiResult);
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
                  assignedTo,
                  handleAssignedToChange
                )}
              {editMode ? (
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
              ) : (
                <ListItemText primary={data.title} />
              )}
              {props.statuses.length &&
                getStatusSelectList(props.statuses, status, handleStatusChange)}
            </AccordionSummary>

            <AccordionDetails>
              {editMode ? (
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
              ) : (
                <Typography variant='body1' style={{ whiteSpace: 'pre-line' }}>
                  {data.description}
                </Typography>
              )}
              {expanded && !editMode && (
                <Box textAlign='right' sx={{ paddingBottom: 2 }}>
                  <Button
                    variant='contained'
                    onClick={(e) => {
                      stopProp(e);
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              )}
              {editMode && (
                <Box textAlign='right' sx={{ paddingBottom: 2 }}>
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={(e) => {
                      stopProp(e);
                      setEditMode(false);
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

export default TodoListItem;
