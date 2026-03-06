import { useState } from "react";

export function Factor() {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="flex w-[90%] mx-auto  flex-wrap gap-4">
        <Form
          isOpen={isOpen}
          list={list}
          onSetList={setList}
          onIsOpen={setIsOpen}
        />
        <InvoiceTable
          isOpen={isOpen}
          list={list}
          onSetList={setList}
          onIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}

function Header() {
  return (
    <h1 className="text-3xl text-zinc-700 font-semibold font-serif m-8 text-center">
      🗒️Sales Invoice
    </h1>
  );
}

function Form({ isOpen, list, onSetList, onIsOpen }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [number, setNumber] = useState(0);
  function handleSaveList(e) {
    e.preventDefault();

    if (name !== " " && price !== 0 && number !== 0) {
      onSetList([...list, { name: name, number: number, price: price }]);
    }

    setName("");
    setPrice(0);
    setNumber(0);
  }
  console.log(list);

  return (
    isOpen && (
      <form
        className="bg-rose-100  p-4 w-[30%] rounded-lg "
        style={{ display: onIsOpen ? "block" : "none" }}
      >
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold text-lg">Sales Form</h2>
          <span
            className="text-right cursor-pointer"
            onClick={() => onIsOpen(!isOpen)}
          >
            ❎
          </span>
        </div>
        <label>Product Name:</label>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>price:</label>
        <input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <label>Number:</label>
        <input
          value={number}
          type="number"
          onChange={(e) => setNumber(e.target.value)}
        ></input>

        <button
          className="p-1 bg-gradient-to-r from-teal-700 to-sky-800 text-white rounded-lg mt-4 w-full text-sm"
          onClick={(e) => handleSaveList(e)}
        >
          Add
        </button>
      </form>
    )
  );
}

function InvoiceTable({ isOpen, list, onSetList, onIsOpen }) {
  return (
    <div className=" bg-rose-100 w-[60%]  border-2 border-zinc-500 mx-auto flex flex-col justify-between ">
      <table className="  w-full ">
        <caption className="text-xl  font-semibold m-2">
          💲Products Factor
        </caption>
        <TableHead />
        <AddProducts list={list} onSetList={onSetList} />
        <Total list={list} />
      </table>
      <button
        className="p-1  bg-gradient-to-r from-teal-700 to-sky-800 text-white w-full font-semibold text-lg "
        onClick={() => onIsOpen(!isOpen)}
      >
        Add Pruchased Products
      </button>
    </div>
  );
}

function TableHead() {
  return (
    <thead className="row  ">
      <th className=" header">Row</th>
      <th className="  header">Name</th>
      <th className=" header ">Price</th>
      <th className=" header">Numbers</th>
      <th className="header">Delete</th>
    </thead>
  );
}

function AddProducts({ list, onSetList }) {
  function handleDeleteItem(index) {
    console.log(index);

    onSetList(list.filter((_, i) => index !== i));
  }
  return (
    <>
      {list.length <= 0
        ? ""
        : list.map((items, index) => {
            return (
              <>
                <tr key={index} className="row">
                  <td>{++index}</td>
                  <td className="cell">{items.name}</td>
                  <td className="cell">$ {items.price}</td>
                  <td className="cell">{items.number}</td>
                  <td
                    className="cursor-pointer "
                    onClick={() => handleDeleteItem(--index)}
                  >
                    ❎
                  </td>
                </tr>
              </>
            );
          })}
    </>
  );
}

function Total({ list }) {
  const numbers = list.map((items) => items.price * items.number);
  const total = numbers.reduce((total, numbers) => (total += numbers), 0);
  return (
    <tr className="row">
      <td className="cell ">Total</td>

      <td className="text-right">${total}</td>
    </tr>
  );
}
