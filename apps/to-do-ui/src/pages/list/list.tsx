import { useContext, useEffect } from "react";
import { AppContext } from "../../context/session-context";
import {List as MuiList} from '@mui/material';
import TodoListItem from "../../components/todo-list-item/index.";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListProps { };

const List = () => {

    const { assumeLoggedIn, auth, session, loading } = useContext(AppContext);
    const loggedIn = assumeLoggedIn();
    const navigate= useNavigate();
    
    // If the context tells that the local data has been loaded and 
    // there's nothing to suggest that the user is authenticated, 
    // redirect them to the login page to authenticate
    useEffect(() => {
        if (!loggedIn && !loading) {
            navigate('/login');
        }
    }, [loggedIn, navigate, loading])

    return (
            <MuiList sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <TodoListItem 
                    assignedToId={1}
                    assignedToName='Me'
                    deadline={new Date()}
                    status='On Track'
                    title="First Thing"
                />
                
                <TodoListItem 
                    assignedToId={2}
                    assignedToName='You'
                    deadline={new Date()}
                    status='Delayed'
                    title="Do smething else"
                />
            </MuiList>
    );
}
export default List