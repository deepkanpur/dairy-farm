import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import ListItem from "./ListItem";

export default observer(function List() {
  const { revenueStore } = useStore();
  const { revenueByDate } = revenueStore;

  return (
    <>
      {revenueByDate.map((revenue) => (
        <ListItem key={revenue.id} revenue={revenue} />
      ))}
    </>
  );
});
