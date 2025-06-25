import { useSearchParams } from "react-router-dom";

import { Menus } from "../../ui/Menus";
import { Table } from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";

export const CabinTable = () => {
  const { isPending, data: cabins, error } = useCabins();
  const [searchParams] = useSearchParams();


  // 1. filter cabins
  const filter = searchParams.get("discount") || "all";
  let filteredCabins = cabins;
  
  switch (filter) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      filteredCabins = cabins;
      break;
  }

  // 2. sort cabins
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins && filteredCabins.sort((a, b) =>
    field !== "name" ?
      (a[field] - b[field]) * modifier
      :
      (a[field].localeCompare(b[field])) * modifier
  );

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorFallback error={error} />
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) =>
          <CabinRow cabin={cabin} key={cabin._id} />
        } />
      </Table>
    </Menus>
  );
}