import { Icon } from "semantic-ui-react";
import { Dairy } from "../../app/models/dairy";

interface Props {
  dairy: Dairy;
}
export default function DairyStaff({ dairy }: Props) {
  return (
    <>
      <Icon name="chess knight" /> {dairy.buffaloCount} Buffaloes
      <Icon name="chess rook" style={{ marginLeft: 6 }} /> {dairy.cowCount} Cows
      <Icon name="users" style={{ marginLeft: 8 }} /> {dairy.milkProduction} Liter Milk
    </>
  );
}
