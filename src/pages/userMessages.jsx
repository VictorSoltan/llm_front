import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

export default function UserMessages() {
  const [users_id, setUsers_id] = useState([]),
    [messages, setMessages] = useState([]);

  function Items({ currentItems }) {
    return (
      <div class="flex flex-col w-2/3 mx-auto">
        {currentItems &&
          currentItems.map((item) => (
            <div
              class={`pr-4 pl-3 py-2 m-1 ${
                item.message_from_user
                  ? "bg-green-100 self-start"
                  : "bg-gray-200 self-end"
              } w-auto max-w-[60%] min-w-[40%] text-left`}
            >
              <p>{item.message_text}</p>
            </div>
          ))}
      </div>
    );
  }

  function getUsers() {
    axios
      .get(process.env.REACT_APP_BACK_ADDRESS + "/get_users_id")
      .then((res) => {
        console.log(JSON.parse(res.data));
        setUsers_id(JSON.parse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = (user_id) => {
    console.log(user_id);
    axios
      .get(process.env.REACT_APP_BACK_ADDRESS + `/get_messages/${user_id}`)
      .then((res) => {
        console.log(JSON.parse(res.data));
        setMessages(JSON.parse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (user_id) => {
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + `/delete_user_id${user_id}`)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const blockUser = (user_id) => {
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + `/block_user_id${user_id}`)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unBlockUser = (user_id) => {
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + `/unblock_user_id${user_id}`)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-col items-start w-2/3 mx-auto">
        {users_id && (
          <>
            <h2 className="font-medium text-2xl mt-4 mb-2">
              Available conversations:
            </h2>
            <div className="flex items-start w-full overflow-x-scroll mx-auto">
              {users_id.reverse().map((user) => {
                return (
                  <div className="flex flex-col items-start m-1 md:m-5 2xl:m-10 w-60 text-left">
                    <span className="my-2">
                        <label className="border-b-2 border-slate-300 mr-1">User name:</label> {user.name}</span>
                    <span className="my-2">
                        <label className="border-b-2 border-slate-300 mr-1">User username:</label> @{user.username}
                    </span>
                    <span className="my-2">
                        <label className="border-b-2 border-slate-300 mr-1">User id:</label> {user.user_id}
                    </span>
                    <button
                      className="cursor-pointer text-sm px-2 py-1 font-bold rounded text-white bg-green-500 mt-2"
                      onClick={() => handleClick(user.user_id)}
                    >
                      Check this user conversation
                    </button>
                    <button
                      className="cursor-pointer text-sm px-2 py-1 font-bold rounded text-white bg-red-500 mt-2"
                      onClick={() => deleteUser(user.user_id)}
                    >
                      Delete user
                    </button>
                    <button
                      className={`${!user.blocked ? "bg-red-500" : "bg-green-500" } cursor-pointer text-sm px-2 py-1 font-bold rounded text-white bg-green-500 mt-2`}
                      onClick={() =>
                        !user.blocked
                          ? blockUser(user.user_id)
                          : unBlockUser(user.user_id)
                      }
                    >
                      {!user.blocked ? "Block user" : "Unblock user"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </header>
      {currentItems.length !== 0 && (
        <div className="flex items-center w-2/3 mx-auto my-2 md:my-4">
          <div className="w-1/2 text-left flex-start">User messages:</div>
          <div className="w-1/2 text-left flex-end">Bot messages:</div>
        </div>
      )}
      <Items currentItems={currentItems} />
      <ReactPaginate
        containerClassName="flex items-center justify-center page-navigator"
        pageClassName="mx-1 px-2 py-1 hover:bg-blue-100 cursor-pointer"
        activeClassName="mx-1 px-2 py-1 bg-blue-500 text-white cursor-pointer"
        disabledClassName="opacity-50 cursor-not-allowed"
        pageLinkClassName="page-link"
        previousLinkClassName="mx-1 px-2 py-1 hover:bg-gray-300 cursor-pointer"
        nextLinkClassName="mx-1 px-2 py-1 hover:bg-gray-300 cursor-pointer"
        previousClassName="previous-btn"
        nextClassName="next-btn"
        breakClassName="break-me"
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel="<"
        nextLabel=">"
        className="navigation"
        breakLabel="..."
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}

      />
    </div>
  );
}
