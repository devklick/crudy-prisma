import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomeProps { }
const Home = (props: HomeProps) => {
    const navigate = useNavigate();

    /** If not logged in... */
    navigate('/login');

    return (
        <></>
    );
}

export default Home;