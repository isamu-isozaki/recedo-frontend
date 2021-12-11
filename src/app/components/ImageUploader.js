import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, Icon, FormLabel, Image, Button } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function Dropzone({ imgs, setImgs }) {
    const onDrop = useCallback((acceptedFiles) => {
        try {
            const file = acceptedFiles[acceptedFiles.length-1]
            const preview = URL.createObjectURL(file)
            // Only upload one image for now
            setImgs([{...file, preview, file }])
        } catch(error) {
            console.log('Failed upload')
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: '.jpg', maxFiles: 1, multiple: false,
    });

    const dropText = isDragActive ? 'Drop the files here ...' : 'Drag .jpg file here, or click to select files';
    const imgElems = imgs && imgs.map((img, idx) => <Image key={idx} src={img.preview} />)
    return (
        <>
            <FormLabel as="legend">Upload Receipt</FormLabel>
            {imgElems}
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
            <Button onClick={() => {setImgs([])}} marginTop={4}>Reset Imgs</Button>
        </>
    );
}

Dropzone.propTypes = {
    imgs: PropTypes.array,
    setImgs: PropTypes.func
}