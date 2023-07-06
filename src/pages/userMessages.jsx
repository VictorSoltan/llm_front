import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios'


export default function UserMessages() {

    const 
        [users_id, setUsers_id] = useState([]),
        [messages, setMessages] = useState([])

    function Items({ currentItems }) {
      return (
        <div
        style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            width: '60%',
            margin: '0 auto'
        }}>
          {currentItems &&
            currentItems.map((item) => (
                <div style={{
                    padding: '10px',
                    margin: '2px 0',
                    backgroundColor: item.message_from_user ? 'rgb(227, 255, 228)' : '#d9d9d9',
                    alignSelf: item.message_from_user ? 'flex-start' : 'flex-end',
                    width: '48%',
                    textAlign: 'left',
                }}>
                    <p>{item.message_text}</p>
                </div>
            ))}
        </div>
      );
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_ADDRESS + '/get_users_id')
        .then(res => {
            console.log(JSON.parse(res.data))
            setUsers_id(JSON.parse(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleClick = (user_id) => {
        console.log(user_id)
        axios.get(process.env.REACT_APP_BACK_ADDRESS + `/get_messages/${user_id}`)
        .then(res => {
            console.log(JSON.parse(res.data))
            setMessages(JSON.parse(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }

        const itemsPerPage = 20;
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);
      
        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = messages.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(messages.length / itemsPerPage);
      
        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % messages.length;
          console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
          );
          setItemOffset(newOffset);
        };
    
    return (
        <div
        style={{display: 'flex', flexDirection: 'column', minHeight: '92vh'}}>
            <header style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '60%',
                margin: '0 auto',
                }}
            >
                {users_id &&
                    <>
                    <h2 style={{
                        margin: '20px 0 0'
                    }}>Available conversations:</h2>
                    <div
                        style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        width: '100%',
                        maxWidth: '100%',
                        overflowX: 'scroll',
                        margin: '0 auto',
                    }}>

                    {users_id.map(user => {
                        return(
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                margin: '20px 20px 20px 0'
                            }}>
                                <span style={{margin: '10px 0'}}>User name: {user.name}</span>
                                <span style={{margin: '10px 0'}}>User username: @{user.username}</span>
                                <span style={{margin: '10px 0'}}>User id: {user.user_id}</span>
                                <button style={{       
                                    cursor: 'pointer',                     
                                    fontSize: '13px',
                                    padding: '6px',
                                    fontWeight: 'bold',
                                    borderRadius: '10px',
                                    borderWidth: '0px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white'}} onClick={() => handleClick(user.user_id) }>Check this user conversation</button>
                            </div>
                        )
                    })}
                    </div>

                    </>
                }
            </header>
            {currentItems.length !== 0 &&
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '60%',
                    margin: '10px auto 20px'
                }}>
                    <div style={{width: '50%', textAlign: 'left', alignSelf: 'flex-start'}}>User messages:</div>
                    <div style={{width: '50%', textAlign: 'left', alignSelf: 'flex-end'}}>Bot messages:</div>
            </div>}            
            <Items currentItems={currentItems} />
            <ReactPaginate
                className="navigation"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>

    )
}
