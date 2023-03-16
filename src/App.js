import React,{useState, useEffect} from 'react';
import { View } from './components/View';
import Swal from 'sweetalert2';

const getDatafromLS=() =>{
  const data = localStorage.getItem('books');  // Local Storage-den melumati Get elemek
  if(data){   // eger data true-dusa onu parse elesin
    return JSON.parse(data);
  }
  else{
    return [] // deyilse bos array qaytarsin
  }
}

export const App = () => {

  const [books, setbooks]=useState(getDatafromLS());// localda olan melumati books ve setBooks-la idare etmek ucun

  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [isbn, setIsbn]=useState('');

  const handleAddBookSubmit=(event)=>{
    event.preventDefault(); // refreshin qarsini alsin
    // object yaratmaq
    let book = {
      title,
      author,
      isbn
    }
    setbooks([...books,book]); // spread op. - books arrayin-den ancaq books-u deyissin deye
    setTitle('');
    setAuthor('');
    setIsbn('');  // add eledikden sonra input-u temizlesin
    
    Swal.fire({
      title: 'Book is Added',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })
  }

  // delete book from LS
  const deleteBook=(isbn) => {
    const filteredBooks = books.filter((key) => {
      return key.isbn !== isbn   // gonderdiyimiz isbn-e localda olan isbn-e beraber deyilse filter etsin 
    })   
            // meselen 5 bookumuz var gonderdiyimizi isbn-i filter edib gotursunki
                               // butun 5 isbn-i nin hamisini cekmesin
    setbooks(filteredBooks);  //filter edilen isbn-i set edib silsin

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));// locala save etmek
  },[books]) //books-a yazan zaman jsona sting formada save elesin

  return (
    <div className='wrapper'>

      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label>Title</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <label>Author</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setAuthor(e.target.value)} value={author}></input>
            <label>ISBN</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            <button type="submit" className='btn btn-warning btn-md'>
              Add Book
            </button>
          </form>
        </div>

        <div className='view-container'>
          {/* books-un length-i 0-dan boyukdurse bu div-i yaradsin */}
          {books.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook}/> {/* view-a props-lar oturur */}
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            // setBooksa bos array veririkki ora atib  temizlesin butun elementleri
            onClick={()=>setbooks([])}>Remove all Books</button> 
          </>}
          {books.length <= 0 && <h3>This is Empty</h3>}  {/* books length-i 0 dan azdisa div-de bu yazi gorsensin */}
        </div>

      </div>
    </div>
  )
}

export default App
