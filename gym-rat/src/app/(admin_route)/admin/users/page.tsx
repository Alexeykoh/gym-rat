"use client";

import Search from "@/components/ui/Search";
import { iUser } from "@/models/userModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<iUser[]>([]);
  //
  async function getUsers() {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.users);
        setLoading(false);
      });
  }

  //
  useEffect(() => {
    getUsers();
  }, []);
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div className="flex flex-col gap-6">
      <Search />
      <ul className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-64">
        {!users
          ? null
          : users.map((el, ind) => {
              return (
                <li
                  onClick={() => router.push(`users/${el._id}`)}
                  key={ind}
                  className="p-4 bg-gray-100/20 rounded-lg flex items-start justify-between"
                >
                  <div>
                    <div className="flex gap-2 items-center">
                      <p
                        className={
                          (el.role === "admin"
                            ? " bg-lime-400 text-black "
                            : " bg-gray-100/30 ") +
                          " text-xs px-2 py-1 w-fit rounded-lg"
                        }
                      >
                        {el.role}
                      </p>
                      <p className="font-semibold text-2xl">{el.name}</p>
                    </div>
                    <p>{el.email}</p>
                  </div>
                  <div className="flex gap-1"></div>
                </li>
              );
            })}
      </ul>
    </div>
  );
  //
}
