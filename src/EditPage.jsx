import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "@firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { toast, Toaster } from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams();
  const [quillContent, setQuillContent] = useState("");
  const [quillHead, setQuillHead] = useState("");
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
    <div>
      <h1>{quillHead}</h1>
      <ReactQuill value={quillContent} onChange={handleQuillChange} />
      <button
        className="px-4 py-1 bg-green-600 rounded mt-4"
        onClick={handleSave}
      >
        Save
      </button>
      <Toaster />
    </div>
  );
};

export default EditPage;
