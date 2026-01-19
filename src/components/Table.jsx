function Table({ 
  delItem, 
  id, 
  item,
  price,
  isEditing,
  editItem,
  editForm,
  setEditForm,
  saveEdit,
  cancelEdit
  }){
    const currentPrice = item.brand === "KNP" ? Math.round(price * 0.97) : price
    const profit = (currentPrice * item.quantity) - (item.base_price * item.quantity)
    const currentValue = currentPrice * item.quantity
  return (
    <>
    {isEditing ? (
      <tr className="tr-table">
        <td>
          <input
            value={editForm.brand}
            onChange={e =>
              setEditForm({ ...editForm, brand: e.target.value })
            }
          />
        </td>
        <td>
          <input
          type='number'
            value={editForm.quantity}
            onChange={e =>
              setEditForm({ ...editForm, quantity: e.target.value })
            }
          />
        </td>
        <td>
          <input
          type='number'
          step={100000}
            value={editForm.base}
            onChange={e =>
              setEditForm({ ...editForm, base: e.target.value })
            }
          />
        </td>
        <td colSpan="2">
          <button onClick={saveEdit}>Lưu</button>
          <button onClick={cancelEdit}>Hủy</button>
        </td>
      </tr>
    ) :
    (<>
      <tr>
        <td>{item.brand}</td>
        <td>{item.quantity}</td>
        <td>{(item.base_price * item.quantity).toLocaleString('de-DE')}</td>
        <td>{currentValue.toLocaleString('de-DE')}</td>
        <td style={profit > 0 ? {color: "rgb(73, 238, 75)"} : {color:"red"}}>{profit.toLocaleString('de-DE')}</td>
        <div>
          <button onClick={editItem}>Edit</button>
          <button onClick={delItem}>X</button>
        </div>
      </tr>
      </>)
    }
    </>
  )
}

export default Table