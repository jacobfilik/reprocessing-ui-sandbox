import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getUser } from "./queryfunctions";
import type { User } from "./models";

const UserContext = createContext<User | undefined>(undefined);

function UserProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: (failureCount, error: AxiosError) => {
      if ("status" in error && (error.status == 401 || error.status == 403)) {
        //dont retry 401/403
        return false;
      }

      return failureCount < 2;
    },
  });

  //undefined if pending

  return (
    <UserContext.Provider value={query.data}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
