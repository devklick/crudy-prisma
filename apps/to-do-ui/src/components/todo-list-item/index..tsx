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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import {
  TodoDetailType,
  TodoStatusDetailType,
  todoUpdateSchema,
  TodoUpdateType,
} from '@to-do/api-schemas/todo-schema';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserDetailType } from '@to-do/api-schemas/user-schema';

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
            <MenuItem value={user.id}>
              <Tooltip title={user.username}>
                <Avatar alt={user.username} src='/static/images/avatar/1.jpg' />
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
        <MenuItem value={status.id}>{status.name}</MenuItem>
      ))}
    </Select>
  );
};

const TodoListItem = (props: TodoListItemProps) => {
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

  useEffect(() => {
    // Call API to perform status update
  }, [status]);

  useEffect(() => {
    // Call API to perform status update
  }, [assignedTo]);

  const handleStatusChange = (event: SelectChangeEvent<number>) => {
    const newStatus = event.target.value as number;
    if (newStatus !== status) {
      setStatus(newStatus);
    }
  };
  const handleAssignedToChange = (event: SelectChangeEvent<number>) => {
    console.log('Handling assigned to change');
    const newUser = event.target.value as number;
    if (newUser !== assignedTo) {
      setAssignedTo(newUser);
    }
  };

  const onSubmit = async (todoUpdate: TodoUpdateType) => {
    setEditMode(false);
    console.log('Submitting changes...');
    // TODO: Update via API
    setData(todoUpdate);
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {getUserAvatarSelectList(
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
              {getStatusSelectList(props.statuses, status, handleStatusChange)}
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
                <Typography>{data.description} </Typography>
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
          {/* <ListItem
          sx={{ cursor: 'pointer', height: 'auto' }}
          onClick={() => setExpanded((current) => !current)}
        >
          <ListItemAvatar onClick={(e) => e.stopPropagation()}>
            <Select
              variant='standard'
              value={1}
              disableUnderline
              onClick={stopProp}
            >
              <MenuItem value={1}>
                <Tooltip title='Person 1'>
                  <Avatar alt='1' src='/static/images/avatar/1.jpg' />
                </Tooltip>
              </MenuItem>
              <MenuItem value={2}>
                <Tooltip title='Person 2'>
                  <Avatar alt='2' src='/static/images/avatar/1.jpg' />
                </Tooltip>
              </MenuItem>
            </Select>
          </ListItemAvatar>

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
          <Select
            variant='standard'
            disableUnderline
            value={status}
            label={status}
            onChange={handleStatusChange}
            onClick={stopProp}
          >
            <MenuItem value={1}>On Track</MenuItem>
            <MenuItem value={2}>Delayed</MenuItem>
          </Select>
        </ListItem>
        {expanded && (
          <ListItem onClick={() => setExpanded(false)}>
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
              <ListItemText primary={data.description} />
            )}
          </ListItem>
        )}

        {expanded && (
          <ListItem>
            {editMode ? (
              <Controller
                name='deadline'
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label='Deadline'
                    type='date'
                    fullWidth
                    variant='standard'
                    autoFocus
                    onClick={stopProp}
                    error={Boolean(errors.deadline)}
                    helperText={errors.deadline?.message}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
            ) : (
              <ListItemText primary={data.deadline?.toLocaleDateString()} />
            )}
          </ListItem>
        )}

        {expanded && (
          <ListItem>
            <InputLabel>Created By</InputLabel>
            <Avatar alt='1' src='/static/images/avatar/1.jpg' />
          </ListItem>
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
        )} */}
        </Box>
      </ListItem>
      <Divider variant='middle' component='li' />
    </>
  );
};

export default TodoListItem;
