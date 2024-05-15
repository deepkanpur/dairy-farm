import { Icon } from "semantic-ui-react";
import { Dairy } from "../../app/models/dairy";

interface Props {
  dairy: Dairy;
}
export default function DairyStaff({ dairy }: Props) {
  return (
    <>
      <Icon name="motorcycle" /> {dairy.buffaloCount} Buffaloes
      <Icon name="battery half" style={{ marginLeft: 5 }} /> {dairy.cowCount} Cows
      <Icon name="users" style={{ marginLeft: 5 }} /> {dairy.workerCount} Workers
    </>
  );
}
