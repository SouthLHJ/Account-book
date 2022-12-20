import { useState } from "react";
import Search from "./seach";
import Write from "./write";




function History(props) {
    const [newCreate,setNewCreate] = useState(false);

    return ( 
        <>  
            <div className="writeArea">
                <Write historyApi={props.historyApi} email={props.email} setNewCreate={setNewCreate} />
            </div>
            <div className="searchArea"> 
                <Search historyApi={props.historyApi} email={props.email} setNewCreate={setNewCreate} newCreate={newCreate}/>
            </div>

        </>
        
        
    );
}

export default History;