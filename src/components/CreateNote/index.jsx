import React from 'react'


const CreateNote = ({inputText, setInputText, saveHandler}) => {
    const char= 100;
    const charLimit = char - inputText.length;
  return (
    <div className='note'>
        <textarea
        required
        cols={10}
        rows={5}
        placeholder='Type Here...'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={100}
        >
        </textarea>
        <div className='note__footer'>
            <span className='label'>{charLimit} Left</span>
            <button className='note__save' onClick={saveHandler}>Save</button>
        </div>
    </div>
  )
}

export default CreateNote