import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const ViewPass = () => {
  const apiLink = "http://localhost:3000";
  const navigate = useNavigate();
  const [notes, setnotes] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get(`${apiLink}/password/getnotes`, {
        headers: {
          authToken: token,
        },
      })
      .then((res) => {
        setnotes(res.data);
      })
      .catch((err) => console.log(err));
  }, [notes]);

  const deleteNote = (id) => {
    const check = confirm("Are you sure you want to delete?");
    if (check) {
      axios
        .delete(`${apiLink}/password/deletenote/` + id, {
          headers: {
            authToken: token,
          },
        })
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  };

  const updateNote = (id) => {
    const check = confirm("Are you sure you want to update?");
    if (check) {
      navigate("/update/" + id);
    }
  };

  const viewNote = (id) => {
    navigate("/mainview/" + id);
  };

  return (
    <div className="container mx-auto w-full lg:w-[60%] p-5 p">
      <div>
        <h1 className="font-semibold text-2xl text-white px-4">
          View all notes
        </h1>
      </div>
      <div className="cards text-white w-full flex flex-wrap p-1 ">
        {/* map from here */}
        {notes.map((note) => {
          return (
            <div key={note._id} className="itemcard w-full  md:w-1/3 p-1 ">
              <div className="border bg-black/30 rounded-2xl p-3 h-[200px] md:h-fit">
                <div className="cardcontent">
                  <div className="font-bold text-green-400 text-xl flex justify-between mb-1">
                    <h1
                      onClick={(e) => viewNote(note._id)}
                      className="hover:text-white cursor-pointer"
                    >
                      {note.notetitle}
                    </h1>
                    <div
                      onClick={(e) => updateNote(note._id)}
                      className="cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-2 px-2 h-[100px] overflow-hidden">
                    <p>{note.notedesc}</p>
                  </div>
                  <div className="actions flex justify-end ">
                    <div
                      onClick={(e) => deleteNote(note._id)}
                      className="cursor-pointer"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/nhqwlgwt.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#ffffff,secondary:#3cee33,tertiary:#646e78,quaternary:#ebe6ef"
                      ></lord-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewPass;
