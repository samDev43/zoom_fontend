import { PublicNav } from "../compoents/publicNav";
import { UserContext } from "../UserContext"
import { useContext } from "react"
import { isLoggedIn } from "../compoents/auth";
import { Footer } from "../compoents/footer";
import  { upLoadImage }  from "../compoents/uploadImage";
import { useState } from "react";
import { updateUserName, updateEmail, updatePassword, deleteAccount } from "../compoents/updateUserName";
import ConfirmModal from "../compoents/modal/confirmModal";

export function Setting(){
    const [ newUserName, setNewUserName ] = useState("");
    const [ newEmail, setNewEmail ] = useState("");
     const [ newPassword, setNewPassword ] = useState("");
     const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
    const { user } = useContext(UserContext);
    const auth = isLoggedIn();
    return(
        <>
          <PublicNav auth={auth}  user={user} />
    <div className="bg-[#0f1a1d] w-full">
        <div className="bg-[#0f1a1d]  w-[90%] md:w-[50%] lg:w-[40%] mx-auto pt-30 ">
                {/* <div className=""> */}
               <div className="flex flex-col gap-2 justify-start text-white">
                    <h1 className="text-4xl font-bold">Settings</h1>
                    <p className="text-lg text-gray-500">Manage your profile, security, and account.</p>
               </div>
                <div className="transition duration-300 hover:border hover:border-blue-500 flex flex-col gap-5 mt-5 w-[100%] p-5 rounded-lg bg-[#14181f]">
                    <div className="flex gap-2 items-center text-gray-500"> <i className="bi bi-person-circle"></i> <p>Profile Settings</p></div>
                    <div className="flex  items-center gap-5">
                        <div className="w-15 h-15 flex justify-center items-center rounded-full bg-white"><p>A</p></div>
                        <div className="flex flex-col justify-start gap-2">
                                <label htmlFor="profileUpload" className="p-2 rounded-lg transition duration-300 hover:bg-blue-200">
                                    <div className="flex items-center gap-2 text-white justify-center"><i className="bi bi-upload"></i> <p>upload profile</p></div>
                                    <input id="profileUpload" className="hidden" onChange={upLoadImage} type="file" />
                                </label>
                            <div><p className="text-gray-500 font-semibold">JPG, PNG or WEBP · max 2 MB</p></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-white">
                        <p>Username</p>
                        <input type="text" value={newUserName} onChange={(e) => {setNewUserName(e.target.value)}} className="p-2 w-full  bg-[#14181f] text-white placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => updateUserName(newUserName)} >save</button>
                    </div>
                </div>
            {/* </div> */}

            <div className="transition duration-300 hover:border hover:border-blue-500 bg-[#14181f] rounded-lg mt-5 p-5">
                <div className="flex items-center gap-2 text-gray-500"><i className="bi bi-key"></i> <p>security</p></div>
                <div className="flex flex-col items-start gap-2 text-white mt-5">
                    <p>Email</p>
                    <input type="email" value={newEmail} onChange={(e) => {setNewEmail(e.target.value)}} className="p-2 w-full  bg-[#14181f] text-white placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p className="text-gray-500">A confirmation link will be sent to the new address.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => {updateEmail(newEmail)}}>Update email</button>
                </div>
               <div className="flex flex-col items-start gap-2 text-white mt-5">
                    <p>password</p>
                    <input type="email" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} className="p-2 w-full  bg-[#14181f] text-white placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {/* <p className="text-gray-500">A confirmation link will be sent to the new address.</p> */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => {updatePassword(newPassword)}}>Update Password</button>
                </div>
            </div>
               <div className="mb-30">
                 <div className="transition duration-300 border-2 border-red-600 bg-[#14181f] rounded-lg mt-5  p-5 text-white"                                                                                                             >
                   <h1 className="text-red-600"><span>Danger zone</span></h1>
                   <div className="flex flex-col items-start mt-2 gap-2">
                    <h1>Delete account</h1>
                    <p className="w-[70%] text-gray-500">Permanently delete your account, all your posts, and your profile. This cannot be undone.</p>
                    <button className="px-5 py-2 rounded-lg bg-red-600" onClick={() => {setOpenDeleteModal(true)}}>Delete my account</button>
                    <ConfirmModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} onConfirm={() => {deleteAccount()}} cancelText="Cancel" title="Delete Account" message="Are you sure you want to delete your account? This action cannot be undone." />
                   </div>
                </div>
               </div>
               <div>
                {/* <p>are you okay</p> */}
               </div>

        </div>
        <Footer />
    </div>
        </>
    )
}