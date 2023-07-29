import { useEffect, useState } from "react";
import { getUserData, getUserDataRepository } from "../src/api";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiFillStar,
} from "react-icons/ai";
function App() {
  const [search, setSearch] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [showDetail, setShowDetail] = useState({
    show: true,
    index: -1,
    data: [],
  });

  async function getSearchUser() {
    let res: any = await getUserData({ search, limit: 5 });

    setDataUser(res.data.items);
    setShowDetail({ show: false, index: -1, data: [] });
  }
  async function detailUser({
    value,
    index,
  }: {
    value: object;
    index: number;
  }) {
    let res: any ={data:[]}
    if(!showDetail.show){
    res = await getUserDataRepository({ search });
    }
    setShowDetail({ show: !showDetail.show, index, data: res.data });
  }
  return (
    <div className="container p-4 space-y-5">
      <input
        className="border-2 rounded-lg w-full h-10 p-2"
        placeholder="Enter some characters..."
        value={search}
        onChange={(v) => setSearch(v.target.value)}
      />
      <div
        onClick={() => getSearchUser()}
        className="w-full bg-blue-400 rounded-sm p-2 cursor-pointer hover:bg-blue-200"
      >
        <p className="text-white text-center"> Search</p>
      </div>
      <div className="flex flex-col space-y-5 ">
        {dataUser.length > 0 ? (
          dataUser.map((value: any, index: number) => {
            return (
              <div key={index}>
                <div
                  onClick={() => detailUser({ value, index })}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex flex-row justify-between"
                >
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-col justify-center">
                      <div
                        style={{
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          // backgroundPosition:'center',
                          backgroundImage: `url("${value.avatar_url}"),url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="16" viewBox="0 0 16 16"%3E%3Cg fill="currentColor"%3E%3Cpath d="M11 6a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"%2F%3E%3Cpath fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')`,
                        }}
                        className=" rounded-full h-10 w-10"
                      ></div>
                    </div>
                    <div className="flex flex-col self-center">
                      <p>{value.login}</p>
                    </div>
                  </div>
                  <div className="flex flex-col self-center">
                    {showDetail.show && showDetail.index === index ? (
                      <AiOutlineCaretUp />
                    ) : (
                      <AiOutlineCaretDown />
                    )}
                  </div>
                </div>
                {showDetail.show && showDetail.index === index ? (
                  <div className={`flex flex-col space-y-2  `}>
                    {showDetail.data.length > 0 ? (
                      showDetail.data.map((subValue: any, subIndex: number) => {
                        return (
                          <div
                            key={subIndex}
                            className="flex flex-row justify-between h-10"
                          >
                            <div>
                              <p className="text-[14px] font-semibold">
                                {subValue.name}
                              </p>
                              <p className="text-[12px]">
                                {subValue.description}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-[1px] ">
                           
                              <div className="flex flex-col self-center">
                                <p className="text-[14px]">
                                  {subValue.stargazers_count}
                                </p>
                              </div>
                              <div className="flex flex-col self-center">
                              <AiFillStar className="text-yellow-500 text-[12px]" />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-row justify-center">
                        <p>No data found</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="flex flex-row justify-center">
            <p>No data found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
