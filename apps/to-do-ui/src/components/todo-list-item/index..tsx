import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, SelectChangeEvent, TextareaAutosize, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { todoUpdateSchema, TodoUpdateType } from "@to-do/api-schemas/todo-schema";
import { userLoginSchema, UserLoginType } from "@to-do/api-schemas/user-schema";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface TodoListItemProps {
    title: string;
    deadline: Date;
    statusId: number;
    assignedToId: number;
    assignedToName: string;
};

const TodoListItem = (props: TodoListItemProps) => {
    const [status, setStatus] = useState<number>(props.statusId);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<TodoUpdateType>({
        mode:'onChange',
        resolver: zodResolver(todoUpdateSchema),
      });
    
    useEffect(() => {
        // Call API to perform status update
    }, [status])

    const handleStatusChange = (event: SelectChangeEvent<number>) => {
        const newStatus = event.target.value as number;
        if (newStatus !== status) {
            setStatus(newStatus);
        }
    };

    const onSubmit = async (todoUpdate: TodoUpdateType) => {
        setEditMode(false);
        console.log('Submitting changes...');
        // TODO: Update via API
      };

    const stopProp = (e: React.MouseEvent<HTMLElement, MouseEvent>|undefined) => e?.stopPropagation();

    return (
        <>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <ListItem sx={{cursor:'pointer', height:'auto'}} onClick={() => setExpanded(current => !current)}>
                <ListItemAvatar onClick={(e) => e.stopPropagation()}>
                        {<Select variant="standard" value={1} disableUnderline onClick={stopProp}>
                            <MenuItem value={1}>
                                <Tooltip title='Person 1'>
                                    <Avatar alt='1' src="/static/images/avatar/1.jpg" />
                                </Tooltip>
                            </MenuItem>
                            <MenuItem value={2}>
                                <Tooltip title='Person 2'>
                                    <Avatar alt='2' src="/static/images/avatar/1.jpg" />
                                </Tooltip>
                            </MenuItem>
                        </Select>}
                </ListItemAvatar>
                {editMode ? 
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                        <TextField
                            label='Title'
                            type='text'
                            fullWidth
                            variant="outlined"
                            autoComplete="title"
                            autoFocus
                            onClick={stopProp}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                            inputRef={ref}
                            {...field}
                            />
                        )}
                    />
                    : <ListItemText primary={props.title} secondary={props.deadline.toLocaleString()}/>}
                <Select variant="standard" disableUnderline value={status} label={status} onChange={handleStatusChange} onClick={stopProp}>
                    <MenuItem value={1}>On Track</MenuItem>
                    <MenuItem value={2}>Delayed</MenuItem>
                </Select>
            </ListItem>

            {expanded && editMode && <Controller
                        name="description"
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                        <TextField
                            label='Description'
                            type='text'
                            multiline
                            minRows={2} maxRows={Infinity}
                            fullWidth
                            variant="outlined"
                            autoComplete="title"
                            autoFocus
                            onClick={stopProp}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                            inputRef={ref}
                            {...field}
                            />
                        )}
                    />}
                    {expanded && !editMode && <Typography  variant="body1">kjnan oinf qalwsn qakjwbiudbiqwn diuqbw dbiqwbdiujb qwiudvb qkjwbdiu7qb qwkugb dq bwudyvqkwmydv uqi bdqvjyw vd</Typography>}

            {expanded && !editMode && <Box textAlign='right'>
                <Button variant="contained" onClick={(e) => {
                    stopProp(e);
                    setEditMode(true);
                }}>Edit</Button>
            </Box>}
                
                {editMode && <Box textAlign='right'><Button type="submit" variant="contained" onClick={(e) => {
                    stopProp(e);    
                }}>Save</Button>
                </Box>}
        </Box>
        <Divider variant="fullWidth" component="li" />
        </>
    );
}

export default TodoListItem;