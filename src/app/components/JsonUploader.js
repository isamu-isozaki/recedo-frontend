import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, Icon, FormLabel, Image, Button } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function JsonDropzone({ uploadJson, canUpload }) {
    const onDrop = useCallback((acceptedFiles) => {
        try {
            const file = acceptedFiles[acceptedFiles.length-1]
            uploadJson(file)
        } catch(error) {
            console.log('Failed upload')
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: '.json', maxFiles: 1, multiple: false,
    });

    const dropText = isDragActive ? 'Drop the files here ...' : 'Drag .json file here, or click to select files'
    return (
        canUpload ?
            <>
                <FormLabel as="legend">Upload Receipt JSON</FormLabel>
                <Center
                    marginTop={4}
                    p={10}
                    cursor="pointer"
                    transition="background-color 0.2s ease"
                    borderRadius={4}
                    border="3px dashed"
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <Icon as={AiFillFileAdd} mr={2} />
                    <p>{dropText}</p>
                </Center>
            </>
         :
        null        
    );
}

JsonDropzone.propTypes = {
    uploadJson: PropTypes.func,
    canUpload: PropTypes.bool,
}