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
          <Table.Cell width={3}>
            <Link to={`/revenues/${revenue.id}`}>
              {new Date(revenue.saleDate).toDateString()}
            </Link>
          </Table.Cell>
          <Table.Cell>{revenue.soldWeight} KG Sold</Table.Cell>
        </Table.Row>
        
        {(user?.isAdmin) && (
          <>
            <Table.Row>
              <Table.Cell>Cultivated Weight:</Table.Cell>
              <Table.Cell>{revenue.cultivatedWeight} KG</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Remark:</Table.Cell>
              <Table.Cell>
                {revenue.remark }
              </Table.Cell>
            </Table.Row>          
            <Table.Row>
              <Table.Cell>Added By:</Table.Cell>
              <Table.Cell>{revenue.addedByUserName} - {new Date(revenue.addedDate).toLocaleDateString('en-in')}</Table.Cell>
            </Table.Row>
          </>
        )}
      </Table.Body>
    </Table>
  );
});
