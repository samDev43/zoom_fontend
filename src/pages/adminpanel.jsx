import { PublicNav } from "../compoents/publicNav"
// import { showUserTable, showPostTable } from "../compoents/showTable"
import { useState, useEffect } from "react"
import axios from "axios";
import { isLoggedIn } from "../compoents/auth";
import { formatDate } from "../compoents/formatData";
import { Link } from "react-router-dom";
import { deletPost } from "../compoents/deletPost";
import { deleteAccount } from "../compoents/updateUserName";
// import { UserContext } from "../UserContext";
// import { useContext } from "react";
import ConfirmModal from "../compoents/modal/confirmModal";

export function AdminPanel() {
    const [check, setCheck] = useState(true);
    const [check2, setCheck2] = useState(false);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    // const { user } = useContext(UserContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState({});
    const auth = isLoggedIn();
    const user = JSON.parse(localStorage.getItem("user"));



    useEffect(() => {
        const token = localStorage.getItem("token");
        const getAllUsers = async () => {
            try {
                const res = await axios.get("https://myzoomapi.great-site.net/zoom_backend-main/src/api/getallUsers.php", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(res.data.users);
            } catch (err) {
                console.log(err);
            }
        }

        const getAllPosts = async () => {
            try {
                const res = await axios.get("https://myzoomapi.great-site.net/zoom_backend-main/src/api/getallposts.php", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPosts(res.data.posts);
            } catch (err) {
                console.log(err);
            }
        }

        getAllUsers()
        getAllPosts()
    }, [])

  
    return (
        <>
            <PublicNav auth={auth} />
            <div className="bg-gradient-to-b from-[#0B1215] h-screen overflow-y-auto to-[#111C22] pt-40  ">
                <div className="max-w-6xl w-[92%] mx-auto">
                    <div className="flex  flex-col gap-3 ">
                        <div ><i className="text-4xl md:text-5xl font-black text-white tracking-tight"></i> <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Admin panel</h1></div>
                        <p className="text-[#94A3B8] text-lg mt-1">Manage users and content across the platform.</p>
                    </div>
                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                    mt-10
                    ">
                        <div className="
                        bg-[#111C22]
                        border
                        border-[#22313A]
                        rounded-3xl
                        p-6
                        flex
                        items-center
                        justify-between
                        hover:border-[#39F3E2]/40
                        transition
                        ">
                            <div className="
                        w-14 h-14
                        rounded-2xl
                        bg-[#16242C]
                        flex
                        items-center
                        justify-center
                        text-[#39F3E2]
                        text-2xl
                        "><i className="p-5 rounded-lg bi bi-people-fill"></i></div>
                            <div className="flex flex-col gap-4 items-start">
                                <p className="text-[#94A3B8]">Total user</p>
                                <p className="text-3xl font-bold text-white mt-1">({users?.length || 0})</p>
                            </div>

                        </div>
                        <div className="
                        bg-[#111C22]
                        border
                        border-[#22313A]
                        rounded-3xl
                        p-6
                        flex
                        items-center
                        justify-between
                        hover:border-[#39F3E2]/40
                        transition
                        ">
                            <div className="
                        w-14 h-14
                        rounded-2xl
                        bg-[#16242C]
                        flex
                        items-center
                        justify-center
                        text-[#39F3E2]
                        text-2xl
                        "><i className="p-5 rounded-lg bi bi-file-earmark-text"></i></div>
                            <div className="flex flex-col gap-4 items-start">
                                <p className="text-[#94A3B8]">Total post</p>
                                <p className="text-3xl font-bold text-white mt-1">({posts?.length || 0})</p>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="flex gap-5 w-[225px] text-white items-center justify-start mt-10 p-2 rounded-lg bg-black">
                            <p className={`
                            px-5 py-2
                            rounded-xl
                            font-medium
                            transition
                            ${check
                                    ? "bg-[#39F3E2] text-[#0B1215]"
                                    : "text-[#94A3B8] hover:text-white"
                                }
                        `} onClick={() => {
                                    setCheck(true);
                                    setCheck2(false);
                                }}>Users({users?.length || 0})</p>
                            <p className={`
                        px-5 py-2
                        rounded-xl
                        font-medium
                        transition
                        ${!check
                                    ? "bg-[#39F3E2] text-[#0B1215]"
                                    : "text-[#94A3B8] hover:text-white"
                                }
                        `} onClick={() => {
                                    setCheck(false);
                                    setCheck2(true);
                                }}>Post({posts?.length || 0})</p>
                        </div>
                    </div>

                    <div>
                        <table className="
                        mt-8
                        mb-10
                        bg-[#111C22]
                        border
                        border-[#22313A]
                        rounded-3xl
                        overflow-hidden
                        w-[90%]
                        mx-auto
                        text-white
                        ">
                            {check && (
                                users?.length > 0 ? (
                                    <>
                                        <thead >
                                            <tr className="px-4 border-b border-[#22313A] text-[#94A3B8]">
                                                <th className="text-left p-5">userName</th>
                                                <th className="text-left p-5">joined</th>
                                                <th className="text-left p-5">Role</th>
                                                <th className="text-left p-5"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((userr) => (
                                                    <tr key={userr.id} className=" border-b border-b border-[#22313A] hover:bg-[#16242C]/60 transition">
                                                        <td className="text-left p-5">{userr.username}</td>
                                                        <td className="text-left p-5">{formatDate(userr.timestamp)}</td>
                                                        <td className="text-left p-5">{userr.role}</td>
                                                        <td className="text-left p-5">
                                                            <div>
                                                                <button className="
                                                    w-10 h-10
                                                    rounded-xl
                                                    bg-[#16242C]
                                                    border
                                                    border-[#22313A]
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-[#39F3E2]
                                                    hover:bg-[#39F3E2]
                                                    hover:text-[#0B1215]
                                                    transition
                                                   " onClick={() => setAccountToDelete(userr)}><i className="text-red-600 bi bi-trash3"></i>
                                                                </button>
                                                                
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </>
                                ) : (
                                    <tfoot>
                                        <tr className="flex justify-center items-center w-full bg-black rounded-lg mt-5">
                                            <td className="py-20">No Post yet</td>
                                        </tr>
                                    </tfoot>
                                )
                            )}
                            
                        

                            {check2 && (
                                posts?.length > 0 ? (
                                    <>
                                        <thead >
                                            <tr className="px-4 border-b ">
                                                <th className="text-left p-5">Title</th>
                                                <th className="text-left p-5">Author</th>
                                                <th className="text-left p-5">Data</th>
                                                <th className="text-left p-5"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                posts.map((post) => (
                                                    <tr key={post.id} className=" border-b ">
                                                        <td className="text-left p-5">{post.title}</td>
                                                        <td className="text-left p-5">{user.username}</td>
                                                        <td className="text-left p-5">{formatDate(post.created_at)}</td>
                                                        <td className="text-right p-5">
                                                            <div className="justify-end flex gap-3">
                                                                <Link className="
                                                w-10 h-10
                                                rounded-xl
                                                bg-[#16242C]
                                                border
                                                border-[#22313A]
                                                flex
                                                items-center
                                                justify-center
                                                text-[#39F3E2]
                                                hover:bg-[#39F3E2]
                                                hover:text-[#0B1215]
                                                transition
                                            " to={`/posts/${post.id}`}>  <i className="bi bi-eye"></i> </Link>
                                                                <button className="
                                                w-10 h-10
                                                rounded-xl
                                                bg-[#16242C]
                                                border
                                                border-[#22313A]
                                                flex
                                                items-center
                                                justify-center
                                                text-red-400
                                                hover:bg-red-500
                                                hover:text-white
                                                transition
                                            " onClick={() => setOpenDeleteModal(post.id)}><i className="py-2 px-4 text-black rounded-lg bg-blue-500  bi bi-trash3"></i>
                                                                </button>
                                                               
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </>
                                ) : (
                                    <tfoot>
                                        <tr className="flex justify-center items-center w-[100] hover:border border-[#22313A]  rounded-lg transition duration-300">
                                            <td className="">
                                            <div className="
                                                    py-24
                                                    text-center
                                                    text-[#94A3B8]
                                                    ">
                                                    <i className="bi bi-folder text-5xl"></i>

                                                    <p className="mt-4 text-lg">
                                                        No content available yet.
                                                    </p>
                                            </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                )


                            )}


                        </table>
                        {Object.keys(accountToDelete).length > 0 && (
                                <ConfirmModal
                                   isOpen={accountToDelete}
                                   onClose={() => setAccountToDelete(false)}
                                   onConfirm={() => deleteAccount(accountToDelete.id, user.role, setUsers)}
                                   title="Confirm Account Deletion"
                                   message={`Are you sure you want to delete the account "${accountToDelete.username}"? This action cannot be undone.`}
                                   confirmText="Delete"
                                   cancelText="Cancel"
                               />

                            )}
                            {openDeleteModal && (
                                 <ConfirmModal
                                    isOpen={openDeleteModal}
                                    onClose={() => setOpenDeleteModal(false)}
                                    onConfirm={() => deletPost(openDeleteModal, setPosts)}
                                    title="Confirm Deletion"
                                    message="Are you sure you want to delete this post? This action cannot be undone."
                                    confirmText="Delete"
                                    cancelText="Cancel"
                                />
                            ) }
                    </div>
                </div>
            </div>
        </>
    )
}