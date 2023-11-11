import React, { useEffect, useRef, useState } from "react";
import { firestore } from "./config";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  deleteDoc,
  doc,
} from "@firebase/firestore";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import plusIcon from "../public/plus-square.svg";
import "./App.css";

function Home() {
  const messageRef = useRef();
  const ref = collection(firestore, "messages");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const db = getFirestore();
    const collectionRef = collection(db, "messages"); // Replace 'yourCollection' with the actual collection name

    try {
      const querySnapshot = await getDocs(collectionRef);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setData(data);
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!messageRef.current.value) return;

    let data = {
      message: messageRef.current.value,
      content: "",
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
    fetchData();
  };

  const handleDelete = async (messageId) => {
    const db = getFirestore();
    const messageRef = doc(db, "messages", messageId); // Replace 'messages' with your actual collection name

    try {
      await deleteDoc(messageRef);
      fetchData();
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-8 sm:w-2/3 md:w-3/4 flex border-dashed flex-col w-11/12 rounded border-4 border-green-500  mx-auto mt-10">
      <h1 className="text-3xl mb-20 text-center font-bold doc">
        Add your <span className="text-green-600">Document</span>
      </h1>
      <div className="head w-full flex  ">
        <form
          className="mb-5 flex w-full  flex-col md:flex-row gap-2 mx-auto"
          onSubmit={handleSave}
        >
          <TextField
            style={{ flexGrow: 1 }}
            id="outlined-basic"
            inputRef={messageRef}
            label="Enter Document Title"
            variant="outlined"
          />
          <button
            className="md:py-1 py-4 sm:px-4 flex justify-center items-center rounded md:ml-3 bg-green-600 text-black font-bold"
            type="submit"
          >
            Add Document
            <img className="ml-2" src={plusIcon} alt="" />
          </button>
        </form>
      </div>
      <div className="body flex  w-full mt-5 mx-auto gap-2 justify-center flex-wrap">
        {data &&
          data.map((item) => (
            <div
              style={{ width: "349px" }}
              className=" border uppercase rounded border-green-600  bg-slate-100 p-2 flex justify-between items-center font-bold"
              key={item.id}
            >
              {item.message}
              <div className="btn">
                <button
                  onClick={() => navigate(`/edit/${item.id}`)}
                  className="py-1 rounded font-thin px-2 ml-5"
                >
                  <i className="fa-solid fa-pencil text-green-600 fancy"></i>
                </button>
                <button
                  className="ml-2  font-normal py-1 px-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="fa-regular text-red-600 fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
