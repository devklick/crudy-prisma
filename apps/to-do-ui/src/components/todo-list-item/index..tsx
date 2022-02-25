import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@mui/material";
import { TodoDetailType } from "@to-do/api-schemas/todo-schema";

export interface TodoListItemProps {
    title: string;
    deadline: Date;
    status: string;
    assignedToId: number;
    assignedToName: string;
};

const TodoListItem = (props: TodoListItemProps) => {
    return (
        <>
        <ListItem >
            <ListItemAvatar>
                <Tooltip title={props.assignedToName}>
                    <Avatar alt={props.assignedToName} src="/static/images/avatar/1.jpg" />
                </Tooltip>
            </ListItemAvatar>
            <ListItemText primary={props.title}></ListItemText>
            <ListItemText primary={props.status}></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    );
}

export default TodoListItem;