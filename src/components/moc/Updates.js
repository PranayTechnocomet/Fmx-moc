'use client'
import React, { useState } from 'react'
import Card from '../ui/Card'
import InputField from '../ui/form/Input'
import { Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function Updates() {
    const [descriptions, setDescriptions] = useState([{ id: 1, value: '' }]);
    const [scope, setScope] = useState('');
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');

    const addDescription = () => {
        setDescriptions([...descriptions, { id: Date.now(), value: '' }]);
    };

    const removeDescription = (id) => {
        if (descriptions.length > 1) {
            setDescriptions(descriptions.filter(desc => desc.id !== id));
        }
    };

    const updateDescription = (id, value) => {
        setDescriptions(descriptions.map(desc =>
            desc.id === id ? { ...desc, value } : desc
        ));
    };

    const addUpdate = async () => {
        // Basic validation
        if (!scope.trim() || !subject.trim() || !details.trim() || descriptions.some(desc => !desc.value.trim())) {
            alert('Please fill in all required fields');
            return;
        }
    
        try {
            // Prepare the form data
            const formData = new FormData();
            
            // Add text fields
            formData.append('scope', scope.trim());
            formData.append('subject', subject.trim());
            formData.append('details', details.trim());
            
            // Add descriptions as JSON array
            const descriptionTexts = descriptions.map(desc => desc.value.trim());
            formData.append('descriptions', JSON.stringify(descriptionTexts));
            
            
    
            // Replace with your actual API endpoint
            const response = await fetch('YOUR_API_ENDPOINT/updates', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - let the browser set it with the correct boundary
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // If using authentication
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit update');
            }
    
            const result = await response.json();
            
            // Reset form on success
            setScope('');
            setSubject('');
            setDetails('');
            setDescriptions([{ id: 1, value: '' }]);
            
            // Show success message
            alert('Update added successfully!');
            
            // You might want to update the parent component or refresh the updates list
            // onUpdateSuccess?.(); // Uncomment if you have a success callback
    
        } catch (error) {
            console.error('Error adding update:', error);
            alert('Failed to add update. Please try again.');
        }
    };


    return (
        <div>
            <Card className="p-6">
                <div>
                    <div className="flex mb-4 items-center">
                        <div className="w-1/6">
                            <label className="font-medium">Scope of update</label>
                        </div>
                        <div className="w-3/4">
                            <InputField
                                className='w-full'
                                placeholder="Enter scope of update"
                                value={scope}
                                onChange={(e) => setScope(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex mb-4 items-center">
                        <div className="w-1/6">
                            <label className="font-medium">Subject</label>
                        </div>
                        <div className="w-3/4">
                            <InputField
                                className='w-full'
                                placeholder="Enter subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex mb-4 items-center">
                        <div className="w-1/6">
                            <label className="font-medium">Details</label>
                        </div>
                        <div className="w-3/4">
                            <InputField
                                className='w-full'
                                placeholder="Enter details"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 mb-5">
                        <p className="font-medium mb-2">Description</p>
                        <div className="shadow rounded-md overflow-hidden mb-4">
                            <table className="w-full mb-3">
                                <thead>
                                    <tr className='bg-gray-100 text-slate-600 text-left'>
                                        <th className="p-2 font-thin text-sm">
                                            Sr no.
                                        </th>
                                        <th className="p-2 font-thin text-sm w-auto px-5">
                                            Update
                                        </th>
                                        <th className="">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {descriptions.map((desc, index) => (
                                        <tr key={desc.id}>
                                            <td className="p-2 py-2.5 w-[5%]">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 py-2.5 w-full">
                                                <InputField
                                                    className="w-full border-0 focus:ring-0 p-0"
                                                    placeholder={`Enter description ${index + 1}`}
                                                    value={desc.value}
                                                    onChange={(e) => updateDescription(desc.id, e.target.value)}
                                                />
                                            </td>
                                            <td className="p-5 py-2.5">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeDescription(desc.id)}
                                                    disabled={descriptions.length <= 1}
                                                    className="text-red-500 border-transparent hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end items-center mt-2">
                            <Button
                                onClick={addDescription}
                                variant="outline"
                                size="sm"
                                className=" "
                            >
                                <Plus className="flex items-center h-4 w-4" />
                                Add Description
                            </Button>
                        </div>
                    </div>
                </div>
            

                <Button
                    onClick={addUpdate}
                    variant="outline"
                    size="sm"
                    className=""
                >
                    <Plus className="flex items-center h-4 w-4" />
                    Add Update
                </Button>
            </Card>
        </div>
    )
}
