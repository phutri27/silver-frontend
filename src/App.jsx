import { useEffect, useState } from 'react'
import { fetchAPi } from './utils/fetchApi'
import Form from './components/Form'
import Table from './components/Table'
import "./App.css"


function App() {
  const [price, setPrice] = useState(0)
  const [table, setTable] = useState([])
  const [payload, setPayLoad] = useState({
    brand: '',
    quantity: '',
    base: ''
  })
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({
    brand: '',
    quantity: '',
    base: ''
  })
  
  useEffect(() => {
    let ignore = false
    async function load(){
      const response = await fetch("https://silver-backend-omega.vercel.app/")
      const datas = await response.json()
      if (!ignore){
        setTable(datas.rows)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
      async function load(){
        const res = await fetchAPi()
        setPrice(res)
      }
      load()
      const key = setInterval(load, 900000)
      
      return () => {
        clearInterval(key)
      }
  }, [])

  let total = 0;
  let totalQuantity = 0
  let totalBase = 0;
  for (const data of table){
    totalQuantity += data.quantity
    totalBase += (data.base_price * data.quantity)
    total += (data.quantity * price)
  }

  

  async function addItem(e) {
    e.preventDefault()

    await fetch(`https://silver-backend-omega.vercel.app/row`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setTable((table) => [...table, payload])

    window.location.href = "/"
  }

  function addBrand(e) {
    setPayLoad({...payload, brand: e.target.value})
  }

  function addQuantity(e) {
    setPayLoad({...payload, quantity: e.target.value})
  }

  function addBase(e) {
    setPayLoad({...payload, base: e.target.value})
  }

  async function deleteItem(id) {
    await fetch(`https://silver-backend-omega.vercel.app/row/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })

    setTable(items => items.filter(item => item.id !== id))
  }

  function editItem(item) {
    setEditId(item.id)
    setEditForm({
      brand: item.brand,
      quantity: item.quantity,
      base: item.base_price
    })
  }

  async function saveEdit(id) { 
    await fetch(`https://silver-backend-omega.vercel.app/row/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    })

    setTable(items => 
      items.map(item =>
        item.id == id ?
        {
          ...item,
          ...editForm,
          base_price: Number(editForm.base)
        } : item
      ) 
    )
    setEditId(null)
  }

  return (
    <div className='container'>
      <Form 
      addItem={addItem}
      payload={payload}
      addBrand={addBrand}
      addQuantity={addQuantity}
      addBase={addBase}
      />
      <table>
        <thead>
          <tr>
            <th scope="col" rowSpan="2">Hãng</th>
            <th scope="col" rowSpan="2">Số lượng</th>
            <th scope="col" rowSpan="2">Giá mua</th>
            <th scope="col" rowSpan="2">Giá trị hiện tại</th>
            <th scope="col" rowSpan="2">Lãi</th>
          </tr>
        </thead>
        <tbody>
          {table.map(item => 
            <Table 
            key={item.id}
            item={item}
            price={price}
            isEditing={editId === item.id}
            editForm={editForm}
            editItem={() => editItem(item)}
            setEditForm={setEditForm}
            saveEdit={() => saveEdit(item.id)}
            cancelEdit={() => setEditId(null)}
            delItem={() => deleteItem(item.id)}/>
            
            )}
        </tbody>
        <tfoot>
            <tr>
              <th>Tổng</th>
              <td>{totalQuantity}</td>
              <td>{(totalBase).toLocaleString('de-DE')}</td>
              <td style={total >= totalBase ? {color:"rgb(73, 238, 75)"} : {color:"red"}}>{(total).toLocaleString('de-DE')}</td>
              <td style={total >= 0 ? {color:"rgb(73, 238, 75)"} : {color:"red"}} >{(total - totalBase).toLocaleString('de-DE')}</td>
            </tr>
          </tfoot>
      </table>
    </div>
  )
}

export default App
