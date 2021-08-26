import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';


function App() {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState([]);
    const [commentText, setCommentText] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        getComments();
    }, []);


    const getComments = async (nextPage, reset) => {
        const response = await axios.get(`https://jordan.ashton.fashion/api/goods/30/comments?page=${nextPage??page}`);
        setComments(reset?response.data.data:[...comments, ...response.data.data]);
        setPage(response.data.current_page);
        setLastPage(response.data.last_page);
    }

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeCommentText = (event) => {
        setCommentText(event.target.value);
    }

    const sendComment = async () => {
        const data = {name:name , text: commentText};
        await axios.post('https://jordan.ashton.fashion/api/goods/30/comments', data);
        alert('Комментарий отправлен');
        setName('');
        setCommentText('');
    }

    const showMore = async () => {
        getComments(page+1);
    }

    const handlePageChange = (event, value) => {
        getComments(value, true);
    }

  return (
    <div className="comments">
      <form action="#" id="form" className="form_body">
                <h1 className="form_title"> Comments </h1>

                <div className="form_item">
                    <label for="comment_name" className="form_label" >Имя*:</label>
                    <input required id="comment_name" value={name}  type="name" onChange={onChangeName} className="form_input _req "placeholder="Your name"></input>
                </div>
                
                
                <div className="form_item">
                    <label for="comment_body" className="form_label">Сообщение:</label>
                    <input required type="name" value={commentText} onChange={onChangeCommentText} id="comment_body" className="form_input"  placeholder="Your comment"></input>
                </div>
                <div className="comment_field" id="comment_field">
                    <label htmlFor="comment_field" id="comment_field" className="form_label">чат:</label>
                    {comments?.map((comment) => (
                        <div>{comment.text}</div>
                    ))}
                    {page < lastPage && <button type="button" id="coment_load" className="form_button" onClick={showMore}>Показать еще</button>}
                    <Pagination count={lastPage} page={page} onChange={handlePageChange} shape="rounded " />

                </div>
                
                
                <button type="submit" id="coment_add" className="form_button" onClick={sendComment}>Отправить</button>
            </form>
      
    </div>
  );
}

export default App;
