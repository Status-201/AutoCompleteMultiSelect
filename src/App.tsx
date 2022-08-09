import Chip from "./components/Chip";
import { Post } from "./data";
import React, { useState } from "react";

interface IPost {
  id: number;
  title: string;
}

const App = () => {
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const filterOtiopns = (data: any) => {
    return data.filter(
      (data: IPost) =>
        data.title.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const removeSelection = (i: number) => {
    const newPeople = selectedOptions.filter(
      (selectedOption: { id: number }) => selectedOption.id !== i
    );
    setSelectedOptions(newPeople);
  };

  return (
    <div className="flex justify-center items-center w-full mt-20">
      <div className="w-96 border">
        <div
          className={
            selectedOptions.length > 0
              ? "flex flex-wrap p-2 border"
              : "flex flex-wrap"
          }
        >
          {selectedOptions?.map((p: IPost) => (
            <Chip
              key={p.id}
              id={p.id}
              title={p.title}
              removeSelection={removeSelection}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Here..."
          className="border focus:outline-none p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setToggleOptions(!toggleOptions)}
        />
        {toggleOptions ? (
          <div className="border max-h-40 overflow-x-auto">
            {filterOtiopns(Post).map((p: IPost) => (
              <div
                key={p.id}
                className="p-2 hover:bg-slate-200 hover:cursor-pointer"
                onClick={() => {
                  setSelectedOptions([...selectedOptions, p]);
                  setToggleOptions(!toggleOptions);
                  setQuery("");
                }}
              >
                {p.title}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
