import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "@firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css"

import { toast, Toaster } from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams();
  const [quillContent, setQuillContent] = useState("");
  const [quillHead, setQuillHead] = useState("");
  const [focus,setFocus] = useState(false);
  const navigate = useNavigate();

  const fetchDocumentById = async () => {
    const db = getFirestore();
    const documentRef = doc(db, "messages", id); // Replace 'yourCollection' with the actual collection name

    try {
      const docSnapshot = await getDoc(documentRef);

      if (docSnapshot.exists()) {
        const documentData = docSnapshot.data();
        setQuillHead(documentData.message);
        setQuillContent(documentData.content);
      } else {
        console.log("Document does not exist.");
      }
    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  };

  useEffect(() => {
    fetchDocumentById();
  }, []);

  //   useEffect(() => {
  //     // Fetch the document data based on the id from the route params
  //     const document = documents.find((doc) => doc.id === id);

  //     if (document) {
  //       // Set the Quill content with existing data
  //       setQuillContent(document.content || '');
  //     }
  //   }, [id, documents]);

  const handleQuillChange = (content) => {
    setQuillContent(content);
  };

  const handleSave = async () => {
    const db = getFirestore();
    const documentRef = doc(db, "messages", id); // Replace 'yourCollection' with the actual collection name

    try {
      // Fetch the existing document data
      const existingDocument = await getDoc(documentRef);

      if (existingDocument.exists()) {
        const existingData = existingDocument.data();

        // Update only the 'content' field while keeping other fields unchanged
        await updateDoc(documentRef, {
          ...existingData,
          content: quillContent,
        });
        toast.success("Document content successfully updated!");
        setTimeout(() => navigate("/"), 1200);
      }
    } catch (e) {
      console.error("Error updating document content: ", e);
    }
  };

  return (
    <div className="sm:w-2/3 w-11/12 border mt-20 mx-auto p-2 sm:p-5">
      <h1 className="font-bold text-2xl uppercase mb-3">{quillHead}</h1>

      <ReactQuill className="" value={quillContent} onFocus={()=>setFocus(true)} onChange={handleQuillChange} />
      {
        focus && <button
        className="px-4 py-1 font-bold cla bg-green-600 rounded mt-4"
        onClick={handleSave}
      >
        Save
      </button>
      }
      <Toaster position="top-center" />
    </div>
  );
};

export default EditPage;
