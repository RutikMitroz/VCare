import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_USERS } from "../../constants/urls";

const fetchAllUsers = async () => {
  const res = await makeRequest({
    pathname: GET_ALL_USERS,
    method: "GET",
  });
  return res?.data;
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () => fetchAllUsers(),
  });
};
