import React, {useState} from 'react'



export default function Textform(props) {

    const handleUpClick = () =>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase", "success");
    }

    const handleLowClick = () =>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase", "success");
    }

    const handleClearClick = () =>{
        let newText = '';
        setText(newText);
        props.showAlert("Cleared", "success");
    }

    const handleExtraSpace = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra space removed", "success");
    }

    const handleCopyClick = () => {
        let newText = document.getElementById("myBox");
        newText.select();
        newText.setSelectionRange(0, 9999); 

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(newText.value)
                .then(() => {
                    console.log("Text copied to clipboard");
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                });
        } else {
            document.execCommand('copy');
            console.log("Fallback: Text copied to clipboard");
        }
        props.showAlert("Copied to clipboard", "success");
    };
    
    const handleOnChange = (event) =>{
        setText(event.target.value);
    }

    const [text, setText] = useState('');


    return (
    <>
    <div className="container " style={{color: props.mode==='dark'?'white':'black'}}>
        <h1 className="mb-3">{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" id="myBox" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'black'}} rows="8"></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleUpClick} >Convert to UpperCase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleLowClick} >Convert to LowerCase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleClearClick} >Clear text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleCopyClick}>Copy text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleExtraSpace}>Remove Extra Spaces</button>
    </div>
    <div className="container my-2" style={{color: props.mode==='dark'?'white':'black'}}>
        <h2>Your text summary</h2>
        <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} word {text.length} characters</p>
        <p>{0.008*text.split(" ").filter((element)=>{return element.length!==0}).length} minutes to read</p>
        <h3>Preview</h3>
        <p>{text.length>0?text:"Nothing to preview"}</p>
    </div>
    </>
  )
}
