import './Like.css';

function Comment(){
    return (
        <div>
            <div className="layout-comment">
                <div className="comment">
                    
                </div>
                <form>
                    <input type="text" placeholder="Ecrivez un commentaire.."/>
                    <button type="submit"><i class='bx bxs-edit'></i></button>
                </form>
            </div>
        </div>
    )
}

export default Comment;