import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useCollabrators from "../../hooks/use_collabrators";
import PeopleWithAccess from "./components/people_with_access";
import { ThreeDots } from "react-loader-spinner";
import useaddCollabrators from "../../hooks/use_addCollaborators";
import { useGetToken } from "../../hooks/auth/useGetToken";

export default function ShareScreen() {
  const navigate = useNavigate();
  
  const [email, setemail] = React.useState("");
  const [message, setmessage] = React.useState<{ status: "NONE" | "ERROR" | "SUCCESS", message: string }>({ status: "NONE", message: "" })
  const { isPending, error, data } = useCollabrators({
    spreadsheetId: "3",
    token : useGetToken()  
  });

async function  addCollaborators(spreadsheetId: string, email: string) {
    if(!useGetToken()) {
      setmessage({status: "ERROR", message: "Please login to add a collaborator"})
      return
    }
    const res = await  fetch(
        `https://sih-internal-backend-pm7h.onrender.com/collaborators/create?SpreadSheetID=${spreadsheetId}&email=${email}`,
        
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "/",
            },
        }
    )
    const data =await res.json()
    if(data.success){
      setmessage({status: "SUCCESS", message: "Collaborator added successfully"})
    }
    else{
      setmessage({status: "ERROR", message: data.msg})
    }
    
}

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          navigate("/");
        }
      }}
      className="absolute justify-center items-center backdrop-blur-[1px] w-full h-full text-gray-900 bg-transparent bg-opacity-50 z-10 flex"
    >
      {useGetToken() ? (
        <div className="bg-neutral-50 px-4 w-5/12 h-fit flex flex-col overflow-hidden rounded-3xl py-8">
          <div className="text-xl px-2 mb-2">
            <p>Share SpreadSheet</p>
          </div>{" "}
          <div className="flex flex-row items-center gap-1 ">
            <input
              className="outline-none border-2 border-yellow-400 h-12 px-4 py-2 rounded-tl-full rounded-bl-full w-full"
              placeholder="Enter email of the collabrator"
              type="email"
              onChange={(e) => setemail(e.target.value)}
            // style={{ clipPath: "inset(0 px 0 0" }}
            ></input>

            <button className="border-2 border-yellow-400 bg-white hover:bg-yellow-200 h-12 pr-2 pl-1 rounded-tr-full rounded-br-full" onClick={()=>addCollaborators("3", email)}>
              <IconContext.Provider value={{ color: "Black", size: "32px" }}>
                <IoMdAdd />
              </IconContext.Provider>
            </button>
          </div>
            {message.status === "NONE" && <p className="pl-3 mt-2 text-gray-800 text-sm">Add a collaborator to share the spreadsheet</p>}
            {message.status === "ERROR" && <p className="pl-3 mt-2 text-red-500 text-sm">{message.message}</p>}
            {message.status === "SUCCESS" && <p className="pl-3 mt-2 text-green-500 text-sm">{message.message}</p>}
          <div className="text-xl px-2 my-4">
            <p className="mb-4">People with access</p>
            {data != undefined ? (
              data.data.map((element) => {
                return (
                  <PeopleWithAccess
                    collabrator={element}
                    key={element.user.id}
                  />
                );
              })
            ) : (
              <div className="w-full flex justify-center items-center pb-2">
                <ThreeDots color="#facc15" />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="flex justify-center items-center gap-1 px-4 py-2 border-stone-900 border-2 rounded-full hover:bg-yellow-200"
            >
              <FaLink />
              <span>Copy Link</span>
            </button>
            <button
              type="button"
              className="flex bg-yellow-200 justify-center items-center gap-1 px-4 py-2 border-stone-900 border-2 rounded-full hover:bg-yellow-400"
              onClick={() => navigate(-1)}
          
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  bg-neutral-50 p-8  shadow-md rounded-lg ">
          <p className="font-medium text-xl text-gray-800 mb-4">
            Please login to share this spreadsheet
          </p>
          <Link
            to="/auth"
            className="px-6 py-3 bg-yellow-400 text-yellow-900 rounded-md font-semibold hover:bg-yellow-500 transition duration-300 ease-in-out flex items-center"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
