import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const useCabins = () => {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    staleTime: 0,
  });
};

export default useCabins;
