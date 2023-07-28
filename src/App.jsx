import { useState, useEffect } from 'react'
import './App.css'

const getLocalData=()=>
{
  const lists=localStorage.getItem('mytodo');

  if(lists)
  {
    return JSON.parse(lists);
  }
  else
  {
    return [];
  }
}
function App() {
  const [inputData, setInputData] = useState('');
  const[items, setItems]=useState(getLocalData());
  const [editedItem, setEditedItem]=useState('');

  //Add the item
  const addItem = () => {
    if (!inputData) {
      alert('Please fill the data');
    }
    else {
      if (editedItem) {
        // If we have an editedItem, it means we're in edit mode
        const updatedItems = items.map((currEle) =>
          currEle.id === editedItem ? { ...currEle, name: inputData } : currEle
        );
        setItems(updatedItems);
        setEditedItem(''); // Clear the editedItem state to exit edit mode
      } 
      else {
        // If there's no editedItem, we're adding a new note
        const setNewData = {
          id: new Date().getTime().toString(),
          name: inputData,
        };
        setItems([...items, setNewData]);
      }
      setInputData(''); // Clears the text area after addition or editing of the text.
    }
  };

  //Putting data to Local Storage
  useEffect (()=>
  {
    localStorage.setItem('mytodo',JSON.stringify(items));
  },[items]);


  //Deleting the item
  const deleteItem = (event)=>
  {
    const updatedItems =items.filter((currEle)=>
    {
      return currEle.id !==event;
    })
    setItems(updatedItems);
  }


  //Editing the item
  const editItem=(index)=>
  {
    const itemEdited=items.find((currEle)=>
    {
      return currEle.id===index;
    });
    setInputData(itemEdited.name);
    setEditedItem(index);
  }

  //Remove all item
  const removeAll=()=>
  {
    setItems([]);

  }

  return (
    <>
    <div className='container'>
      <form>
        <h1 className='heading-1 my-3' align='center'>Add Your Note Here 📑📑</h1>
        <div className="mb-3 my-5">
          <div className='d-flex justify-content-around'>
            <div className="input-group mb-3 w-50">
              <input type="text" className="form-control" placeholder="✍️✍️ Add your Note" aria-label="Recipient's username" aria-describedby="basic-addon2" value={inputData}
              onChange={(e)=>
              {
                setInputData(e.target.value); 
              }} />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2"> <i className="fa-2x fa-plus" aria-hidden="true" onClick={addItem}></i></span>
              </div>
            </div> 
          </div>
          {/* show button */}
          

          {/* All added items */}
          <h1 className='my-4' align='center'>Your Notes</h1>
            {items.length > 0 ? ( 
            items.map((currEle)=>
            {
              return (
                <>
                <div className='container my-3 d-flex justify-content-between' style={{backgroundColor:'white', color:'black', width:'50%', height: '40px'}}  key={currEle.id} >
                  <div className='my-2'>{currEle.name}</div>
                  <div className='d-flex justify-content-between'>
                    <div className='my-2'><i className="fa fa-edit mx-2" aria-hidden="true" onClick={()=>editItem(currEle.id)}></i></div>
                    <div className='my-2'><i className="fa fa-trash" aria-hidden="true" onClick={()=>deleteItem(currEle.id)}></i></div>
                  </div>
                </div>
                </>
              );
            })
           ) : (<h3 className='my-3 text-center'>No notes present</h3>)}
          <div className='d-flex justify-content-around'>
            <button className='btn btn-primary mb-5 mt-4 checkList'disabled={items.length < 1} onClick={removeAll}>Remove All</button>
          </div>
        </div>
      </form>
    </div>  
    </>
  )
}

export default App
