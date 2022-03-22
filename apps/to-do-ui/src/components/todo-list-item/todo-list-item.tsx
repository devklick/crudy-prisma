import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
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
import DateAdapter from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

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
    description: props.data.description ?? undefined,
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
    if (newStatus !== status && auth?.authToken) {
      const apiResult = await todoService.updateTodo(auth.authToken, {
        ...data,
        status: newStatus,
      });
      setData(apiResult);
      setStatus(apiResult.status);
    }
  };
  const handleAssignedToChange = async (event: SelectChangeEvent<number>) => {
    const newUser = event.target.value as number;
    if (newUser !== assignedTo && auth?.authToken) {
      const apiResult = await todoService.updateTodo(auth.authToken, {
        ...data,
        assignedToId: newUser,
      });
      setData(apiResult);
      setAssignedTo(apiResult.assignedToId);
    }
  };

  const onSubmit = async (todoUpdate: TodoUpdateType) => {
    if (auth?.authToken) {
      setEditMode(false);
      const apiResult = await todoService.updateTodo(
        auth.authToken,
        todoUpdate
      );
      setData(apiResult);
    }
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
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ disableUnderline: !editMode }}
                    disabled={!editMode}
                    onClick={(e) => {
                      editMode && stopProp(e);
                    }}
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
              {props.statuses.length &&
                getStatusSelectList(props.statuses, status, handleStatusChange)}
            </AccordionSummary>

            <AccordionDetails>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <Stack spacing={3}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        label='Description'
                        type='text'
                        fullWidth
                        variant='standard'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: !editMode }}
                        disabled={!editMode}
                        multiline
                        onClick={stopProp}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                        inputRef={ref}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name='deadline'
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <DesktopDatePicker
                        label='Deadline'
                        inputFormat='dd/MM/yyyy'
                        value={field.value}
                        onChange={field.onChange}
                        InputProps={{ disableUnderline: !editMode }}
                        disabled={!editMode}
                        inputRef={ref}
                        renderInput={(params) => (
                          <TextField
                            variant='standard'
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.deadline)}
                            helperText={errors.deadline?.message}
                            inputRef={ref}
                            {...params}
                          />
                        )}
                      />
                    )}
                  />

                  <Stack spacing={2} textAlign='right' direction='row-reverse'>
                    {!editMode && (
                      <Button
                        variant='contained'
                        onClick={(e) => {
                          stopProp(e);
                          setEditMode(true);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    {editMode && (
                      <>
                        <Button
                          size='small'
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
                      </>
                    )}
                  </Stack>
                </Stack>
              </LocalizationProvider>
            </AccordionDetails>
          </Accordion>
        </Box>
      </ListItem>
      <Divider variant='middle' component='li' />
    </>
  );
};

export default TodoListItem;
