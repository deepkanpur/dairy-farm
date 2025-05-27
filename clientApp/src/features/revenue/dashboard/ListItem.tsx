import { observer } from "mobx-react-lite";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Revenue } from "../../../app/models/revenue";

interface Props {
  revenue: Revenue;
}

export default observer(function ListItem({ revenue }: Props) {
  const {
    userStore: { user },
  } = useStore();
  return (
    <Table definition>
      <Table.Body>
        <Table.Row negative={!revenue.reconciled} positive={revenue.reconciled}>
          <Table.Cell width={3}>Sale Date:</Table.Cell>
          <Table.Cell>
            <Link to={`/revenues/${revenue.id}`}>
              {new Date(revenue.saleDate).toDateString()}
            </Link>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cultivated Weight:</Table.Cell>
          <Table.Cell>{revenue.cultivatedWeight} KG</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Sold:</Table.Cell>
          <Table.Cell>{revenue.soldWeight} KG</Table.Cell>
        </Table.Row>
        
        {(user?.isAdmin || user?.isSalesUser) && (
          <>
            <Table.Row>
              <Table.Cell>Revenue:</Table.Cell>
              <Table.Cell>
                {revenue.salePrice * revenue.soldWeight} /- Rupees
              </Table.Cell>
            </Table.Row>
          </>
        )}
        <Table.Row>
          <Table.Cell>Added By:</Table.Cell>
          <Table.Cell>{revenue.addedByUserName} - {new Date(revenue.addedDate).toDateString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
});
