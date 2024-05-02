import React from "react";
import { useAppContext } from "context/fact";

function FormModal() {
  const { facts, deleteFacts, addFacts } = useAppContext();
  const factsArray = facts
    ? Object.entries(facts).map(([id, value]) => ({ id, value }))
    : [];

  const [fact, setFact] = React.useState();

  return (
    <> 
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Enter a Goofy Fun Fact!</span>
              <span className="label-text-alt hidden">Top Right label</span>
            </label>
            <input
              type="text"
              value={fact}
              placeholder="Type here"
              onChange={(e) => setFact(e.target.value)}
              className="input input-bordered w-full   "
            />
            <label className="label">
              <span className="label-text-alt hidden">Bottom Left label</span>
              <span className="label-text-alt hidden">Bottom Right label</span>
            </label>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}

            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addFacts(fact);
              }}
              className="btn btn-success"
            >
              Save
            </button>
            <button className="btn btn-neutral">Cancel</button>
          </div>

          <div className="overflow-x-auto">
            {factsArray.length > 0 ? (
                <>
              <h1 className="text-2xl">Facts</h1>
              <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Fact</th>
                </tr>
              </thead>
              <tbody>
                {factsArray.map((item) => (
                  <tr key={item.id}>
                    <td>{item.value}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteFacts(item.id);
                        }}
                        className="btn btn-circle "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></>
            ) : (
              <h1 className="text-md">No Facts</h1>
            )}
            
          </div>
        </form>
      </dialog>
    </>
  );
}

export default FormModal;
