import React, { useState, useEffect } from 'react';

const FileDisplay = ({ fileName }) => {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`http://localhost:3010/download/${fileName}`);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setFileUrl(objectUrl);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileName]);

  return (
    <div>
      <h2>File Display</h2>
      {fileUrl && (
        <iframe
          src={fileUrl}
          title="File Preview"
          width="100%"
          height="500"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
};

export default FileDisplay;