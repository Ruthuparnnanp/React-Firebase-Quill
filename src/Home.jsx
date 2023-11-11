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

function Home() {
  const messageRef = useRef();
  const ref = collection(firestore, "messages");
  const [data, setData] = useState(null);

  // for quill -----------------------------------------------------------
  const [isQuillOpen, setIsQuillOpen] = useState(false);
  const [quillContent, setQuillContent] = useState("");
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [currentDocumentContent, setCurrentDocumentContent] = useState("");

  // ---------------------------------------------------------------------

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
    <div className="p-5 w-2/4 mx-auto mt-10">
      <form className="mb-5" onSubmit={handleSave}>
        <input
          className="border border-green-500"
          type="text"
          ref={messageRef}
          placeholder="Type a Message..."
        />
        <button
          className="py-1 px-4 rounded ml-3 bg-green-900 text-white"
          type="submit"
        >
          Save
        </button>
      </form>
      <ul>
        {data &&
          data.map((item) => (
            <li className="mb-3" key={item.id}>
              {item.message}
              <button
                onClick={() => navigate(`/edit/${item.id}`)}
                className="py-1 rounded px-6 ml-5 bg-green-500 text-white"
              >
                Add
              </button>
              <button
                className="ml-5 bg-red-300 py-1 px-4 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      <ReactQuill
        className="w-3/4 mx-auto"
        theme="snow"
        value={quillContent}
        onChange={setQuillContent}
      />
      <p>{quillContent}</p>
    </div>
  );
}

export default Home;
