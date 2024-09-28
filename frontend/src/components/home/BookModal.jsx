import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { BsTypeH2 } from 'react-icons/bs';
const api_key = 'AIzaSyDiw78WTjY4ELubtDgA_AHIrlqQbIwqXbs';
const BookModal = ({ book, onClose }) => {


    const [values, setValues] = useState([]);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI(api_key);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const prompt = `From the Book: ${book.title}, Author: ${book.author}, Year of publication: ${book.publishYear}, Give me 10 values from the book and summary of the book.`;
                const result = await model.generateContent(prompt);
                const response = await result.response.text();

                // Cleaning and parsing the response
                const cleanResponse = response.replace(/##/g, '').replace(/\*\*/g, '');
                const valuesPart = cleanResponse.split('Summary of')[0].trim();
                const summaryPart = cleanResponse.split('Summary of')[1]?.trim() || '';

                const valuesArray = valuesPart.split('\n').map(line => line.trim()).filter(line => line);

                setValues(valuesArray);
                setSummary(summaryPart);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [book]);

    // const [result, setResult] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const genAI = new GoogleGenerativeAI(api_key);


    // useEffect(() => {
    //     async function fetchData() {
    //         setLoading(true);
    //         try {
    //             const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //             const prompt = `From the Book: ${book.title}, Author: ${book.author} ,Year of publication: ${book.publishYear} , Give me 10 values from the book and summary of the book `;
    //             const result = await model.generateContent(prompt);
    //             const response = await result.response;
    //             const cleanResponse = response.text().replace(/##/g, '').replace(/\*\*/g, '');
    //             setResult(cleanResponse);
    //             setLoading(false);
    //             // setResult( response.text());
    //             // setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setLoading(false); 
    //         }
    //     }

    //     fetchData();
    // }, []);


    return (
        // <div className='fixed bg-black  bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
        //     onClick={onClose}>
        //     <div
        //         onClick={(event) => event.stopPropagation()}
        //         className='w-full h-screen max-w-full  bg-white rounded-xl p-4 flex flex-col relative '
        //     >
        //         <AiOutlineClose className='absolute right-6 top-6 text-3xl  text-red-600 cursor-pointer'
        //             onClick={onClose}
        //         />
        //            <p className='mt-4'>Values: </p>


        //            { loading ? <h2> Generating from AI</h2> : <p className='mt-4'>{result} </p>}
        //     </div>

        // </div>


        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className='w-full h-screen max-w-full bg-white rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
                <div className='overflow-y-auto h-full'>
                    <p className='mt-4'>Values:</p>
                    {loading ? <h2>Generating from AI...</h2> : (
                        <div className='mt-4'>
                            {values.map((value, index) => (
                                <p key={index} className='mt-2'>{value}</p>
                            ))}
                            {summary && (
                                <div className='mt-4'>
                                    <h3 className='font-bold'>Summary:</h3>
                                    <p>{summary}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookModal;




// import { model } from '../../../../utils/GeminiAIModal';
// import { outputParser } from '../../../../utils/GeminiAIModal';
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// const { GoogleGenerativeAI } = require("@google/generative-ai");



// useEffect(() => {
//     const fetchData = async () => {
//         const genAIModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const prompt = "Write a story about a magic backpack.";
//         const response = await genAIModel.generateContent(prompt);
//         setResult(response.text());
//         console.log(response)
//     };

//     fetchData();
// }, []);


// const prompt = ChatPromptTemplate.fromMessages([
//     ["human", "From the Book: {title}, Author: {author} ,Year of publication: {publishYear} , Give me 10 values from the book and summary of the book in json format . Stricky only give summary and 10 values in json format ."],
// ]);

// const chain = prompt.pipe(model).pipe(outputParser);


// const response =  chain.invoke({
//     title: book.title,
//     author: book.author,
//     publishYear: book.publishYear,
// });

// console.log(JSON.parse(response));

{/* <h2 className="w-fit px-4 py-1  bg:red-300 rounded-lg">
                    {book.publishYear}
                </h2>
                <h4 className="my-2 text-gray-500"> {book._id} </h4>

                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.author}</h2>
                </div>
                <p className='mt-4'> Anything you want to show</p>
                <p className='my-2'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum beatae illum, animi modi accusamus blanditiis tempora ipsa obcaecati odio iure, architecto dolore nisi, vel aspernatur expedita quas ut at porro!
                    Consectetur similique omnis quidem repellendus est nisi voluptatum aut labore enim. Libero aliquid expedita sequi repellendus delectus a iste ipsam. Dolor amet cum nulla perspiciatis voluptate dolore perferendis magnam fugiat.
                </p> */}