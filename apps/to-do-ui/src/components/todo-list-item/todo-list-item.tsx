import { ListItem } from "@mui/material";

export interface TodoListItemProps {
    title: string;
    deadline: Date,
    status: string,
    assignedToId: number,
};

const TodoListItem = (props: TodoListItemProps) => {
    return (
        <ListItem>
            
        </ListItem>
    );
}

export default TodoListItem;