function Form({addItem, addBrand, addQuantity, addBase, payload}){
    return (
        <form className="form-container" onSubmit={addItem}>
          <div>
            <label htmlFor="brand">Hãng</label>
            <select onChange={(e) => addBrand(e)} name="brand" id="brand" required>
              <option disabled selected value={null}>Chon</option>
              <option value="Ancarat">Ancarat</option>
              <option value="Phu Quy">Phu Quy</option>
              <option value="KNP">KNP</option>
              <option value="KNP My Nghe">KNP My Nghe</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity">Số lượng</label>
            <input 
            type="number" 
            id='quantity' 
            name='quantity'
            onChange={(e) => addQuantity(e)}
            value={payload.quantity} required/>
          </div>

          <div>
            <label htmlFor="base">Giá mua</label>
            <input 
            type="number" 
            id='base' 
            name='base'
            onChange={(e) => addBase(e)}
            value={payload.base} required/>
          </div>
          <button type='submit'>Submit</button>
      </form>
    )
}

export default Form