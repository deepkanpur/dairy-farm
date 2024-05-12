import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import DairyListItem from "./DairyListItem";

export default observer(function DairyList() {
  const { dairyStore } = useStore();
  const { dairiesByDate } = dairyStore;

  return (
    <>
      {dairiesByDate.map((dairy) => (
        <DairyListItem key={dairy.id} dairy={dairy} />
      ))}
    </>
  );
});
