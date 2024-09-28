import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import axios from 'axios';
import { Loader } from 'lucide-react';
const SERVER_URL: string = import.meta.env.VITE_SERVER_URL

interface UploadResponse {
    message: string;
}

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            // Clear previous messages
            setError('');
            setSuccess('');
            setUploadProgress(0);

            if (fileRejections.length > 0) {
                setError('Unsupported file type. Please upload a PDF file.');
                return;
            }

            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]);
            }
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            //   'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
            //   'application/msword': ['.doc', '.docx'],
        },
        multiple: false, // Only allow one file
    });

    console.log({ getInputProps, getRootProps, isDragActive })
    const handleUpload = async () => {
        if (!file) {
            setError('No file selected.');
            return;
        }

        console.log({ file })

        setUploading(true);
        setError('');
        setSuccess('');
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post<UploadResponse>(`${SERVER_URL}/document/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                },
            });

            setSuccess(response?.data?.message || 'File uploaded successfully!');
            setFile(null);
        } catch (err) {
            console.error(err);
            setError('Error uploading file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError('');
        setSuccess('');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Drop the file here...</p>
                ) : (
                    <p className="text-gray-500">
                        Drag & drop a PDF file here, or click to select one
                    </p>
                )}
            </div>

            {file && (
                <div className="mt-4 flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span className="text-gray-700">{file.name}</span>
                    <button
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove file"
                    >
                        Remove
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                    {success}
                </div>
            )}

            {uploading && uploadProgress < 100 && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
                </div>
            )}

            {uploadProgress === 100 && uploading && (
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                    Syncing with the database...
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`flex items-center justify-center gap-4 mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${(!file || uploading) && 'opacity-50 cursor-not-allowed'
                    }`}
            >
                {uploading ? (<><Loader className="animate-spin" /> Uploading...</>) : 'Upload File'}

            </button>
        </div>
    );
};

export default FileUpload;
