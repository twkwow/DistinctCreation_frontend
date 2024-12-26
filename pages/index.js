"use client";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"; // Import Image Preview styles
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { Button } from "@mui/material";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

export default function Home() {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  const handleUpload = async () => {
    console.log(files, "files");
    if (files.length === 0) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("picture", files[0]);

    try {
      const response = await axios.post(
        "http://localhost:3001/uploadSingle",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: function (status) {
            return status < 500;
          },
        }
      );

      if (response.status === 200) {
        console.log("Upload success");
        setLink(response.data.fileUrl);
        setThumbnails(response.data.thumbnails);
        alert("Upload success");
      } else if (response.status === 400) {
        console.log("Invalid file or something");
        alert("Invalid file?");
      }
    } catch (error) {
      console.log("error here", error);
    }
  };

  const handleUploadZip = async () => {
    console.log(files2, "files2");
    if (files2.length === 0) {
      alert("Please select a ZIP file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files2[0]);

    try {
      const response = await axios.post(
        "http://localhost:3001/uploadSingleOrZip",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: function (status) {
            return status < 500;
          },
        }
      );

      if (response.status === 200) {
        console.log("Upload success");
        setLink2([response.data.fileUrl]);
        alert("Upload success");
      } else if (response.status === 201) {
        console.log("Upload success");
        setLink2(response.data.imageLinks);
        console.log(response.data.imageLinks);
        alert("Upload success");
      } else if (response.status === 400) {
        console.log("Invalid file or something");
        alert("Invalid file?");
      }
    } catch (error) {
      console.log("error here", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* story 1 & 3 */}
        <h1 className={styles.title}>Story 1 & Story 3</h1>
        <div className={styles.grid}>
          <a className={styles.card}>
            <h3>Upload Image Only</h3>
            {/* only accept picture, otherwise not allow */}
            <FilePond
              files={files}
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file));
              }}
              acceptedFileTypes={["image/*"]}
              allowMultiple={false}
              name="picture"
              labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
            />
            <Button onClick={handleUpload}>Upload</Button>
            {link && (
              <div>
                <p>
                  Permanent Link:{" "}
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </p>
                {thumbnails.length > 0 && (
                  <div>
                    <h4>Thumbnails:</h4>
                    {thumbnails.map((thumbnail, index) => (
                      <p key={index}>
                        <a
                          href={thumbnail}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {thumbnail}
                        </a>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </a>
        </div>

        {/* story 2 */}
        <h1 className={styles.title}>Story 2.1</h1>
        <div className={styles.grid}>
          <a className={styles.card}>
            <h3>Upload Zip and Extract Image </h3>
            {/* only accept picture, otherwise not allow */}
            <FilePond
              files={files2}
              onupdatefiles={(fileItems) => {
                setFiles2(fileItems.map((fileItem) => fileItem.file));
              }}
              acceptedFileTypes={["image/*", "application/x-zip-compressed"]}
              allowMultiple={false}
              name="picture"
              labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
            />
            <Button onClick={handleUploadZip}>Upload</Button>
            {link2.length > 0 && (
              <div>
                <h4>Permanent Links:</h4>
                {link2.map((link, index) => (
                  <p key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </p>
                ))}
              </div>
            )}
          </a>
        </div>
      </main>
    </div>
  );
}
